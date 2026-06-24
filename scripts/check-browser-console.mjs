import { chromium } from 'playwright';

const DEFAULT_URLS = [
  '/',
  '/explore',
  '/dogs/labrador-retriever',
  '/cats/persa',
  '/adoption-match',
  '/demo',
];

const args = process.argv.slice(2);

function readFlag(name, fallback) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) {
    return inline.slice(name.length + 1);
  }

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith('--')) {
    return args[index + 1];
  }

  return fallback;
}

const watch = args.includes('--watch');
const baseUrl = readFlag('--url', process.env.URL ?? 'http://localhost:5173').replace(/\/$/, '');
const intervalMs = Number(readFlag('--interval', process.env.INTERVAL_MS ?? 3000));
const settleMs = Number(readFlag('--settle', process.env.SETTLE_MS ?? 1000));
const routeArg = readFlag('--routes', process.env.ROUTES ?? DEFAULT_URLS.join(','));
const routes = routeArg
  .split(',')
  .map((route) => route.trim())
  .filter(Boolean);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function toUrl(route) {
  if (/^https?:\/\//i.test(route)) {
    return route;
  }

  return `${baseUrl}${route.startsWith('/') ? route : `/${route}`}`;
}

async function checkOnce() {
  const browser = await chromium.launch();
  const findings = [];

  try {
    const page = await browser.newPage();

    page.on('console', (message) => {
      if (message.type() === 'error') {
        const location = message.location();
        findings.push({
          route: page.url(),
          source: location.url,
          type: 'console.error',
          message: message.text(),
        });
      }
    });

    page.on('pageerror', (error) => {
      findings.push({
        route: page.url(),
        type: 'pageerror',
        message: error.stack ?? error.message,
      });
    });

    for (const route of routes) {
      const url = toUrl(route);
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      if (!response || !response.ok()) {
        findings.push({
          route: url,
          type: 'navigation',
          message: `HTTP ${response?.status() ?? 'sem resposta'}`,
        });
      }

      await page.waitForTimeout(settleMs);
    }
  } finally {
    await browser.close();
  }

  return findings;
}

function printFindings(findings) {
  const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });

  if (!findings.length) {
    console.log(`[${timestamp}] Browser sem erros de console em ${routes.length} rota(s).`);
    return;
  }

  console.error(`[${timestamp}] Erros encontrados no browser:`);

  for (const finding of findings) {
    console.error(`\n[${finding.type}] ${finding.route}`);
    if (finding.source) {
      console.error(`Fonte: ${finding.source}`);
    }
    console.error(finding.message);
  }
}

async function run() {
  let lastHadErrors = false;

  do {
    try {
      const findings = await checkOnce();
      printFindings(findings);
      lastHadErrors = findings.length > 0;
    } catch (error) {
      lastHadErrors = true;
      console.error(`Falha ao verificar ${baseUrl}:`);
      console.error(error.message);
    }

    if (watch) {
      await sleep(intervalMs);
    }
  } while (watch);

  if (lastHadErrors) {
    process.exit(1);
  }
}

run();

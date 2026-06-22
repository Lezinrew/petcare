/**
 * Baixa imagens de domínio público / Creative Commons via Wikipedia e Wikimedia Commons.
 * npm run download:pet-images
 * npm run download:pet-images -- --retry-failed
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import {
  allAnimalBreeds,
  SPECIES_IMAGE_FOLDER,
} from '../../api/src/data/allBreeds.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_ROOT = path.resolve(__dirname, '../public/images');
const ATTRIBUTIONS_PATH = path.resolve(__dirname, '../../api/src/data/imageAttributions.json');

const USER_AGENT = 'PetCareResponsavel/1.0 (https://github.com/Lezinrew/petcare; educational)';
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const WIKI_API = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const DELAY_MS = 2000;
const MIN_REAL_BYTES = 3000;

/** Título Wikipedia (en) ou termo Commons. */
const WIKI_TITLES: Record<string, string> = {
  'labrador-retriever': 'Labrador Retriever',
  'shih-tzu': 'Shih Tzu',
  'golden-retriever': 'Golden Retriever',
  'pastor-alemao': 'German Shepherd',
  pug: 'Pug',
  'border-collie': 'Border Collie',
  'pit-bull': 'American Pit Bull Terrier',
  beagle: 'Beagle',
  'bichon-frise': 'Bichon Frise',
  'boston-terrier': 'Boston Terrier',
  boxer: 'Boxer (dog)',
  bulldog: 'Bulldog',
  'bulldog-ingles': 'English Bulldog',
  bully: 'American Bully',
  'cane-corso': 'Cane Corso',
  chihuahua: 'Chihuahua (dog)',
  'cocker-spaniel': 'Cocker Spaniel',
  dachshund: 'Dachshund',
  doberman: 'Dobermann',
  'husky-siberiano': 'Siberian Husky',
  'lhasa-apso': 'Lhasa Apso',
  maltes: 'Maltese dog',
  pinscher: 'Miniature Pinscher',
  poodle: 'Poodle',
  rottweiler: 'Rottweiler',
  schnauzer: 'Schnauzer',
  'spitz-alemao': 'German Spitz',
  'vira-lata': 'Mixed-breed dog',
  'west-highland-white-terrier': 'West Highland White Terrier',
  yorkshire: 'Yorkshire Terrier',
  persa: 'Persian cat',
  'maine-coon': 'Maine Coon',
  siames: 'Siamese cat',
  ragdoll: 'Ragdoll',
  sphynx: 'Sphynx cat',
  bengala: 'Bengal cat',
  'vira-lata-gato': 'Domestic cat',
  angora: 'Turkish Angora',
  siberiano: 'Siberian cat',
  'azul-russo': 'Russian Blue',
  'persa-exotico': 'Exotic Shorthair',
  'british-shorthair': 'British Shorthair',
  burmes: 'Burmese cat',
  abissinio: 'Abyssinian cat',
  munchkin: 'Munchkin cat',
  'scottish-fold': 'Scottish Fold',
  'noruegues-da-floresta': 'Norwegian Forest cat',
  savannah: 'Savannah cat',
  himalaio: 'Himalayan cat',
  chartreux: 'Chartreux',
  betta: 'Siamese fighting fish',
  cascudo: 'Hypostomus plecostomus',
  guppy: 'Guppy',
  corydora: 'Corydoras',
  'peixe-palhaco': 'Clownfish',
  oscar: 'Oscar (fish)',
  colisa: 'Colisa lalia',
  ramirezi: 'Mikrogeophagus ramirezi',
  lagosta: 'Spiny lobster',
  camarao: 'Caridina multidentata',
  chines: 'Chinese hamster',
  roborovski: "Roborovski's hamster",
  sirio: 'Golden hamster',
  'anao-russo': 'Winter white dwarf hamster',
  campbells: "Campbell's dwarf hamster",
  calopsita: 'Cockatiel',
  'periquito-australiano': 'Budgerigar',
  agapornis: 'Lovebird',
  papagaio: 'Parrot',
  'ring-neck': 'Rose-ringed parakeet',
  loris: 'Loriini',
  arara: 'Macaw',
  'canario-belga': 'Domestic canary',
  'diamante-de-gould': 'Gouldian finch',
  'diamante-mandarim': 'Mandarin duck',
  marreco: 'Duck',
  coleiro: 'Spinus',
  'trinca-ferro': 'Saltator similis',
  'codorna-chinesa': 'Japanese quail',
  ganso: 'Goose',
  carcara: 'Southern crested caracara',
  quiriquiri: 'American kestrel',
  'falcao-de-coleira': 'Aplomado falcon',
  'falcao-peregrino': 'Peregrine falcon',
  caure: 'Bat falcon',
  'gaviao-asa-de-telha': "Harris's hawk",
  'gaviao-carijo': 'Roadside hawk',
  'coruja-buraqueira': 'Burrowing owl',
  'mini-lion-head': 'Lionhead rabbit',
  chinchila: 'Chinchilla rabbit',
  'holland-lop': 'Holland Lop',
  'anao-holandes': 'Netherland Dwarf rabbit',
  rex: 'Rex rabbit',
  'angora-ingles': 'English Angora rabbit',
  california: 'California rabbit',
  'fuzzy-lop': 'American Fuzzy Lop',
  'tartaruga-de-orelha-vermelha': 'Red-eared slider',
  'tigre-dagua': 'Trachemys dorbigni',
  'tartaruga-russa': "Horsfield's tortoise",
  'jabuti-piranga': 'Chelonoidis carbonarius',
  'jabuti-tinga': 'Chelonoidis denticulatus',
  'cagado-de-barbicha': 'Phrynops geoffroanus',
  'tartaruga-da-amazonia': 'Podocnemis expansa',
  'twister-dumbo': 'Fancy rat',
  'twister-standard': 'Fancy rat',
  'twister-rex': 'Rex rat',
  'twister-satin': 'Fancy rat',
  'porquinho-da-india-ingles': 'Guinea pig',
  'porquinho-da-india-abissinio': 'Abyssinian guinea pig',
  'porquinho-da-india-peruano': 'Peruvian guinea pig',
  'porquinho-da-india-sheltie': 'Silkie guinea pig',
  'porquinho-da-india-skinny': 'Skinny pig',
  'porquinho-da-india-teddy': 'Teddy guinea pig',
  'chinchila-standard': 'Chinchilla',
  'chinchila-bege': 'Chinchilla',
  'chinchila-mosaico': 'Chinchilla',
  'chinchila-ebony': 'Chinchilla',
  'gerbil-mongol': 'Mongolian gerbil',
  'gerbil-argente': 'Mongolian gerbil',
  'gerbil-burmese': 'Mongolian gerbil',
  'gerbil-siamese': 'Mongolian gerbil',
  'furao-sable': 'Ferret',
  'furao-albino': 'Ferret',
  'furao-champagne': 'Ferret',
  'furao-cinnamon': 'Ferret',
  'gecko-leopardo': 'Leopard gecko',
  'dragao-barbudo': 'Central bearded dragon',
  'iguana-verde': 'Green iguana',
  teiu: 'Tupinambis',
  'anolis-verde': 'Green anole',
  uromastyx: 'Uromastyx',
  'lagarto-de-lingua-azul': 'Blue-tongued skink',
};

/** Arquivo Commons fixo quando a busca genérica retorna ilustração/gráfico incorreto. */
const COMMONS_FILE_OVERRIDES: Record<string, string> = {
  'angora-ingles': 'EnglishAngoraRabbit.jpg',
};

type Attribution = {
  credit: string;
  source: string;
  license: string;
  fileUrl?: string;
};

const retryFailed = process.argv.includes('--retry-failed');

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function loadAttributions(): Record<string, Attribution> {
  if (!fs.existsSync(ATTRIBUTIONS_PATH)) return {};
  return JSON.parse(fs.readFileSync(ATTRIBUTIONS_PATH, 'utf-8')) as Record<string, Attribution>;
}

function saveAttributions(data: Record<string, Attribution>) {
  fs.writeFileSync(ATTRIBUTIONS_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

function hasRealImage(dest: string): boolean {
  return fs.existsSync(dest) && fs.statSync(dest).size >= MIN_REAL_BYTES;
}

async function fetchWithRetry(url: string, retries = 4): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (res.status === 429) {
      const wait = 8000 * (i + 1);
      console.log(`\n   ⏳ rate limit — aguardando ${wait / 1000}s...`);
      await sleep(wait);
      continue;
    }
    return res;
  }
  throw new Error('HTTP 429 (rate limit)');
}

async function fromWikipedia(title: string): Promise<{ url: string; credit: string } | null> {
  const page = encodeURIComponent(title.replace(/ /g, '_'));
  const res = await fetchWithRetry(`${WIKI_API}${page}`);
  if (!res.ok) return null;

  const data = (await res.json()) as {
    thumbnail?: { source?: string };
    content_urls?: { desktop?: { page?: string } };
    description?: string;
    title?: string;
  };

  const url = data.thumbnail?.source;
  if (!url) return null;

  return {
    url,
    credit: `Wikipedia — ${data.title ?? title}`,
  };
}

async function fromCommonsFile(
  fileTitle: string,
): Promise<{ url: string; credit: string; license: string; title: string } | null> {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    titles: `File:${fileTitle}`,
    prop: 'imageinfo',
    iiprop: 'url|mime|extmetadata',
    iiurlwidth: '900',
  });

  const res = await fetchWithRetry(`${COMMONS_API}?${params}`);
  if (!res.ok) return null;

  const data = (await res.json()) as {
    query?: {
      pages?: Record<
        string,
        {
          title?: string;
          imageinfo?: Array<{
            thumburl?: string;
            url?: string;
            mime?: string;
            extmetadata?: Record<string, { value?: string }>;
          }>;
        }
      >;
    };
  };

  const page = Object.values(data.query?.pages ?? {})[0];
  const info = page?.imageinfo?.[0];
  if (!info?.url) return null;
  const mime = info.mime ?? '';
  if (!mime.startsWith('image/') || mime.includes('svg')) return null;

  const meta = info.extmetadata ?? {};
  const artist = meta.Artist?.value?.replace(/<[^>]+>/g, '').trim() || 'Wikimedia Commons';
  const license = meta.LicenseShortName?.value?.trim() || 'CC';

  return {
    url: info.thumburl || info.url,
    credit: artist,
    license,
    title: page?.title?.replace(/^File:/, '') ?? fileTitle,
  };
}

async function fromCommons(query: string): Promise<{ url: string; credit: string; license: string; title: string } | null> {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    generator: 'search',
    gsrsearch: query,
    gsrnamespace: '6',
    gsrlimit: '8',
    prop: 'imageinfo',
    iiprop: 'url|mime|extmetadata',
    iiurlwidth: '900',
  });

  const res = await fetchWithRetry(`${COMMONS_API}?${params}`);
  if (!res.ok) return null;

  const data = (await res.json()) as {
    query?: {
      pages?: Record<
        string,
        {
          title?: string;
          imageinfo?: Array<{
            thumburl?: string;
            url?: string;
            mime?: string;
            extmetadata?: Record<string, { value?: string }>;
          }>;
        }
      >;
    };
  };

  for (const page of Object.values(data.query?.pages ?? {})) {
    const info = page.imageinfo?.[0];
    if (!info?.url) continue;
    const mime = info.mime ?? '';
    if (!mime.startsWith('image/') || mime.includes('svg')) continue;

    const meta = info.extmetadata ?? {};
    const artist = meta.Artist?.value?.replace(/<[^>]+>/g, '').trim() || 'Wikimedia Commons';
    const license = meta.LicenseShortName?.value?.trim() || 'CC';

    return {
      url: info.thumburl || info.url,
      credit: artist,
      license,
      title: page.title?.replace(/^File:/, '') ?? query,
    };
  }

  return null;
}

async function downloadAsWebp(url: string, dest: string): Promise<void> {
  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf)
    .resize(900, 900, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(dest);
}

async function resolveImage(breed: (typeof allAnimalBreeds)[0]) {
  const commonsFile = COMMONS_FILE_OVERRIDES[breed.slug];
  if (commonsFile) {
    const file = await fromCommonsFile(commonsFile);
    if (file) {
      return {
        url: file.url,
        credit: file.credit,
        source: 'Wikimedia Commons',
        license: file.license,
        fileUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.title.replace(/ /g, '_'))}`,
      };
    }
  }

  const wikiTitle = WIKI_TITLES[breed.slug];
  if (wikiTitle) {
    const wiki = await fromWikipedia(wikiTitle);
    if (wiki) {
      return {
        url: wiki.url,
        credit: wiki.credit,
        source: 'Wikipedia / Wikimedia',
        license: 'Ver página',
      };
    }
  }

  const commonsQuery = wikiTitle ?? `${breed.name} ${breed.species}`;
  const commons = await fromCommons(commonsQuery);
  if (commons) {
    return {
      url: commons.url,
      credit: commons.credit,
      source: 'Wikimedia Commons',
      license: commons.license,
      fileUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(commons.title.replace(/ /g, '_'))}`,
    };
  }

  return null;
}

async function main() {
  console.log('🐾 PetCare — download:pet-images\n');
  console.log('Fonte: Wikipedia + Wikimedia Commons (licenças abertas)\n');

  const attributions = loadAttributions();
  let ok = 0;
  let skip = 0;
  let fail = 0;

  for (const breed of allAnimalBreeds) {
    const folder = SPECIES_IMAGE_FOLDER[breed.species];
    const dir = path.join(IMAGES_ROOT, folder);
    const dest = path.join(dir, `${breed.slug}.webp`);
    fs.mkdirSync(dir, { recursive: true });

    if (hasRealImage(dest) && !retryFailed) {
      console.log(`⏭️  ${breed.slug}`);
      skip++;
      continue;
    }

    if (retryFailed && hasRealImage(dest)) {
      skip++;
      continue;
    }

    process.stdout.write(`🔍 ${breed.slug}... `);

    try {
      await sleep(DELAY_MS);
      const hit = await resolveImage(breed);
      if (!hit) {
        console.log('❌');
        fail++;
        continue;
      }

      await downloadAsWebp(hit.url, dest);
      attributions[breed.slug] = {
        credit: hit.credit,
        source: hit.source,
        license: hit.license,
        fileUrl: hit.fileUrl,
      };

      console.log('✅');
      ok++;
    } catch (err) {
      console.log(`❌ ${err instanceof Error ? err.message : err}`);
      fail++;
    }
  }

  saveAttributions(attributions);
  console.log(`\n✅ ${ok} baixadas | ⏭️ ${skip} ok | ❌ ${fail} falhas`);
  if (fail > 0) console.log('Dica: npm run download:pet-images -- --retry-failed\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

(function () {
  var theme = localStorage.getItem('petcare-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (theme === 'dark' || (!theme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})();

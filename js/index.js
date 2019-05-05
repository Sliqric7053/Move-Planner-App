import CreateHTML from './input';

window.addEventListener('DOMContentLoaded', main, false);

function main() {
  const form = document.getElementById('form-container');
  const citySearchTerm = document.getElementById('city');

  form.addEventListener('submit', evt => {
    evt.preventDefault();
    const city = citySearchTerm.value;
    const api = new CreateHTML(city);

    // Make magic ;)
    api.getArticlesData();
  });
}

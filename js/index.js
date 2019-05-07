import CreateHTML from './input';

window.addEventListener('DOMContentLoaded', main, false);

function main() {
  const form = document.getElementById('form-container');
  const citySearchTerm = document.getElementById('city');
  const section = document.getElementById('main');

  form.addEventListener('submit', evt => {
    evt.preventDefault();

    // clear html
    while (section.firstChild) {
      section.removeChild(section.firstChild);
    }

    const city = citySearchTerm.value;
    const api = new CreateHTML(city);

    // Make magic ;)
    api.getArticlesData();
  });
}

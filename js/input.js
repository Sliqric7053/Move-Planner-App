export default class CreateHTML {
  constructor(city) {
    this.cityName = city;
    this.apikey = 'tIeCgw4YfyqUOqfzPRQks8z8I2tjGGZn';
  }

  async getArticlesData() {
    let loader = document.getElementById('loader').style;
    loader.display = 'block';
    const nyTimesUrl = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${
        this.cityName
      }&api-key=${this.apikey}`
    );

    const wikiPediaUrl = await fetch(
      `https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${
        this.cityName
      }&limit=20`
    );

    const wikiImageUrl = await fetch(
      `https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=${
        this.cityName
      }`
    );

    // Await articles
    const newYorkdata = await nyTimesUrl.json();
    const newYorkArticles = newYorkdata['response']['docs'];
    const wikiArticles = await wikiPediaUrl.json();
    const wikiImages = await wikiImageUrl.json();

    loader.display = 'none';

    // Populate HTML
    this.updateUI(newYorkArticles, wikiArticles, wikiImages);

    return { newYorkArticles, wikiArticles, wikiImages };
  }

  updateUI(newYorkArticles, wikiArticles, wikiImages) {
    let heading = document.createElement('h1');
    let section = document.getElementById('main');
    let divWrapper = this.createElementWithClass('div', 'wrapper');
    let divContentWrapper = this.createElementWithClass(
      'div',
      'content-wrapper'
    );
    let divImageLeft = this.createElementWithClass('div', 'image-left');
    let divImageCentre = this.createElementWithClass('div', 'image-center');
    let divImageRight = this.createElementWithClass('div', 'image-right');
    let imgLeft = document.createElement('img');
    let imgCentre = document.createElement('img');
    let imgRight = document.createElement('img');
    const newYorkArticle = newYorkArticles[0];
    const newYorkArticle1 = newYorkArticles[1];
    const newYorkArticle2 = newYorkArticles[2];
    const wikiArticle1 = wikiArticles[2][0];
    const wikiArticle2 = wikiArticles[2][1];
    const wikiArticle3 = wikiArticles[2][2];
    const wikiArticle4 = wikiArticles[2][3];
    const wikiArticle5 = wikiArticles[2][4];
    const wikiArticle6 = wikiArticles[2][5];
    const wikiArticle7 = wikiArticles[2][6];
    const wikiArticle8 = wikiArticles[2][7];
    const wikiArticle9 = wikiArticles[2][8];
    const wikiArticle10 = wikiArticles[2][9];
    const wikiArticle11 = wikiArticles[2][10];
    const wikiArticle12 = wikiArticles[2][11];
    const wikiArticle13 = wikiArticles[2][12];
    const wikiArticle14 = wikiArticles[2][13];
    const wikiArticle15 = wikiArticles[2][14];

    // clear html
    while (section.firstChild) {
      section.removeChild(section.firstChild);
    }

    // Error handling
    if (newYorkArticles.length === 0) {
      this.addArticleToHTML('h2', 'This plane is not taking off! 😔', section);
      this.addArticleToHTML('h2', '(search again)', section);
    } else {
      if (
        newYorkArticle.multimedia.length > 0 &&
        newYorkArticle1.multimedia.length > 0 &&
        newYorkArticle2.multimedia.length > 0
      ) {
        imgLeft.src = `http://www.nytimes.com/${
          newYorkArticle.multimedia[0].url
        }`;
        imgLeft.alt = newYorkArticle.headline.main;

        imgRight.src = `http://www.nytimes.com/${
          newYorkArticle1.multimedia[0].url
        }`;
        imgRight.alt = newYorkArticle1.headline.main;

        // Fallback image
        imgCentre.src = `http://www.nytimes.com/${
          newYorkArticle2.multimedia[0].url
        }`;
        imgCentre.alt = newYorkArticle2.headline.main;
      } else {
        imgLeft.src =
          'https://www.pixilart.com/images/art/1ccb1b2395.gif?v=1469196696';
        imgLeft.alt = 'Image not available';
        imgRight.src =
          'https://www.pixilart.com/images/art/1ccb1b2395.gif?v=1469196696';
        imgRight.alt = 'Image not available';
      }

      // Update Fallback image (if available)
      if (wikiImages.query.pages[0].original) {
        imgCentre.src = wikiImages.query.pages[0].original.source;
        imgCentre.alt = wikiImages.query.pages[0].terms.description[0];
      }

      // Create heading
      heading.innerHTML = `So you want to live in ${this.cityName}?`;
      section.appendChild(heading);

      // Add heading to html
      section.appendChild(divWrapper);
      divWrapper.appendChild(divContentWrapper);

      // Add paragraph 1 - 2 to the html
      this.addArticleToHTML('p', wikiArticle1, divContentWrapper);
      this.addArticleToHTML('p', wikiArticle2, divContentWrapper);

      // Add left image div
      divImageLeft.appendChild(imgLeft);

      // Add left image div footnote
      divImageLeft.append(newYorkArticle.lead_paragraph);
      divContentWrapper.appendChild(divImageLeft);

      // Add paragraph 3 - 7
      this.addArticleToHTML('p', wikiArticle3, divContentWrapper);
      this.addArticleToHTML('p', wikiArticle4, divContentWrapper);
      this.addArticleToHTML('p', wikiArticle5, divContentWrapper);
      this.addArticleToHTML('p', wikiArticle6, divContentWrapper);
      this.addArticleToHTML('p', wikiArticle7, divContentWrapper);

      // Add centre image div
      divImageCentre.appendChild(imgCentre);
      divContentWrapper.appendChild(divImageCentre);

      // Add paragraph 8 - 10 to the html
      this.addArticleToHTML('p', wikiArticle8, divContentWrapper);
      this.addArticleToHTML('p', wikiArticle9, divContentWrapper);
      this.addArticleToHTML('p', wikiArticle10, divContentWrapper);

      // Add right image div
      divImageRight.appendChild(imgRight);

      // Add right image div footnote
      divImageRight.append(newYorkArticle1.lead_paragraph);
      divContentWrapper.appendChild(divImageRight);

      // Add paragraph 11 - 15 to the html
      this.addArticleToHTML('p', wikiArticle11, divContentWrapper);
      this.addArticleToHTML('p', wikiArticle12, divContentWrapper);
      this.addArticleToHTML('p', wikiArticle13, divContentWrapper);
      this.addArticleToHTML('p', wikiArticle14, divContentWrapper);
      this.addArticleToHTML('p', wikiArticle15, divContentWrapper);
    }
  }

  /**
   * Returns an instance of the element for the specified tag, attached to the specified DIV Node.
   * @param el String that specifies the element name. Case-insensitive.
   * @param article String to be attached to the created element.
   * @param div Node div to attach the created element.
   */
  addArticleToHTML(el, article, div) {
    let domDIV, domP;

    if (el && typeof el === 'string') {
      domP = document.createElement(el);
      domP.textContent = article;
      domDIV = div.appendChild(domP);
    } else {
      throw Error('Element must be a string');
    }

    return domDIV;
  }

  /**
   * Returns a reference to the Node element with the (optional) class name.
   * @param el String that specifies the element name. Case-insensitive.
   * @param className String that specifies the class name. Case-insensitive (optional).
   */
  createElementWithClass(el, className = '') {
    let domEl;

    if (el && typeof el === 'string') {
      domEl = document.createElement(el);
    } else {
      throw Error('Element must be a string');
    }

    if (className && typeof className === 'string' && className != '') {
      domEl.setAttribute('class', className);
    }
    return domEl;
  }
}

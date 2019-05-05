// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"vYOj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class CreateHTML {
  constructor(city) {
    this.cityName = city;
    this.apikey = 'tIeCgw4YfyqUOqfzPRQks8z8I2tjGGZn';
  }

  async getArticlesData() {
    const nyTimesUrl = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.cityName}&api-key=${this.apikey}`);
    const wikiPediaUrl = await fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${this.cityName}&limit=20`);
    const wikiImageUrl = await fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=${this.cityName}`); // Await articles

    const newYorkdata = await nyTimesUrl.json();
    const newYorkArticles = newYorkdata['response']['docs'];
    const wikiArticles = await wikiPediaUrl.json();
    const wikiImages = await wikiImageUrl.json(); // Populate HTML

    this.updateUI(newYorkArticles, wikiArticles, wikiImages);
    return {
      newYorkArticles,
      wikiArticles,
      wikiImages
    };
  }

  updateUI(newYorkArticles, wikiArticles, wikiImages) {
    let heading = document.createElement('h1');
    let section = document.getElementById('main');
    let divWrapper = document.createElement('div');
    let divContentWrapper = document.createElement('div');
    let divImageLeft = document.createElement('div');
    let divImageCentre = document.createElement('div');
    let divImageRight = document.createElement('div');
    let p0 = document.createElement('p');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
    let p4 = document.createElement('p');
    let p5 = document.createElement('p');
    let p6 = document.createElement('p');
    let p7 = document.createElement('p');
    let p8 = document.createElement('p');
    let p9 = document.createElement('p');
    let p10 = document.createElement('p');
    let p11 = document.createElement('p');
    let p12 = document.createElement('p');
    let p13 = document.createElement('p');
    let p14 = document.createElement('p');
    let p15 = document.createElement('p');
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
    const wikiArticle15 = wikiArticles[2][14]; // clear html

    while (section.firstChild) {
      section.removeChild(section.firstChild);
    } // Error handling


    if (newYorkArticles.length === 0) {
      p0.textContent = 'No results returned.';
      section.appendChild(p0);
    } else {
      if (newYorkArticle.multimedia.length > 0 && newYorkArticle1.multimedia.length > 0 && newYorkArticle2.multimedia.length > 0) {
        imgLeft.src = `http://www.nytimes.com/${newYorkArticle.multimedia[0].url}`;
        imgLeft.alt = newYorkArticle.headline.main;
        imgRight.src = `http://www.nytimes.com/${newYorkArticle1.multimedia[0].url}`;
        imgRight.alt = newYorkArticle1.headline.main; // Fallback image

        imgCentre.src = `http://www.nytimes.com/${newYorkArticle2.multimedia[0].url}`;
        imgCentre.alt = newYorkArticle2.headline.main;
      } else {
        imgLeft.src = 'https://www.pixilart.com/images/art/1ccb1b2395.gif?v=1469196696';
        imgLeft.alt = 'Image not available';
        imgRight.src = 'https://www.pixilart.com/images/art/1ccb1b2395.gif?v=1469196696';
        imgRight.alt = 'Image not available';
      } // Update Fallback image (if available)


      if (wikiImages.query.pages[0].original) {
        imgCentre.src = wikiImages.query.pages[0].original.source;
        imgCentre.alt = wikiImages.query.pages[0].terms.description[0];
      } // Create wrapper divs


      divWrapper.setAttribute('class', 'wrapper');
      divContentWrapper.setAttribute('class', 'content-wrapper'); // Create heading

      heading.innerHTML = `So you want to live in ${this.cityName}?`;
      section.appendChild(heading); // Add heading to html

      section.appendChild(divWrapper);
      divWrapper.appendChild(divContentWrapper); // Add paragraph 1 - 2 to the html

      p1.textContent = wikiArticle1;
      p2.textContent = wikiArticle2;
      divContentWrapper.appendChild(p1);
      divContentWrapper.appendChild(p2); // Add left image div

      divImageLeft.setAttribute('class', 'image-left');
      divImageLeft.appendChild(imgLeft); // Add left image div footnote

      divImageLeft.append(newYorkArticle.lead_paragraph);
      divContentWrapper.appendChild(divImageLeft); // Add paragraph 3 - 7

      p3.textContent = wikiArticle3;
      p4.textContent = wikiArticle4;
      p5.textContent = wikiArticle5;
      p6.textContent = wikiArticle6;
      p7.textContent = wikiArticle7;
      divContentWrapper.appendChild(p3);
      divContentWrapper.appendChild(p4);
      divContentWrapper.appendChild(p5);
      divContentWrapper.appendChild(p6);
      divContentWrapper.appendChild(p7); // Add centre image div

      divImageCentre.setAttribute('class', 'image-center');
      divImageCentre.appendChild(imgCentre);
      divContentWrapper.appendChild(divImageCentre); // Add paragraph 8 - 10 to the html

      p8.textContent = wikiArticle8;
      p9.textContent = wikiArticle9;
      p10.textContent = wikiArticle10;
      divContentWrapper.appendChild(p8);
      divContentWrapper.appendChild(p9);
      divContentWrapper.appendChild(p10); // Add right image div

      divImageRight.setAttribute('class', 'image-right');
      divImageRight.appendChild(imgRight); // Add right image div footnote

      divImageRight.append(newYorkArticle1.lead_paragraph);
      divContentWrapper.appendChild(divImageRight); // Add paragraph 11 - 15 to the html

      p11.textContent = wikiArticle11;
      p12.textContent = wikiArticle12;
      p13.textContent = wikiArticle13;
      p14.textContent = wikiArticle14;
      p15.textContent = wikiArticle15;
      divContentWrapper.appendChild(p11);
      divContentWrapper.appendChild(p12);
      divContentWrapper.appendChild(p13);
      divContentWrapper.appendChild(p14);
      divContentWrapper.appendChild(p15);
    }
  }

}

exports.default = CreateHTML;
},{}],"QvaY":[function(require,module,exports) {
"use strict";

var _input = _interopRequireDefault(require("./input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('DOMContentLoaded', main, false);

function main() {
  const form = document.getElementById('form-container');
  const citySearchTerm = document.getElementById('city');
  form.addEventListener('submit', evt => {
    evt.preventDefault();
    const city = citySearchTerm.value;
    const api = new _input.default(city); // Make magic ;)

    api.getArticlesData();
  });
}
},{"./input":"vYOj"}]},{},["QvaY"], null)
//# sourceMappingURL=/js.214be86f.js.map
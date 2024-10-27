(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/app.scss */ "./assets/styles/app.scss");
/* harmony import */ var _js_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/menu.js */ "./assets/js/menu.js");
/* harmony import */ var _js_menu_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_menu_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_comment_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/comment.js */ "./assets/js/comment.js");
/* harmony import */ var _js_comment_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_comment_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_cookies_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/cookies.js */ "./assets/js/cookies.js");
/* harmony import */ var _js_cookies_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_cookies_js__WEBPACK_IMPORTED_MODULE_3__);
console.log('App.js is loaded!');

// Import des styles


// Import des scripts




/***/ }),

/***/ "./assets/js/comment.js":
/*!******************************!*\
  !*** ./assets/js/comment.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
__webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM chargé');
  var commentForm = document.getElementById('comment-form');
  var commentsContainer = document.getElementById('comments-container');
  if (commentForm) {
    console.log('Formulaire de commentaire trouvé');
    commentForm.addEventListener('submit', function (event) {
      event.preventDefault();
      console.log('Formulaire soumis');
      var formData = new FormData(commentForm);
      var articleId = commentForm.getAttribute('data-article-id');
      console.log('ID de l\'article:', articleId);
      fetch("/article/".concat(articleId, "/comment"), {
        method: 'POST',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.error) {
          console.error('Erreur:', data.error);
        } else {
          console.log('Commentaire ajouté');

          // Crée un nouvel élément pour le commentaire
          var commentElement = document.createElement('div');
          commentElement.classList.add('comment');
          commentElement.innerHTML = "\n            <p>".concat(formData.get('content'), "</p>\n            <small>Post\xE9 par : ").concat(data.username, " le ").concat(new Date().toLocaleString(), "</small>\n            <button class=\"delete-comment\" data-comment-id=\"").concat(data.commentId, "\">Supprimer</button>\n        ");
          commentsContainer.appendChild(commentElement);

          // Réinitialise le formulaire
          commentForm.reset();
        }
      })["catch"](function (error) {
        return console.error('Erreur lors de l\'ajout du commentaire:', error);
      });
    });
  } else {
    console.error('Formulaire de commentaire non trouvé');
  }
  if (commentsContainer) {
    console.log('Container des commentaires trouvé');
    commentsContainer.addEventListener('click', function (event) {
      console.log('Click dans le container');
      console.log('Élément cliqué:', event.target);
      if (event.target.classList.contains('delete-comment')) {
        console.log('Bouton supprimer cliqué');
        var commentId = event.target.dataset.commentId;
        var articleId = commentForm.getAttribute('data-article-id');
        console.log('Comment ID:', commentId);
        console.log('Article ID:', articleId);
        if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
          fetch("/article/".concat(articleId, "/comment/").concat(commentId, "/delete"), {
            method: 'DELETE'
          }).then(function (response) {
            console.log('Réponse reçue:', response);
            if (!response.ok) {
              throw new Error('Erreur lors de la suppression');
            }
            return response.json();
          }).then(function (data) {
            console.log('Données reçues:', data);
            if (data.success) {
              event.target.closest('.comment').remove();
            } else {
              throw new Error(data.error || 'Erreur lors de la suppression');
            }
          })["catch"](function (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de la suppression du commentaire');
          });
        }
      }
    });
    console.log('Événement de suppression attaché');
  } else {
    console.error('Container des commentaires non trouvé');
  }
});

/***/ }),

/***/ "./assets/js/cookies.js":
/*!******************************!*\
  !*** ./assets/js/cookies.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");
__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
// Vérification immédiate des cookies avant le chargement du DOM
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

// Vérification immédiate avant le chargement de la page
var cookieConsent = getCookie('cookiesAccepted');
if (cookieConsent === 'true' || cookieConsent === 'false') {
  document.documentElement.style.setProperty('--cookie-banner-display', 'none');
} else {
  document.documentElement.style.setProperty('--cookie-banner-display', 'block');
}
document.addEventListener('DOMContentLoaded', function () {
  var cookieBanner = document.getElementById('cookie-banner');
  var acceptButton = document.getElementById('accept-cookies');
  var declineButton = document.getElementById('decline-cookies');
  function setCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "expires=" + date.toUTCString();
    document.cookie = "".concat(name, "=").concat(value, "; ").concat(expires, "; path=/; SameSite=Strict; ").concat(window.location.protocol === 'https:' ? 'Secure;' : '');
    console.log("Cookie d\xE9fini : ".concat(name, "=").concat(value, "; ").concat(expires));
  }
  function checkCookieConsent() {
    var cookieValue = getCookie('cookiesAccepted');
    console.log("État actuel du consentement:", cookieValue);
    if (cookieValue === 'true' || cookieValue === 'false') {
      cookieBanner.style.display = 'none';
      document.documentElement.style.setProperty('--cookie-banner-display', 'none');
    } else {
      cookieBanner.style.display = 'block';
      document.documentElement.style.setProperty('--cookie-banner-display', 'block');
    }
  }
  acceptButton.addEventListener('click', function () {
    setCookie('cookiesAccepted', 'true', 365);
    cookieBanner.style.display = 'none';
    document.documentElement.style.setProperty('--cookie-banner-display', 'none');
    console.log("Cookies acceptés");
  });
  declineButton.addEventListener('click', function () {
    setCookie('cookiesAccepted', 'false', 365);
    cookieBanner.style.display = 'none';
    document.documentElement.style.setProperty('--cookie-banner-display', 'none');
    console.log("Cookies refusés");
  });

  // Vérification initiale des cookies au chargement
  checkCookieConsent();
});

/***/ }),

/***/ "./assets/js/menu.js":
/*!***************************!*\
  !*** ./assets/js/menu.js ***!
  \***************************/
/***/ (() => {

console.log('Menu.js is loaded!');
var initMenu = function initMenu() {
  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (!menuToggle || !navLinks) {
    console.error('Menu elements not found!');
    return;
  }
  console.log('Menu elements found, adding click listener...');
  menuToggle.addEventListener('click', function (e) {
    e.preventDefault();
    navLinks.classList.toggle('active');
    var icon = menuToggle.querySelector('i');
    if (icon) {
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  });
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMenu);
} else {
  initMenu();
}

/***/ }),

/***/ "./assets/styles/app.scss":
/*!********************************!*\
  !*** ./assets/styles/app.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.index-of.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.index-of.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "./node_modules/core-js/internals/function-uncurry-this-clause.js");
var $indexOf = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf);
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var nativeIndexOf = uncurryThis([].indexOf);

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
var FORCED = NEGATIVE_ZERO || !arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: FORCED }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf(this, searchElement, fromIndex) || 0
      : $indexOf(this, searchElement, fromIndex);
  }
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_function-uncurry-this-clause_js-node_modules_core-js_m-a7bf6b","vendors-node_modules_core-js_modules_es_error_cause_js-node_modules_core-js_modules_es_error_-1fc45e"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG1CQUFtQixDQUFDOztBQUVoQztBQUMyQjs7QUFFM0I7QUFDc0I7QUFDRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQekJDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBWTtFQUN0REgsT0FBTyxDQUFDQyxHQUFHLENBQUMsWUFBWSxDQUFDO0VBRXpCLElBQU1HLFdBQVcsR0FBR0YsUUFBUSxDQUFDRyxjQUFjLENBQUMsY0FBYyxDQUFDO0VBQzNELElBQU1DLGlCQUFpQixHQUFHSixRQUFRLENBQUNHLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQztFQUV2RSxJQUFJRCxXQUFXLEVBQUU7SUFDYkosT0FBTyxDQUFDQyxHQUFHLENBQUMsa0NBQWtDLENBQUM7SUFFL0NHLFdBQVcsQ0FBQ0QsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQVVJLEtBQUssRUFBRTtNQUNwREEsS0FBSyxDQUFDQyxjQUFjLENBQUMsQ0FBQztNQUN0QlIsT0FBTyxDQUFDQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7TUFFaEMsSUFBTVEsUUFBUSxHQUFHLElBQUlDLFFBQVEsQ0FBQ04sV0FBVyxDQUFDO01BQzFDLElBQU1PLFNBQVMsR0FBR1AsV0FBVyxDQUFDUSxZQUFZLENBQUMsaUJBQWlCLENBQUM7TUFDN0RaLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG1CQUFtQixFQUFFVSxTQUFTLENBQUM7TUFFM0NFLEtBQUssYUFBQUMsTUFBQSxDQUFhSCxTQUFTLGVBQVk7UUFDbkNJLE1BQU0sRUFBRSxNQUFNO1FBQ2RDLElBQUksRUFBRVA7TUFDVixDQUFDLENBQUMsQ0FDR1EsSUFBSSxDQUFDLFVBQUFDLFFBQVE7UUFBQSxPQUFJQSxRQUFRLENBQUNDLElBQUksQ0FBQyxDQUFDO01BQUEsRUFBQyxDQUNqQ0YsSUFBSSxDQUFDLFVBQUFHLElBQUksRUFBSTtRQUNWLElBQUlBLElBQUksQ0FBQ0MsS0FBSyxFQUFFO1VBQ1pyQixPQUFPLENBQUNxQixLQUFLLENBQUMsU0FBUyxFQUFFRCxJQUFJLENBQUNDLEtBQUssQ0FBQztRQUN4QyxDQUFDLE1BQU07VUFDSHJCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG9CQUFvQixDQUFDOztVQUVqQztVQUNBLElBQU1xQixjQUFjLEdBQUdwQixRQUFRLENBQUNxQixhQUFhLENBQUMsS0FBSyxDQUFDO1VBQ3BERCxjQUFjLENBQUNFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztVQUN2Q0gsY0FBYyxDQUFDSSxTQUFTLHVCQUFBWixNQUFBLENBQy9CTCxRQUFRLENBQUNrQixHQUFHLENBQUMsU0FBUyxDQUFDLDhDQUFBYixNQUFBLENBQ1BNLElBQUksQ0FBQ1EsUUFBUSxVQUFBZCxNQUFBLENBQU8sSUFBSWUsSUFBSSxDQUFDLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUMsK0VBQUFoQixNQUFBLENBQ2xCTSxJQUFJLENBQUNXLFNBQVMsb0NBQ25FO1VBQ2V6QixpQkFBaUIsQ0FBQzBCLFdBQVcsQ0FBQ1YsY0FBYyxDQUFDOztVQUU3QztVQUNBbEIsV0FBVyxDQUFDNkIsS0FBSyxDQUFDLENBQUM7UUFDdkI7TUFDSixDQUFDLENBQUMsU0FFSSxDQUFDLFVBQUFaLEtBQUs7UUFBQSxPQUFJckIsT0FBTyxDQUFDcUIsS0FBSyxDQUFDLHlDQUF5QyxFQUFFQSxLQUFLLENBQUM7TUFBQSxFQUFDO0lBQ3hGLENBQUMsQ0FBQztFQUNOLENBQUMsTUFBTTtJQUNIckIsT0FBTyxDQUFDcUIsS0FBSyxDQUFDLHNDQUFzQyxDQUFDO0VBQ3pEO0VBRUEsSUFBSWYsaUJBQWlCLEVBQUU7SUFDbkJOLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG1DQUFtQyxDQUFDO0lBRWhESyxpQkFBaUIsQ0FBQ0gsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVVJLEtBQUssRUFBRTtNQUN6RFAsT0FBTyxDQUFDQyxHQUFHLENBQUMseUJBQXlCLENBQUM7TUFDdENELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGlCQUFpQixFQUFFTSxLQUFLLENBQUMyQixNQUFNLENBQUM7TUFFNUMsSUFBSTNCLEtBQUssQ0FBQzJCLE1BQU0sQ0FBQ1YsU0FBUyxDQUFDVyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNuRG5DLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHlCQUF5QixDQUFDO1FBQ3RDLElBQU04QixTQUFTLEdBQUd4QixLQUFLLENBQUMyQixNQUFNLENBQUNFLE9BQU8sQ0FBQ0wsU0FBUztRQUNoRCxJQUFNcEIsU0FBUyxHQUFHUCxXQUFXLENBQUNRLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztRQUM3RFosT0FBTyxDQUFDQyxHQUFHLENBQUMsYUFBYSxFQUFFOEIsU0FBUyxDQUFDO1FBQ3JDL0IsT0FBTyxDQUFDQyxHQUFHLENBQUMsYUFBYSxFQUFFVSxTQUFTLENBQUM7UUFFckMsSUFBSTBCLE9BQU8sQ0FBQyxxREFBcUQsQ0FBQyxFQUFFO1VBQ2hFeEIsS0FBSyxhQUFBQyxNQUFBLENBQWFILFNBQVMsZUFBQUcsTUFBQSxDQUFZaUIsU0FBUyxjQUFXO1lBQ3ZEaEIsTUFBTSxFQUFFO1VBQ1osQ0FBQyxDQUFDLENBQ0dFLElBQUksQ0FBQyxVQUFBQyxRQUFRLEVBQUk7WUFDZGxCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQixFQUFFaUIsUUFBUSxDQUFDO1lBQ3ZDLElBQUksQ0FBQ0EsUUFBUSxDQUFDb0IsRUFBRSxFQUFFO2NBQ2QsTUFBTSxJQUFJQyxLQUFLLENBQUMsK0JBQStCLENBQUM7WUFDcEQ7WUFDQSxPQUFPckIsUUFBUSxDQUFDQyxJQUFJLENBQUMsQ0FBQztVQUMxQixDQUFDLENBQUMsQ0FDREYsSUFBSSxDQUFDLFVBQUFHLElBQUksRUFBSTtZQUNWcEIsT0FBTyxDQUFDQyxHQUFHLENBQUMsaUJBQWlCLEVBQUVtQixJQUFJLENBQUM7WUFDcEMsSUFBSUEsSUFBSSxDQUFDb0IsT0FBTyxFQUFFO2NBQ2RqQyxLQUFLLENBQUMyQixNQUFNLENBQUNPLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLENBQUM7WUFDN0MsQ0FBQyxNQUFNO2NBQ0gsTUFBTSxJQUFJSCxLQUFLLENBQUNuQixJQUFJLENBQUNDLEtBQUssSUFBSSwrQkFBK0IsQ0FBQztZQUNsRTtVQUNKLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQUEsS0FBSyxFQUFJO1lBQ1pyQixPQUFPLENBQUNxQixLQUFLLENBQUMsU0FBUyxFQUFFQSxLQUFLLENBQUM7WUFDL0JzQixLQUFLLENBQUMsK0RBQStELENBQUM7VUFDMUUsQ0FBQyxDQUFDO1FBQ1Y7TUFDSjtJQUNKLENBQUMsQ0FBQztJQUNGM0MsT0FBTyxDQUFDQyxHQUFHLENBQUMsa0NBQWtDLENBQUM7RUFDbkQsQ0FBQyxNQUFNO0lBQ0hELE9BQU8sQ0FBQ3FCLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQztFQUMxRDtBQUNKLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzdGRjtBQUNBLFNBQVN1QixTQUFTQSxDQUFDQyxJQUFJLEVBQUU7RUFDckIsSUFBTUMsTUFBTSxHQUFHRCxJQUFJLEdBQUcsR0FBRztFQUN6QixJQUFNRSxFQUFFLEdBQUc3QyxRQUFRLENBQUM4QyxNQUFNLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUM7RUFDckMsS0FBSSxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdILEVBQUUsQ0FBQ0ksTUFBTSxFQUFFRCxDQUFDLEVBQUUsRUFBRTtJQUMvQixJQUFJRSxDQUFDLEdBQUdMLEVBQUUsQ0FBQ0csQ0FBQyxDQUFDO0lBQ2IsT0FBT0UsQ0FBQyxDQUFDQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFRCxDQUFDLEdBQUdBLENBQUMsQ0FBQ0UsU0FBUyxDQUFDLENBQUMsRUFBRUYsQ0FBQyxDQUFDRCxNQUFNLENBQUM7SUFDeEQsSUFBSUMsQ0FBQyxDQUFDRyxPQUFPLENBQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtNQUN6QixPQUFPTSxDQUFDLENBQUNFLFNBQVMsQ0FBQ1IsTUFBTSxDQUFDSyxNQUFNLEVBQUVDLENBQUMsQ0FBQ0QsTUFBTSxDQUFDO0lBQy9DO0VBQ0o7RUFDQSxPQUFPLElBQUk7QUFDZjs7QUFFQTtBQUNBLElBQU1LLGFBQWEsR0FBR1osU0FBUyxDQUFDLGlCQUFpQixDQUFDO0FBQ2xELElBQUlZLGFBQWEsS0FBSyxNQUFNLElBQUlBLGFBQWEsS0FBSyxPQUFPLEVBQUU7RUFDdkR0RCxRQUFRLENBQUN1RCxlQUFlLENBQUNDLEtBQUssQ0FBQ0MsV0FBVyxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQztBQUNqRixDQUFDLE1BQU07RUFDSHpELFFBQVEsQ0FBQ3VELGVBQWUsQ0FBQ0MsS0FBSyxDQUFDQyxXQUFXLENBQUMseUJBQXlCLEVBQUUsT0FBTyxDQUFDO0FBQ2xGO0FBRUF6RCxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7RUFDckQsSUFBTXlELFlBQVksR0FBRzFELFFBQVEsQ0FBQ0csY0FBYyxDQUFDLGVBQWUsQ0FBQztFQUM3RCxJQUFNd0QsWUFBWSxHQUFHM0QsUUFBUSxDQUFDRyxjQUFjLENBQUMsZ0JBQWdCLENBQUM7RUFDOUQsSUFBTXlELGFBQWEsR0FBRzVELFFBQVEsQ0FBQ0csY0FBYyxDQUFDLGlCQUFpQixDQUFDO0VBRWhFLFNBQVMwRCxTQUFTQSxDQUFDbEIsSUFBSSxFQUFFbUIsS0FBSyxFQUFFQyxJQUFJLEVBQUU7SUFDbEMsSUFBTUMsSUFBSSxHQUFHLElBQUlyQyxJQUFJLENBQUMsQ0FBQztJQUN2QnFDLElBQUksQ0FBQ0MsT0FBTyxDQUFDRCxJQUFJLENBQUNFLE9BQU8sQ0FBQyxDQUFDLEdBQUlILElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFLLENBQUM7SUFDM0QsSUFBTUksT0FBTyxHQUFHLFVBQVUsR0FBR0gsSUFBSSxDQUFDSSxXQUFXLENBQUMsQ0FBQztJQUMvQ3BFLFFBQVEsQ0FBQzhDLE1BQU0sTUFBQWxDLE1BQUEsQ0FBTStCLElBQUksT0FBQS9CLE1BQUEsQ0FBSWtELEtBQUssUUFBQWxELE1BQUEsQ0FBS3VELE9BQU8saUNBQUF2RCxNQUFBLENBQThCeUQsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFFBQVEsS0FBSyxRQUFRLEdBQUcsU0FBUyxHQUFHLEVBQUUsQ0FBRTtJQUNwSXpFLE9BQU8sQ0FBQ0MsR0FBRyx1QkFBQWEsTUFBQSxDQUFvQitCLElBQUksT0FBQS9CLE1BQUEsQ0FBSWtELEtBQUssUUFBQWxELE1BQUEsQ0FBS3VELE9BQU8sQ0FBRSxDQUFDO0VBQy9EO0VBRUEsU0FBU0ssa0JBQWtCQSxDQUFBLEVBQUc7SUFDMUIsSUFBTUMsV0FBVyxHQUFHL0IsU0FBUyxDQUFDLGlCQUFpQixDQUFDO0lBQ2hENUMsT0FBTyxDQUFDQyxHQUFHLENBQUMsOEJBQThCLEVBQUUwRSxXQUFXLENBQUM7SUFFeEQsSUFBSUEsV0FBVyxLQUFLLE1BQU0sSUFBSUEsV0FBVyxLQUFLLE9BQU8sRUFBRTtNQUNuRGYsWUFBWSxDQUFDRixLQUFLLENBQUNrQixPQUFPLEdBQUcsTUFBTTtNQUNuQzFFLFFBQVEsQ0FBQ3VELGVBQWUsQ0FBQ0MsS0FBSyxDQUFDQyxXQUFXLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDO0lBQ2pGLENBQUMsTUFBTTtNQUNIQyxZQUFZLENBQUNGLEtBQUssQ0FBQ2tCLE9BQU8sR0FBRyxPQUFPO01BQ3BDMUUsUUFBUSxDQUFDdUQsZUFBZSxDQUFDQyxLQUFLLENBQUNDLFdBQVcsQ0FBQyx5QkFBeUIsRUFBRSxPQUFPLENBQUM7SUFDbEY7RUFDSjtFQUVBRSxZQUFZLENBQUMxRCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUM5QzRELFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDO0lBQ3pDSCxZQUFZLENBQUNGLEtBQUssQ0FBQ2tCLE9BQU8sR0FBRyxNQUFNO0lBQ25DMUUsUUFBUSxDQUFDdUQsZUFBZSxDQUFDQyxLQUFLLENBQUNDLFdBQVcsQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUM7SUFDN0UzRCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztFQUNuQyxDQUFDLENBQUM7RUFFRjZELGFBQWEsQ0FBQzNELGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFXO0lBQy9DNEQsU0FBUyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUM7SUFDMUNILFlBQVksQ0FBQ0YsS0FBSyxDQUFDa0IsT0FBTyxHQUFHLE1BQU07SUFDbkMxRSxRQUFRLENBQUN1RCxlQUFlLENBQUNDLEtBQUssQ0FBQ0MsV0FBVyxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQztJQUM3RTNELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGlCQUFpQixDQUFDO0VBQ2xDLENBQUMsQ0FBQzs7RUFFRjtFQUNBeUUsa0JBQWtCLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUM7Ozs7Ozs7Ozs7QUNoRUYxRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztBQUVqQyxJQUFNNEUsUUFBUSxHQUFHLFNBQVhBLFFBQVFBLENBQUEsRUFBUztFQUNuQixJQUFNQyxVQUFVLEdBQUc1RSxRQUFRLENBQUM2RSxhQUFhLENBQUMsY0FBYyxDQUFDO0VBQ3pELElBQU1DLFFBQVEsR0FBRzlFLFFBQVEsQ0FBQzZFLGFBQWEsQ0FBQyxZQUFZLENBQUM7RUFFckQsSUFBSSxDQUFDRCxVQUFVLElBQUksQ0FBQ0UsUUFBUSxFQUFFO0lBQzFCaEYsT0FBTyxDQUFDcUIsS0FBSyxDQUFDLDBCQUEwQixDQUFDO0lBQ3pDO0VBQ0o7RUFFQXJCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLCtDQUErQyxDQUFDO0VBRTVENkUsVUFBVSxDQUFDM0UsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUM4RSxDQUFDLEVBQUs7SUFDeENBLENBQUMsQ0FBQ3pFLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCd0UsUUFBUSxDQUFDeEQsU0FBUyxDQUFDMEQsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUVuQyxJQUFNQyxJQUFJLEdBQUdMLFVBQVUsQ0FBQ0MsYUFBYSxDQUFDLEdBQUcsQ0FBQztJQUMxQyxJQUFJSSxJQUFJLEVBQUU7TUFDTixJQUFJSCxRQUFRLENBQUN4RCxTQUFTLENBQUNXLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN2Q2dELElBQUksQ0FBQzNELFNBQVMsQ0FBQ2tCLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDaEN5QyxJQUFJLENBQUMzRCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7TUFDbEMsQ0FBQyxNQUFNO1FBQ0gwRCxJQUFJLENBQUMzRCxTQUFTLENBQUNrQixNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ2pDeUMsSUFBSSxDQUFDM0QsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO01BQ2pDO0lBQ0o7RUFDSixDQUFDLENBQUM7QUFDTixDQUFDOztBQUVEO0FBQ0EsSUFBSXZCLFFBQVEsQ0FBQ2tGLFVBQVUsS0FBSyxTQUFTLEVBQUU7RUFDbkNsRixRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFMEUsUUFBUSxDQUFDO0FBQzNELENBQUMsTUFBTTtFQUNIQSxRQUFRLENBQUMsQ0FBQztBQUNkOzs7Ozs7Ozs7Ozs7QUNuQ0E7Ozs7Ozs7Ozs7OztBQ0FhO0FBQ2IsWUFBWSxtQkFBTyxDQUFDLHFFQUFvQjs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsV0FBVztBQUMzRCxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7OztBQ1RhO0FBQ2I7QUFDQSxRQUFRLG1CQUFPLENBQUMsdUVBQXFCO0FBQ3JDLGtCQUFrQixtQkFBTyxDQUFDLG1IQUEyQztBQUNyRSxlQUFlLHNIQUE4QztBQUM3RCwwQkFBMEIsbUJBQU8sQ0FBQyx1R0FBcUM7O0FBRXZFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksOENBQThDO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NvbW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL21lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9hcHAuc2Nzcz84ZjU5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaW5kZXgtb2YuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ0FwcC5qcyBpcyBsb2FkZWQhJyk7XG5cbi8vIEltcG9ydCBkZXMgc3R5bGVzXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcblxuLy8gSW1wb3J0IGRlcyBzY3JpcHRzXG5pbXBvcnQgJy4vanMvbWVudS5qcyc7XG5pbXBvcnQgJy4vanMvY29tbWVudC5qcyc7XG5pbXBvcnQgJy4vanMvY29va2llcy5qcyc7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdET00gY2hhcmfDqScpO1xyXG5cclxuICAgIGNvbnN0IGNvbW1lbnRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtZm9ybScpO1xyXG4gICAgY29uc3QgY29tbWVudHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtY29udGFpbmVyJyk7XHJcblxyXG4gICAgaWYgKGNvbW1lbnRGb3JtKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Zvcm11bGFpcmUgZGUgY29tbWVudGFpcmUgdHJvdXbDqScpO1xyXG5cclxuICAgICAgICBjb21tZW50Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Zvcm11bGFpcmUgc291bWlzJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShjb21tZW50Rm9ybSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFydGljbGVJZCA9IGNvbW1lbnRGb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1hcnRpY2xlLWlkJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJRCBkZSBsXFwnYXJ0aWNsZTonLCBhcnRpY2xlSWQpO1xyXG5cclxuICAgICAgICAgICAgZmV0Y2goYC9hcnRpY2xlLyR7YXJ0aWNsZUlkfS9jb21tZW50YCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBmb3JtRGF0YSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1cjonLCBkYXRhLmVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29tbWVudGFpcmUgYWpvdXTDqScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3LDqWUgdW4gbm91dmVsIMOpbMOpbWVudCBwb3VyIGxlIGNvbW1lbnRhaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudEVsZW1lbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8cD4ke2Zvcm1EYXRhLmdldCgnY29udGVudCcpfTwvcD5cclxuICAgICAgICAgICAgPHNtYWxsPlBvc3TDqSBwYXIgOiAke2RhdGEudXNlcm5hbWV9IGxlICR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfTwvc21hbGw+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUtY29tbWVudFwiIGRhdGEtY29tbWVudC1pZD1cIiR7ZGF0YS5jb21tZW50SWR9XCI+U3VwcHJpbWVyPC9idXR0b24+XHJcbiAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudHNDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tbWVudEVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUsOpaW5pdGlhbGlzZSBsZSBmb3JtdWxhaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRGb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyZXVyIGxvcnMgZGUgbFxcJ2Fqb3V0IGR1IGNvbW1lbnRhaXJlOicsIGVycm9yKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zvcm11bGFpcmUgZGUgY29tbWVudGFpcmUgbm9uIHRyb3V2w6knKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29tbWVudHNDb250YWluZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQ29udGFpbmVyIGRlcyBjb21tZW50YWlyZXMgdHJvdXbDqScpO1xyXG5cclxuICAgICAgICBjb21tZW50c0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2sgZGFucyBsZSBjb250YWluZXInKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ8OJbMOpbWVudCBjbGlxdcOpOicsIGV2ZW50LnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLWNvbW1lbnQnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0JvdXRvbiBzdXBwcmltZXIgY2xpcXXDqScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWVudElkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29tbWVudElkO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXJ0aWNsZUlkID0gY29tbWVudEZvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLWFydGljbGUtaWQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb21tZW50IElEOicsIGNvbW1lbnRJZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXJ0aWNsZSBJRDonLCBhcnRpY2xlSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maXJtKCfDinRlcy12b3VzIHPDu3IgZGUgdm91bG9pciBzdXBwcmltZXIgY2UgY29tbWVudGFpcmUgPycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2goYC9hcnRpY2xlLyR7YXJ0aWNsZUlkfS9jb21tZW50LyR7Y29tbWVudElkfS9kZWxldGVgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURSdcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUsOpcG9uc2UgcmXDp3VlOicsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VycmV1ciBsb3JzIGRlIGxhIHN1cHByZXNzaW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEb25uw6llcyByZcOndWVzOicsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuY29tbWVudCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvciB8fCAnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1cjonLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsYSBzdXBwcmVzc2lvbiBkdSBjb21tZW50YWlyZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfDiXbDqW5lbWVudCBkZSBzdXBwcmVzc2lvbiBhdHRhY2jDqScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdDb250YWluZXIgZGVzIGNvbW1lbnRhaXJlcyBub24gdHJvdXbDqScpO1xyXG4gICAgfVxyXG59KTtcclxuIiwiLy8gVsOpcmlmaWNhdGlvbiBpbW3DqWRpYXRlIGRlcyBjb29raWVzIGF2YW50IGxlIGNoYXJnZW1lbnQgZHUgRE9NXHJcbmZ1bmN0aW9uIGdldENvb2tpZShuYW1lKSB7XHJcbiAgICBjb25zdCBuYW1lRVEgPSBuYW1lICsgXCI9XCI7XHJcbiAgICBjb25zdCBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGMgPSBjYVtpXTtcclxuICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKTtcclxuICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWVFUSkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGMuc3Vic3RyaW5nKG5hbWVFUS5sZW5ndGgsIGMubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuLy8gVsOpcmlmaWNhdGlvbiBpbW3DqWRpYXRlIGF2YW50IGxlIGNoYXJnZW1lbnQgZGUgbGEgcGFnZVxyXG5jb25zdCBjb29raWVDb25zZW50ID0gZ2V0Q29va2llKCdjb29raWVzQWNjZXB0ZWQnKTtcclxuaWYgKGNvb2tpZUNvbnNlbnQgPT09ICd0cnVlJyB8fCBjb29raWVDb25zZW50ID09PSAnZmFsc2UnKSB7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29va2llLWJhbm5lci1kaXNwbGF5JywgJ25vbmUnKTtcclxufSBlbHNlIHtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb29raWUtYmFubmVyLWRpc3BsYXknLCAnYmxvY2snKTtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY29va2llQmFubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvb2tpZS1iYW5uZXInKTtcclxuICAgIGNvbnN0IGFjY2VwdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY2NlcHQtY29va2llcycpO1xyXG4gICAgY29uc3QgZGVjbGluZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWNsaW5lLWNvb2tpZXMnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBzZXRDb29raWUobmFtZSwgdmFsdWUsIGRheXMpIHtcclxuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuICAgICAgICBjb25zdCBleHBpcmVzID0gXCJleHBpcmVzPVwiICsgZGF0ZS50b1VUQ1N0cmluZygpO1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke25hbWV9PSR7dmFsdWV9OyAke2V4cGlyZXN9OyBwYXRoPS87IFNhbWVTaXRlPVN0cmljdDsgJHt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonID8gJ1NlY3VyZTsnIDogJyd9YDtcclxuICAgICAgICBjb25zb2xlLmxvZyhgQ29va2llIGTDqWZpbmkgOiAke25hbWV9PSR7dmFsdWV9OyAke2V4cGlyZXN9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tDb29raWVDb25zZW50KCkge1xyXG4gICAgICAgIGNvbnN0IGNvb2tpZVZhbHVlID0gZ2V0Q29va2llKCdjb29raWVzQWNjZXB0ZWQnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIsOJdGF0IGFjdHVlbCBkdSBjb25zZW50ZW1lbnQ6XCIsIGNvb2tpZVZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKGNvb2tpZVZhbHVlID09PSAndHJ1ZScgfHwgY29va2llVmFsdWUgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgY29va2llQmFubmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb29raWUtYmFubmVyLWRpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvb2tpZUJhbm5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvb2tpZS1iYW5uZXItZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhY2NlcHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRDb29raWUoJ2Nvb2tpZXNBY2NlcHRlZCcsICd0cnVlJywgMzY1KTtcclxuICAgICAgICBjb29raWVCYW5uZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29va2llLWJhbm5lci1kaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvb2tpZXMgYWNjZXB0w6lzXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVjbGluZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldENvb2tpZSgnY29va2llc0FjY2VwdGVkJywgJ2ZhbHNlJywgMzY1KTtcclxuICAgICAgICBjb29raWVCYW5uZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29va2llLWJhbm5lci1kaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvb2tpZXMgcmVmdXPDqXNcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBWw6lyaWZpY2F0aW9uIGluaXRpYWxlIGRlcyBjb29raWVzIGF1IGNoYXJnZW1lbnRcclxuICAgIGNoZWNrQ29va2llQ29uc2VudCgpO1xyXG59KTsiLCJjb25zb2xlLmxvZygnTWVudS5qcyBpcyBsb2FkZWQhJyk7XHJcblxyXG5jb25zdCBpbml0TWVudSA9ICgpID0+IHtcclxuICAgIGNvbnN0IG1lbnVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS10b2dnbGUnKTtcclxuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1saW5rcycpO1xyXG5cclxuICAgIGlmICghbWVudVRvZ2dsZSB8fCAhbmF2TGlua3MpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdNZW51IGVsZW1lbnRzIG5vdCBmb3VuZCEnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coJ01lbnUgZWxlbWVudHMgZm91bmQsIGFkZGluZyBjbGljayBsaXN0ZW5lci4uLicpO1xyXG5cclxuICAgIG1lbnVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBuYXZMaW5rcy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgaWNvbiA9IG1lbnVUb2dnbGUucXVlcnlTZWxlY3RvcignaScpO1xyXG4gICAgICAgIGlmIChpY29uKSB7XHJcbiAgICAgICAgICAgIGlmIChuYXZMaW5rcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLWJhcnMnKTtcclxuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEteG1hcmsnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmEteG1hcmsnKTtcclxuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtYmFycycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vLyBJbml0aWFsaXplIHdoZW4gRE9NIGlzIGxvYWRlZFxyXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdE1lbnUpO1xyXG59IGVsc2Uge1xyXG4gICAgaW5pdE1lbnUoKTtcclxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSwgYXJndW1lbnQpIHtcbiAgdmFyIG1ldGhvZCA9IFtdW01FVEhPRF9OQU1FXTtcbiAgcmV0dXJuICEhbWV0aG9kICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1jYWxsIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyByZXR1cm4gMTsgfSwgMSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLWFycmF5LXByb3RvdHlwZS1pbmRleG9mIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtY2xhdXNlJyk7XG52YXIgJGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgbmF0aXZlSW5kZXhPZiA9IHVuY3VycnlUaGlzKFtdLmluZGV4T2YpO1xuXG52YXIgTkVHQVRJVkVfWkVSTyA9ICEhbmF0aXZlSW5kZXhPZiAmJiAxIC8gbmF0aXZlSW5kZXhPZihbMV0sIDEsIC0wKSA8IDA7XG52YXIgRk9SQ0VEID0gTkVHQVRJVkVfWkVSTyB8fCAhYXJyYXlNZXRob2RJc1N0cmljdCgnaW5kZXhPZicpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgaW5kZXhPZjogZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hFbGVtZW50IC8qICwgZnJvbUluZGV4ID0gMCAqLykge1xuICAgIHZhciBmcm9tSW5kZXggPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gTkVHQVRJVkVfWkVST1xuICAgICAgLy8gY29udmVydCAtMCB0byArMFxuICAgICAgPyBuYXRpdmVJbmRleE9mKHRoaXMsIHNlYXJjaEVsZW1lbnQsIGZyb21JbmRleCkgfHwgMFxuICAgICAgOiAkaW5kZXhPZih0aGlzLCBzZWFyY2hFbGVtZW50LCBmcm9tSW5kZXgpO1xuICB9XG59KTtcbiJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29tbWVudEZvcm0iLCJnZXRFbGVtZW50QnlJZCIsImNvbW1lbnRzQ29udGFpbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcnRpY2xlSWQiLCJnZXRBdHRyaWJ1dGUiLCJmZXRjaCIsImNvbmNhdCIsIm1ldGhvZCIsImJvZHkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImVycm9yIiwiY29tbWVudEVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJIVE1MIiwiZ2V0IiwidXNlcm5hbWUiLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJjb21tZW50SWQiLCJhcHBlbmRDaGlsZCIsInJlc2V0IiwidGFyZ2V0IiwiY29udGFpbnMiLCJkYXRhc2V0IiwiY29uZmlybSIsIm9rIiwiRXJyb3IiLCJzdWNjZXNzIiwiY2xvc2VzdCIsInJlbW92ZSIsImFsZXJ0IiwiZ2V0Q29va2llIiwibmFtZSIsIm5hbWVFUSIsImNhIiwiY29va2llIiwic3BsaXQiLCJpIiwibGVuZ3RoIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJjb29raWVDb25zZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImNvb2tpZUJhbm5lciIsImFjY2VwdEJ1dHRvbiIsImRlY2xpbmVCdXR0b24iLCJzZXRDb29raWUiLCJ2YWx1ZSIsImRheXMiLCJkYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJleHBpcmVzIiwidG9VVENTdHJpbmciLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwiY2hlY2tDb29raWVDb25zZW50IiwiY29va2llVmFsdWUiLCJkaXNwbGF5IiwiaW5pdE1lbnUiLCJtZW51VG9nZ2xlIiwicXVlcnlTZWxlY3RvciIsIm5hdkxpbmtzIiwiZSIsInRvZ2dsZSIsImljb24iLCJyZWFkeVN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==
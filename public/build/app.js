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
__webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
__webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
__webpack_require__(/*! core-js/modules/es.string.pad-start.js */ "./node_modules/core-js/modules/es.string.pad-start.js");
document.addEventListener('DOMContentLoaded', function () {
  var commentForm = document.getElementById('comment-form');
  var commentsContainer = document.getElementById('comments-container');
  var articleId = commentsContainer ? commentsContainer.dataset.articleId : null;
  if (commentForm) {
    commentForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var formData = new FormData(commentForm);
      fetch("/article/".concat(articleId, "/comment"), {
        method: 'POST',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.error) {
          console.error('Erreur:', data.error);
        } else {
          var commentElement = document.createElement('div');
          commentElement.classList.add('comment');

          // Formatage de la date comme dans Twig
          var date = new Date();
          var formattedDate = "".concat(date.getDate().toString().padStart(2, '0'), "/").concat((date.getMonth() + 1).toString().padStart(2, '0'), "/").concat(date.getFullYear(), " \xE0 ").concat(date.getHours().toString().padStart(2, '0'), ":").concat(date.getMinutes().toString().padStart(2, '0'));

          // Construction du HTML exactement comme dans le template Twig
          commentElement.innerHTML = "\n                            <p>".concat(formData.get('content'), "</p>\n                            <small>Post\xE9 par <strong>").concat(data.username, "</strong>, le ").concat(formattedDate, "</small>\n                            ").concat(data.canDelete ? "\n                                <button class=\"delete-comment\" data-comment-id=\"".concat(data.commentId, "\" aria-label=\"Supprimer le commentaire\" onclick=\"return confirm('\xCAtes-vous s\xFBr de vouloir supprimer ce commentaire ?');\">\n                                    <i class=\"fa-solid fa-trash\"></i>\n                                </button>\n                            ") : '', "\n                        ");

          // Insérer le nouveau commentaire au début du conteneur
          if (commentsContainer.firstChild) {
            commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);
          } else {
            commentsContainer.appendChild(commentElement);
          }

          // Réinitialiser le formulaire
          commentForm.reset();

          // Si c'était le premier commentaire, supprimer le message "Aucun commentaire"
          var noCommentsMessage = commentsContainer.querySelector('p:only-child');
          if (noCommentsMessage && noCommentsMessage.textContent.includes('Aucun commentaire')) {
            noCommentsMessage.remove();
          }
        }
      })["catch"](function (error) {
        return console.error('Erreur lors de l\'ajout du commentaire:', error);
      });
    });
  }
  if (commentsContainer) {
    commentsContainer.addEventListener('click', function (event) {
      var deleteButton = event.target.closest('.delete-comment');
      if (deleteButton) {
        // La confirmation est déjà gérée par l'attribut onclick dans le HTML
        var commentId = deleteButton.dataset.commentId;
        fetch("/article/".concat(articleId, "/comment/").concat(commentId, "/delete"), {
          method: 'DELETE'
        }).then(function (response) {
          if (!response.ok) {
            throw new Error('Erreur lors de la suppression');
          }
          return response.json();
        }).then(function (data) {
          if (data.success) {
            var commentElement = deleteButton.closest('.comment');
            commentElement.remove();

            // Si c'était le dernier commentaire, afficher le message "Aucun commentaire"
            if (commentsContainer.children.length === 0) {
              var noCommentsMessage = document.createElement('p');
              noCommentsMessage.textContent = 'Aucun commentaire n\'a encore été publié.';
              commentsContainer.appendChild(noCommentsMessage);
            }
          } else {
            throw new Error(data.error || 'Erreur lors de la suppression');
          }
        })["catch"](function (error) {
          console.error('Erreur:', error);
          alert('Une erreur est survenue lors de la suppression du commentaire');
        });
      }
    });
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_function-uncurry-this-clause_js-node_modules_core-js_m-a7bf6b","vendors-node_modules_core-js_modules_es_array_includes_js-node_modules_core-js_modules_es_err-1cf22d"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2I7QUFDQSxRQUFRLG1CQUFPLENBQUMsdUVBQXFCO0FBQ3JDLGtCQUFrQixtQkFBTyxDQUFDLG1IQUEyQztBQUNyRSxlQUFlLHNIQUE4QztBQUM3RCwwQkFBMEIsbUJBQU8sQ0FBQyx1R0FBcUM7O0FBRXZFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksOENBQThDO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NvbW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL21lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9hcHAuc2Nzcz84ZjU5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaW5kZXgtb2YuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ0FwcC5qcyBpcyBsb2FkZWQhJyk7XG5cbi8vIEltcG9ydCBkZXMgc3R5bGVzXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcblxuLy8gSW1wb3J0IGRlcyBzY3JpcHRzXG5pbXBvcnQgJy4vanMvbWVudS5qcyc7XG5pbXBvcnQgJy4vanMvY29tbWVudC5qcyc7XG5pbXBvcnQgJy4vanMvY29va2llcy5qcyc7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGNvbW1lbnRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtZm9ybScpO1xyXG4gICAgY29uc3QgY29tbWVudHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBhcnRpY2xlSWQgPSBjb21tZW50c0NvbnRhaW5lciA/IGNvbW1lbnRzQ29udGFpbmVyLmRhdGFzZXQuYXJ0aWNsZUlkIDogbnVsbDtcclxuXHJcbiAgICBpZiAoY29tbWVudEZvcm0pIHtcclxuICAgICAgICBjb21tZW50Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGNvbW1lbnRGb3JtKTtcclxuXHJcbiAgICAgICAgICAgIGZldGNoKGAvYXJ0aWNsZS8ke2FydGljbGVJZH0vY29tbWVudGAsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogZm9ybURhdGEsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJldXI6JywgZGF0YS5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tbWVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY29tbWVudCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9ybWF0YWdlIGRlIGxhIGRhdGUgY29tbWUgZGFucyBUd2lnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gYCR7ZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfS8keyhkYXRlLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9LyR7ZGF0ZS5nZXRGdWxsWWVhcigpfSDDoCAke2RhdGUuZ2V0SG91cnMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9OiR7ZGF0ZS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfWA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb25zdHJ1Y3Rpb24gZHUgSFRNTCBleGFjdGVtZW50IGNvbW1lIGRhbnMgbGUgdGVtcGxhdGUgVHdpZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50RWxlbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4ke2Zvcm1EYXRhLmdldCgnY29udGVudCcpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbD5Qb3N0w6kgcGFyIDxzdHJvbmc+JHtkYXRhLnVzZXJuYW1lfTwvc3Ryb25nPiwgbGUgJHtmb3JtYXR0ZWREYXRlfTwvc21hbGw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2RhdGEuY2FuRGVsZXRlID8gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUtY29tbWVudFwiIGRhdGEtY29tbWVudC1pZD1cIiR7ZGF0YS5jb21tZW50SWR9XCIgYXJpYS1sYWJlbD1cIlN1cHByaW1lciBsZSBjb21tZW50YWlyZVwiIG9uY2xpY2s9XCJyZXR1cm4gY29uZmlybSgnw4p0ZXMtdm91cyBzw7tyIGRlIHZvdWxvaXIgc3VwcHJpbWVyIGNlIGNvbW1lbnRhaXJlID8nKTtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluc8OpcmVyIGxlIG5vdXZlYXUgY29tbWVudGFpcmUgYXUgZMOpYnV0IGR1IGNvbnRlbmV1clxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tbWVudHNDb250YWluZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudHNDb250YWluZXIuaW5zZXJ0QmVmb3JlKGNvbW1lbnRFbGVtZW50LCBjb21tZW50c0NvbnRhaW5lci5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbW1lbnRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUsOpaW5pdGlhbGlzZXIgbGUgZm9ybXVsYWlyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50Rm9ybS5yZXNldCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2kgYyfDqXRhaXQgbGUgcHJlbWllciBjb21tZW50YWlyZSwgc3VwcHJpbWVyIGxlIG1lc3NhZ2UgXCJBdWN1biBjb21tZW50YWlyZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vQ29tbWVudHNNZXNzYWdlID0gY29tbWVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcigncDpvbmx5LWNoaWxkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub0NvbW1lbnRzTWVzc2FnZSAmJiBub0NvbW1lbnRzTWVzc2FnZS50ZXh0Q29udGVudC5pbmNsdWRlcygnQXVjdW4gY29tbWVudGFpcmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db21tZW50c01lc3NhZ2UucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBsb3JzIGRlIGxcXCdham91dCBkdSBjb21tZW50YWlyZTonLCBlcnJvcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb21tZW50c0NvbnRhaW5lcikge1xyXG4gICAgICAgIGNvbW1lbnRzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuZGVsZXRlLWNvbW1lbnQnKTtcclxuICAgICAgICAgICAgaWYgKGRlbGV0ZUJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgLy8gTGEgY29uZmlybWF0aW9uIGVzdCBkw6lqw6AgZ8OpcsOpZSBwYXIgbCdhdHRyaWJ1dCBvbmNsaWNrIGRhbnMgbGUgSFRNTFxyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWVudElkID0gZGVsZXRlQnV0dG9uLmRhdGFzZXQuY29tbWVudElkO1xyXG5cclxuICAgICAgICAgICAgICAgIGZldGNoKGAvYXJ0aWNsZS8ke2FydGljbGVJZH0vY29tbWVudC8ke2NvbW1lbnRJZH0vZGVsZXRlYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VycmV1ciBsb3JzIGRlIGxhIHN1cHByZXNzaW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21tZW50RWxlbWVudCA9IGRlbGV0ZUJ1dHRvbi5jbG9zZXN0KCcuY29tbWVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudEVsZW1lbnQucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2kgYyfDqXRhaXQgbGUgZGVybmllciBjb21tZW50YWlyZSwgYWZmaWNoZXIgbGUgbWVzc2FnZSBcIkF1Y3VuIGNvbW1lbnRhaXJlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21tZW50c0NvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBub0NvbW1lbnRzTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0NvbW1lbnRzTWVzc2FnZS50ZXh0Q29udGVudCA9ICdBdWN1biBjb21tZW50YWlyZSBuXFwnYSBlbmNvcmUgw6l0w6kgcHVibGnDqS4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzQ29udGFpbmVyLmFwcGVuZENoaWxkKG5vQ29tbWVudHNNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLmVycm9yIHx8ICdFcnJldXIgbG9ycyBkZSBsYSBzdXBwcmVzc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJldXI6JywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsYSBzdXBwcmVzc2lvbiBkdSBjb21tZW50YWlyZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pOyIsIi8vIFbDqXJpZmljYXRpb24gaW1tw6lkaWF0ZSBkZXMgY29va2llcyBhdmFudCBsZSBjaGFyZ2VtZW50IGR1IERPTVxyXG5mdW5jdGlvbiBnZXRDb29raWUobmFtZSkge1xyXG4gICAgY29uc3QgbmFtZUVRID0gbmFtZSArIFwiPVwiO1xyXG4gICAgY29uc3QgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBjID0gY2FbaV07XHJcbiAgICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09PSAnICcpIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aCk7XHJcbiAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbi8vIFbDqXJpZmljYXRpb24gaW1tw6lkaWF0ZSBhdmFudCBsZSBjaGFyZ2VtZW50IGRlIGxhIHBhZ2VcclxuY29uc3QgY29va2llQ29uc2VudCA9IGdldENvb2tpZSgnY29va2llc0FjY2VwdGVkJyk7XHJcbmlmIChjb29raWVDb25zZW50ID09PSAndHJ1ZScgfHwgY29va2llQ29uc2VudCA9PT0gJ2ZhbHNlJykge1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvb2tpZS1iYW5uZXItZGlzcGxheScsICdub25lJyk7XHJcbn0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29va2llLWJhbm5lci1kaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNvb2tpZUJhbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb29raWUtYmFubmVyJyk7XHJcbiAgICBjb25zdCBhY2NlcHRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWNjZXB0LWNvb2tpZXMnKTtcclxuICAgIGNvbnN0IGRlY2xpbmVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVjbGluZS1jb29raWVzJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0Q29va2llKG5hbWUsIHZhbHVlLCBkYXlzKSB7XHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XHJcbiAgICAgICAgY29uc3QgZXhwaXJlcyA9IFwiZXhwaXJlcz1cIiArIGRhdGUudG9VVENTdHJpbmcoKTtcclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgJHtuYW1lfT0ke3ZhbHVlfTsgJHtleHBpcmVzfTsgcGF0aD0vOyBTYW1lU2l0ZT1TdHJpY3Q7ICR7d2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JyA/ICdTZWN1cmU7JyA6ICcnfWA7XHJcbiAgICAgICAgY29uc29sZS5sb2coYENvb2tpZSBkw6lmaW5pIDogJHtuYW1lfT0ke3ZhbHVlfTsgJHtleHBpcmVzfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrQ29va2llQ29uc2VudCgpIHtcclxuICAgICAgICBjb25zdCBjb29raWVWYWx1ZSA9IGdldENvb2tpZSgnY29va2llc0FjY2VwdGVkJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLDiXRhdCBhY3R1ZWwgZHUgY29uc2VudGVtZW50OlwiLCBjb29raWVWYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmIChjb29raWVWYWx1ZSA9PT0gJ3RydWUnIHx8IGNvb2tpZVZhbHVlID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgIGNvb2tpZUJhbm5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29va2llLWJhbm5lci1kaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb29raWVCYW5uZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb29raWUtYmFubmVyLWRpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWNjZXB0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0Q29va2llKCdjb29raWVzQWNjZXB0ZWQnLCAndHJ1ZScsIDM2NSk7XHJcbiAgICAgICAgY29va2llQmFubmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvb2tpZS1iYW5uZXItZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb29raWVzIGFjY2VwdMOpc1wiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlY2xpbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRDb29raWUoJ2Nvb2tpZXNBY2NlcHRlZCcsICdmYWxzZScsIDM2NSk7XHJcbiAgICAgICAgY29va2llQmFubmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvb2tpZS1iYW5uZXItZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb29raWVzIHJlZnVzw6lzXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVsOpcmlmaWNhdGlvbiBpbml0aWFsZSBkZXMgY29va2llcyBhdSBjaGFyZ2VtZW50XHJcbiAgICBjaGVja0Nvb2tpZUNvbnNlbnQoKTtcclxufSk7IiwiY29uc29sZS5sb2coJ01lbnUuanMgaXMgbG9hZGVkIScpO1xyXG5cclxuY29uc3QgaW5pdE1lbnUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBtZW51VG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtdG9nZ2xlJyk7XHJcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtbGlua3MnKTtcclxuXHJcbiAgICBpZiAoIW1lbnVUb2dnbGUgfHwgIW5hdkxpbmtzKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTWVudSBlbGVtZW50cyBub3QgZm91bmQhJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdNZW51IGVsZW1lbnRzIGZvdW5kLCBhZGRpbmcgY2xpY2sgbGlzdGVuZXIuLi4nKTtcclxuXHJcbiAgICBtZW51VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbmF2TGlua3MuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGljb24gPSBtZW51VG9nZ2xlLnF1ZXJ5U2VsZWN0b3IoJ2knKTtcclxuICAgICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgICAgICBpZiAobmF2TGlua3MuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYS1iYXJzJyk7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXhtYXJrJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLXhtYXJrJyk7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLWJhcnMnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZSB3aGVuIERPTSBpcyBsb2FkZWRcclxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRNZW51KTtcclxufSBlbHNlIHtcclxuICAgIGluaXRNZW51KCk7XHJcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH0sIDEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1hcnJheS1wcm90b3R5cGUtaW5kZXhvZiAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWNsYXVzZScpO1xudmFyICRpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcblxudmFyIG5hdGl2ZUluZGV4T2YgPSB1bmN1cnJ5VGhpcyhbXS5pbmRleE9mKTtcblxudmFyIE5FR0FUSVZFX1pFUk8gPSAhIW5hdGl2ZUluZGV4T2YgJiYgMSAvIG5hdGl2ZUluZGV4T2YoWzFdLCAxLCAtMCkgPCAwO1xudmFyIEZPUkNFRCA9IE5FR0FUSVZFX1pFUk8gfHwgIWFycmF5TWV0aG9kSXNTdHJpY3QoJ2luZGV4T2YnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiAsIGZyb21JbmRleCA9IDAgKi8pIHtcbiAgICB2YXIgZnJvbUluZGV4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIE5FR0FUSVZFX1pFUk9cbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICAgID8gbmF0aXZlSW5kZXhPZih0aGlzLCBzZWFyY2hFbGVtZW50LCBmcm9tSW5kZXgpIHx8IDBcbiAgICAgIDogJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgZnJvbUluZGV4KTtcbiAgfVxufSk7XG4iXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbW1lbnRGb3JtIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb21tZW50c0NvbnRhaW5lciIsImFydGljbGVJZCIsImRhdGFzZXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImZldGNoIiwiY29uY2F0IiwibWV0aG9kIiwiYm9keSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwiZXJyb3IiLCJjb21tZW50RWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkYXRlIiwiRGF0ZSIsImZvcm1hdHRlZERhdGUiLCJnZXREYXRlIiwidG9TdHJpbmciLCJwYWRTdGFydCIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJpbm5lckhUTUwiLCJnZXQiLCJ1c2VybmFtZSIsImNhbkRlbGV0ZSIsImNvbW1lbnRJZCIsImZpcnN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsInJlc2V0Iiwibm9Db21tZW50c01lc3NhZ2UiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJpbmNsdWRlcyIsInJlbW92ZSIsImRlbGV0ZUJ1dHRvbiIsInRhcmdldCIsImNsb3Nlc3QiLCJvayIsIkVycm9yIiwic3VjY2VzcyIsImNoaWxkcmVuIiwibGVuZ3RoIiwiYWxlcnQiLCJnZXRDb29raWUiLCJuYW1lIiwibmFtZUVRIiwiY2EiLCJjb29raWUiLCJzcGxpdCIsImkiLCJjIiwiY2hhckF0Iiwic3Vic3RyaW5nIiwiaW5kZXhPZiIsImNvb2tpZUNvbnNlbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiY29va2llQmFubmVyIiwiYWNjZXB0QnV0dG9uIiwiZGVjbGluZUJ1dHRvbiIsInNldENvb2tpZSIsInZhbHVlIiwiZGF5cyIsInNldFRpbWUiLCJnZXRUaW1lIiwiZXhwaXJlcyIsInRvVVRDU3RyaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJwcm90b2NvbCIsImNoZWNrQ29va2llQ29uc2VudCIsImNvb2tpZVZhbHVlIiwiZGlzcGxheSIsImluaXRNZW51IiwibWVudVRvZ2dsZSIsIm5hdkxpbmtzIiwiZSIsInRvZ2dsZSIsImljb24iLCJjb250YWlucyIsInJlYWR5U3RhdGUiXSwic291cmNlUm9vdCI6IiJ9
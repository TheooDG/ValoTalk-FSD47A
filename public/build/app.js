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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_modules_es_array_concat_js-node_modules_core-js_modules_es_date_-7a7281"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVLENBQUNDLGFBQWEsQ0FBQyxHQUFHLENBQUM7SUFDMUMsSUFBSUksSUFBSSxFQUFFO01BQ04sSUFBSUgsUUFBUSxDQUFDdkIsU0FBUyxDQUFDVyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDdkNlLElBQUksQ0FBQzFCLFNBQVMsQ0FBQ2tCLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDaENRLElBQUksQ0FBQzFCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztNQUNsQyxDQUFDLE1BQU07UUFDSHlCLElBQUksQ0FBQzFCLFNBQVMsQ0FBQ2tCLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDakNRLElBQUksQ0FBQzFCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztNQUNqQztJQUNKO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQ0FBQzs7QUFFRDtBQUNBLElBQUl2QixRQUFRLENBQUNpRCxVQUFVLEtBQUssU0FBUyxFQUFFO0VBQ25DakQsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRXlDLFFBQVEsQ0FBQztBQUMzRCxDQUFDLE1BQU07RUFDSEEsUUFBUSxDQUFDLENBQUM7QUFDZDs7Ozs7Ozs7Ozs7O0FDbkNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29tbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzPzhmNTkiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ0FwcC5qcyBpcyBsb2FkZWQhJyk7XG5cbi8vIEltcG9ydCBkZXMgc3R5bGVzXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcblxuLy8gSW1wb3J0IGRlcyBzY3JpcHRzXG5pbXBvcnQgJy4vanMvbWVudS5qcyc7XG5pbXBvcnQgJy4vanMvY29tbWVudC5qcyc7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdET00gY2hhcmfDqScpO1xyXG5cclxuICAgIGNvbnN0IGNvbW1lbnRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtZm9ybScpO1xyXG4gICAgY29uc3QgY29tbWVudHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtY29udGFpbmVyJyk7XHJcblxyXG4gICAgaWYgKGNvbW1lbnRGb3JtKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Zvcm11bGFpcmUgZGUgY29tbWVudGFpcmUgdHJvdXbDqScpO1xyXG5cclxuICAgICAgICBjb21tZW50Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Zvcm11bGFpcmUgc291bWlzJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShjb21tZW50Rm9ybSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFydGljbGVJZCA9IGNvbW1lbnRGb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1hcnRpY2xlLWlkJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJRCBkZSBsXFwnYXJ0aWNsZTonLCBhcnRpY2xlSWQpO1xyXG5cclxuICAgICAgICAgICAgZmV0Y2goYC9hcnRpY2xlLyR7YXJ0aWNsZUlkfS9jb21tZW50YCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBmb3JtRGF0YSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1cjonLCBkYXRhLmVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29tbWVudGFpcmUgYWpvdXTDqScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3LDqWUgdW4gbm91dmVsIMOpbMOpbWVudCBwb3VyIGxlIGNvbW1lbnRhaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudEVsZW1lbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8cD4ke2Zvcm1EYXRhLmdldCgnY29udGVudCcpfTwvcD5cclxuICAgICAgICAgICAgPHNtYWxsPlBvc3TDqSBwYXIgOiAke2RhdGEudXNlcm5hbWV9IGxlICR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfTwvc21hbGw+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUtY29tbWVudFwiIGRhdGEtY29tbWVudC1pZD1cIiR7ZGF0YS5jb21tZW50SWR9XCI+U3VwcHJpbWVyPC9idXR0b24+XHJcbiAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudHNDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tbWVudEVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUsOpaW5pdGlhbGlzZSBsZSBmb3JtdWxhaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRGb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyZXVyIGxvcnMgZGUgbFxcJ2Fqb3V0IGR1IGNvbW1lbnRhaXJlOicsIGVycm9yKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zvcm11bGFpcmUgZGUgY29tbWVudGFpcmUgbm9uIHRyb3V2w6knKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29tbWVudHNDb250YWluZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQ29udGFpbmVyIGRlcyBjb21tZW50YWlyZXMgdHJvdXbDqScpO1xyXG5cclxuICAgICAgICBjb21tZW50c0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2sgZGFucyBsZSBjb250YWluZXInKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ8OJbMOpbWVudCBjbGlxdcOpOicsIGV2ZW50LnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLWNvbW1lbnQnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0JvdXRvbiBzdXBwcmltZXIgY2xpcXXDqScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWVudElkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29tbWVudElkO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXJ0aWNsZUlkID0gY29tbWVudEZvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLWFydGljbGUtaWQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb21tZW50IElEOicsIGNvbW1lbnRJZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXJ0aWNsZSBJRDonLCBhcnRpY2xlSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maXJtKCfDinRlcy12b3VzIHPDu3IgZGUgdm91bG9pciBzdXBwcmltZXIgY2UgY29tbWVudGFpcmUgPycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2goYC9hcnRpY2xlLyR7YXJ0aWNsZUlkfS9jb21tZW50LyR7Y29tbWVudElkfS9kZWxldGVgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURSdcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUsOpcG9uc2UgcmXDp3VlOicsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VycmV1ciBsb3JzIGRlIGxhIHN1cHByZXNzaW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEb25uw6llcyByZcOndWVzOicsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuY29tbWVudCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvciB8fCAnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1cjonLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsYSBzdXBwcmVzc2lvbiBkdSBjb21tZW50YWlyZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfDiXbDqW5lbWVudCBkZSBzdXBwcmVzc2lvbiBhdHRhY2jDqScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdDb250YWluZXIgZGVzIGNvbW1lbnRhaXJlcyBub24gdHJvdXbDqScpO1xyXG4gICAgfVxyXG59KTtcclxuIiwiY29uc29sZS5sb2coJ01lbnUuanMgaXMgbG9hZGVkIScpO1xyXG5cclxuY29uc3QgaW5pdE1lbnUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBtZW51VG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtdG9nZ2xlJyk7XHJcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtbGlua3MnKTtcclxuXHJcbiAgICBpZiAoIW1lbnVUb2dnbGUgfHwgIW5hdkxpbmtzKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTWVudSBlbGVtZW50cyBub3QgZm91bmQhJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdNZW51IGVsZW1lbnRzIGZvdW5kLCBhZGRpbmcgY2xpY2sgbGlzdGVuZXIuLi4nKTtcclxuXHJcbiAgICBtZW51VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbmF2TGlua3MuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGljb24gPSBtZW51VG9nZ2xlLnF1ZXJ5U2VsZWN0b3IoJ2knKTtcclxuICAgICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgICAgICBpZiAobmF2TGlua3MuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYS1iYXJzJyk7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXhtYXJrJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLXhtYXJrJyk7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLWJhcnMnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZSB3aGVuIERPTSBpcyBsb2FkZWRcclxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRNZW51KTtcclxufSBlbHNlIHtcclxuICAgIGluaXRNZW51KCk7XHJcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbW1lbnRGb3JtIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb21tZW50c0NvbnRhaW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXJ0aWNsZUlkIiwiZ2V0QXR0cmlidXRlIiwiZmV0Y2giLCJjb25jYXQiLCJtZXRob2QiLCJib2R5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJlcnJvciIsImNvbW1lbnRFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVySFRNTCIsImdldCIsInVzZXJuYW1lIiwiRGF0ZSIsInRvTG9jYWxlU3RyaW5nIiwiY29tbWVudElkIiwiYXBwZW5kQ2hpbGQiLCJyZXNldCIsInRhcmdldCIsImNvbnRhaW5zIiwiZGF0YXNldCIsImNvbmZpcm0iLCJvayIsIkVycm9yIiwic3VjY2VzcyIsImNsb3Nlc3QiLCJyZW1vdmUiLCJhbGVydCIsImluaXRNZW51IiwibWVudVRvZ2dsZSIsInF1ZXJ5U2VsZWN0b3IiLCJuYXZMaW5rcyIsImUiLCJ0b2dnbGUiLCJpY29uIiwicmVhZHlTdGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=
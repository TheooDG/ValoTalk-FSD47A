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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVLENBQUNDLGFBQWEsQ0FBQyxHQUFHLENBQUM7SUFDMUMsSUFBSUksSUFBSSxFQUFFO01BQ04sSUFBSUgsUUFBUSxDQUFDdkIsU0FBUyxDQUFDVyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDdkNlLElBQUksQ0FBQzFCLFNBQVMsQ0FBQ2tCLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDaENRLElBQUksQ0FBQzFCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztNQUNsQyxDQUFDLE1BQU07UUFDSHlCLElBQUksQ0FBQzFCLFNBQVMsQ0FBQ2tCLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDakNRLElBQUksQ0FBQzFCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztNQUNqQztJQUNKO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQ0FBQzs7QUFFRDtBQUNBLElBQUl2QixRQUFRLENBQUNpRCxVQUFVLEtBQUssU0FBUyxFQUFFO0VBQ25DakQsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRXlDLFFBQVEsQ0FBQztBQUMzRCxDQUFDLE1BQU07RUFDSEEsUUFBUSxDQUFDLENBQUM7QUFDZDs7Ozs7Ozs7Ozs7O0FDbkNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29tbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzPzhmNTkiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ0FwcC5qcyBpcyBsb2FkZWQhJyk7XHJcblxyXG4vLyBJbXBvcnQgZGVzIHN0eWxlc1xyXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcclxuXHJcbi8vIEltcG9ydCBkZXMgc2NyaXB0c1xyXG5pbXBvcnQgJy4vanMvbWVudS5qcyc7XHJcbmltcG9ydCAnLi9qcy9jb21tZW50LmpzJzsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coJ0RPTSBjaGFyZ8OpJyk7XHJcblxyXG4gICAgY29uc3QgY29tbWVudEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC1mb3JtJyk7XHJcbiAgICBjb25zdCBjb21tZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy1jb250YWluZXInKTtcclxuXHJcbiAgICBpZiAoY29tbWVudEZvcm0pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRm9ybXVsYWlyZSBkZSBjb21tZW50YWlyZSB0cm91dsOpJyk7XHJcblxyXG4gICAgICAgIGNvbW1lbnRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRm9ybXVsYWlyZSBzb3VtaXMnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGNvbW1lbnRGb3JtKTtcclxuICAgICAgICAgICAgY29uc3QgYXJ0aWNsZUlkID0gY29tbWVudEZvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLWFydGljbGUtaWQnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lEIGRlIGxcXCdhcnRpY2xlOicsIGFydGljbGVJZCk7XHJcblxyXG4gICAgICAgICAgICBmZXRjaChgL2FydGljbGUvJHthcnRpY2xlSWR9L2NvbW1lbnRgLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyZXVyOicsIGRhdGEuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb21tZW50YWlyZSBham91dMOpJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcsOpZSB1biBub3V2ZWwgw6lsw6ltZW50IHBvdXIgbGUgY29tbWVudGFpcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tbWVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY29tbWVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50RWxlbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxwPiR7Zm9ybURhdGEuZ2V0KCdjb250ZW50Jyl9PC9wPlxyXG4gICAgICAgICAgICA8c21hbGw+UG9zdMOpIHBhciA6ICR7ZGF0YS51c2VybmFtZX0gbGUgJHtuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCl9PC9zbWFsbD5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZS1jb21tZW50XCIgZGF0YS1jb21tZW50LWlkPVwiJHtkYXRhLmNvbW1lbnRJZH1cIj5TdXBwcmltZXI8L2J1dHRvbj5cclxuICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50c0NvbnRhaW5lci5hcHBlbmRDaGlsZChjb21tZW50RWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSw6lpbml0aWFsaXNlIGxlIGZvcm11bGFpcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudEZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJldXIgbG9ycyBkZSBsXFwnYWpvdXQgZHUgY29tbWVudGFpcmU6JywgZXJyb3IpKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRm9ybXVsYWlyZSBkZSBjb21tZW50YWlyZSBub24gdHJvdXbDqScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb21tZW50c0NvbnRhaW5lcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDb250YWluZXIgZGVzIGNvbW1lbnRhaXJlcyB0cm91dsOpJyk7XHJcblxyXG4gICAgICAgIGNvbW1lbnRzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDbGljayBkYW5zIGxlIGNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnw4lsw6ltZW50IGNsaXF1w6k6JywgZXZlbnQudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtY29tbWVudCcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQm91dG9uIHN1cHByaW1lciBjbGlxdcOpJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tZW50SWQgPSBldmVudC50YXJnZXQuZGF0YXNldC5jb21tZW50SWQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhcnRpY2xlSWQgPSBjb21tZW50Rm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXJ0aWNsZS1pZCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbW1lbnQgSUQ6JywgY29tbWVudElkKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBcnRpY2xlIElEOicsIGFydGljbGVJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpcm0oJ8OKdGVzLXZvdXMgc8O7ciBkZSB2b3Vsb2lyIHN1cHByaW1lciBjZSBjb21tZW50YWlyZSA/JykpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZXRjaChgL2FydGljbGUvJHthcnRpY2xlSWR9L2NvbW1lbnQvJHtjb21tZW50SWR9L2RlbGV0ZWAsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSw6lwb25zZSByZcOndWU6JywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Rvbm7DqWVzIHJlw6d1ZXM6JywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5jb21tZW50JykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLmVycm9yIHx8ICdFcnJldXIgbG9ycyBkZSBsYSBzdXBwcmVzc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyZXVyOicsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmUgZXJyZXVyIGVzdCBzdXJ2ZW51ZSBsb3JzIGRlIGxhIHN1cHByZXNzaW9uIGR1IGNvbW1lbnRhaXJlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ8OJdsOpbmVtZW50IGRlIHN1cHByZXNzaW9uIGF0dGFjaMOpJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvbnRhaW5lciBkZXMgY29tbWVudGFpcmVzIG5vbiB0cm91dsOpJyk7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCJjb25zb2xlLmxvZygnTWVudS5qcyBpcyBsb2FkZWQhJyk7XHJcblxyXG5jb25zdCBpbml0TWVudSA9ICgpID0+IHtcclxuICAgIGNvbnN0IG1lbnVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS10b2dnbGUnKTtcclxuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1saW5rcycpO1xyXG5cclxuICAgIGlmICghbWVudVRvZ2dsZSB8fCAhbmF2TGlua3MpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdNZW51IGVsZW1lbnRzIG5vdCBmb3VuZCEnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coJ01lbnUgZWxlbWVudHMgZm91bmQsIGFkZGluZyBjbGljayBsaXN0ZW5lci4uLicpO1xyXG5cclxuICAgIG1lbnVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBuYXZMaW5rcy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgaWNvbiA9IG1lbnVUb2dnbGUucXVlcnlTZWxlY3RvcignaScpO1xyXG4gICAgICAgIGlmIChpY29uKSB7XHJcbiAgICAgICAgICAgIGlmIChuYXZMaW5rcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLWJhcnMnKTtcclxuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEteG1hcmsnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmEteG1hcmsnKTtcclxuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtYmFycycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vLyBJbml0aWFsaXplIHdoZW4gRE9NIGlzIGxvYWRlZFxyXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdE1lbnUpO1xyXG59IGVsc2Uge1xyXG4gICAgaW5pdE1lbnUoKTtcclxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29tbWVudEZvcm0iLCJnZXRFbGVtZW50QnlJZCIsImNvbW1lbnRzQ29udGFpbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcnRpY2xlSWQiLCJnZXRBdHRyaWJ1dGUiLCJmZXRjaCIsImNvbmNhdCIsIm1ldGhvZCIsImJvZHkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImVycm9yIiwiY29tbWVudEVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJIVE1MIiwiZ2V0IiwidXNlcm5hbWUiLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJjb21tZW50SWQiLCJhcHBlbmRDaGlsZCIsInJlc2V0IiwidGFyZ2V0IiwiY29udGFpbnMiLCJkYXRhc2V0IiwiY29uZmlybSIsIm9rIiwiRXJyb3IiLCJzdWNjZXNzIiwiY2xvc2VzdCIsInJlbW92ZSIsImFsZXJ0IiwiaW5pdE1lbnUiLCJtZW51VG9nZ2xlIiwicXVlcnlTZWxlY3RvciIsIm5hdkxpbmtzIiwiZSIsInRvZ2dsZSIsImljb24iLCJyZWFkeVN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==
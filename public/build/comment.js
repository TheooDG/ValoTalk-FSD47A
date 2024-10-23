(self["webpackChunk"] = self["webpackChunk"] || []).push([["comment"],{

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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_modules_es_array_concat_js-node_modules_core-js_modules_es_date_-7a7281"], () => (__webpack_exec__("./assets/js/comment.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBQUssSUFBSSwrQkFBK0IsQ0FBQztZQUNsRTtVQUNKLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQUEsS0FBSyxFQUFJO1lBQ1puQixPQUFPLENBQUNtQixLQUFLLENBQUMsU0FBUyxFQUFFQSxLQUFLLENBQUM7WUFDL0JzQixLQUFLLENBQUMsK0RBQStELENBQUM7VUFDMUUsQ0FBQyxDQUFDO1FBQ1Y7TUFDSjtJQUNKLENBQUMsQ0FBQztJQUNGekMsT0FBTyxDQUFDQyxHQUFHLENBQUMsa0NBQWtDLENBQUM7RUFDbkQsQ0FBQyxNQUFNO0lBQ0hELE9BQU8sQ0FBQ21CLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQztFQUMxRDtBQUNKLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb21tZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnRE9NIGNoYXJnw6knKTtcclxuXHJcbiAgICBjb25zdCBjb21tZW50Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LWZvcm0nKTtcclxuICAgIGNvbnN0IGNvbW1lbnRzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLWNvbnRhaW5lcicpO1xyXG5cclxuICAgIGlmIChjb21tZW50Rm9ybSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdGb3JtdWxhaXJlIGRlIGNvbW1lbnRhaXJlIHRyb3V2w6knKTtcclxuXHJcbiAgICAgICAgY29tbWVudEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGb3JtdWxhaXJlIHNvdW1pcycpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoY29tbWVudEZvcm0pO1xyXG4gICAgICAgICAgICBjb25zdCBhcnRpY2xlSWQgPSBjb21tZW50Rm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXJ0aWNsZS1pZCcpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSUQgZGUgbFxcJ2FydGljbGU6JywgYXJ0aWNsZUlkKTtcclxuXHJcbiAgICAgICAgICAgIGZldGNoKGAvYXJ0aWNsZS8ke2FydGljbGVJZH0vY29tbWVudGAsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogZm9ybURhdGEsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJldXI6JywgZGF0YS5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbW1lbnRhaXJlIGFqb3V0w6knKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyw6llIHVuIG5vdXZlbCDDqWzDqW1lbnQgcG91ciBsZSBjb21tZW50YWlyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21tZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb21tZW50Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRFbGVtZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPHA+JHtmb3JtRGF0YS5nZXQoJ2NvbnRlbnQnKX08L3A+XHJcbiAgICAgICAgICAgIDxzbWFsbD5Qb3N0w6kgcGFyIDogJHtkYXRhLnVzZXJuYW1lfSBsZSAke25ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKX08L3NtYWxsPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlLWNvbW1lbnRcIiBkYXRhLWNvbW1lbnQtaWQ9XCIke2RhdGEuY29tbWVudElkfVwiPlN1cHByaW1lcjwvYnV0dG9uPlxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbW1lbnRFbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFLDqWluaXRpYWxpc2UgbGUgZm9ybXVsYWlyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50Rm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBsb3JzIGRlIGxcXCdham91dCBkdSBjb21tZW50YWlyZTonLCBlcnJvcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdGb3JtdWxhaXJlIGRlIGNvbW1lbnRhaXJlIG5vbiB0cm91dsOpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbW1lbnRzQ29udGFpbmVyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0NvbnRhaW5lciBkZXMgY29tbWVudGFpcmVzIHRyb3V2w6knKTtcclxuXHJcbiAgICAgICAgY29tbWVudHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrIGRhbnMgbGUgY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfDiWzDqW1lbnQgY2xpcXXDqTonLCBldmVudC50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZS1jb21tZW50JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCb3V0b24gc3VwcHJpbWVyIGNsaXF1w6knKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRJZCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbW1lbnRJZDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFydGljbGVJZCA9IGNvbW1lbnRGb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1hcnRpY2xlLWlkJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29tbWVudCBJRDonLCBjb21tZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0FydGljbGUgSUQ6JywgYXJ0aWNsZUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlybSgnw4p0ZXMtdm91cyBzw7tyIGRlIHZvdWxvaXIgc3VwcHJpbWVyIGNlIGNvbW1lbnRhaXJlID8nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoKGAvYXJ0aWNsZS8ke2FydGljbGVJZH0vY29tbWVudC8ke2NvbW1lbnRJZH0vZGVsZXRlYCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1LDqXBvbnNlIHJlw6d1ZTonLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJldXIgbG9ycyBkZSBsYSBzdXBwcmVzc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRG9ubsOpZXMgcmXDp3VlczonLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xvc2VzdCgnLmNvbW1lbnQnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEuZXJyb3IgfHwgJ0VycmV1ciBsb3JzIGRlIGxhIHN1cHByZXNzaW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJldXI6JywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1VuZSBlcnJldXIgZXN0IHN1cnZlbnVlIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24gZHUgY29tbWVudGFpcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnw4l2w6luZW1lbnQgZGUgc3VwcHJlc3Npb24gYXR0YWNow6knKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignQ29udGFpbmVyIGRlcyBjb21tZW50YWlyZXMgbm9uIHRyb3V2w6knKTtcclxuICAgIH1cclxufSk7XHJcbiJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwiY29tbWVudEZvcm0iLCJnZXRFbGVtZW50QnlJZCIsImNvbW1lbnRzQ29udGFpbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcnRpY2xlSWQiLCJnZXRBdHRyaWJ1dGUiLCJmZXRjaCIsImNvbmNhdCIsIm1ldGhvZCIsImJvZHkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImVycm9yIiwiY29tbWVudEVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJIVE1MIiwiZ2V0IiwidXNlcm5hbWUiLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJjb21tZW50SWQiLCJhcHBlbmRDaGlsZCIsInJlc2V0IiwidGFyZ2V0IiwiY29udGFpbnMiLCJkYXRhc2V0IiwiY29uZmlybSIsIm9rIiwiRXJyb3IiLCJzdWNjZXNzIiwiY2xvc2VzdCIsInJlbW92ZSIsImFsZXJ0Il0sInNvdXJjZVJvb3QiOiIifQ==
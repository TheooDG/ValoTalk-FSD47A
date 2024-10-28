(self["webpackChunk"] = self["webpackChunk"] || []).push([["comment"],{

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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_function-uncurry-this-clause_js-node_modules_core-js_m-a7bf6b","vendors-node_modules_core-js_modules_es_array_includes_js-node_modules_core-js_modules_es_err-1cf22d"], () => (__webpack_exec__("./assets/js/comment.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ29DLE9BQU8sRUFBRTtZQUNkLElBQU1qQyxjQUFjLEdBQUc0QixZQUFZLENBQUNFLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDdkQ5QixjQUFjLENBQUMyQixNQUFNLENBQUMsQ0FBQzs7WUFFdkI7WUFDQSxJQUFJNUMsaUJBQWlCLENBQUNtRCxRQUFRLENBQUNDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Y0FDekMsSUFBTVosaUJBQWlCLEdBQUc1QyxRQUFRLENBQUNzQixhQUFhLENBQUMsR0FBRyxDQUFDO2NBQ3JEc0IsaUJBQWlCLENBQUNFLFdBQVcsR0FBRywyQ0FBMkM7Y0FDM0UxQyxpQkFBaUIsQ0FBQ3NDLFdBQVcsQ0FBQ0UsaUJBQWlCLENBQUM7WUFDcEQ7VUFDSixDQUFDLE1BQU07WUFDSCxNQUFNLElBQUlTLEtBQUssQ0FBQ25DLElBQUksQ0FBQ0MsS0FBSyxJQUFJLCtCQUErQixDQUFDO1VBQ2xFO1FBQ0osQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFBQSxLQUFLLEVBQUk7VUFDWkMsT0FBTyxDQUFDRCxLQUFLLENBQUMsU0FBUyxFQUFFQSxLQUFLLENBQUM7VUFDL0JzQyxLQUFLLENBQUMsK0RBQStELENBQUM7UUFDMUUsQ0FBQyxDQUFDO01BQ1Y7SUFDSixDQUFDLENBQUM7RUFDTjtBQUNKLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb21tZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBjb21tZW50Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LWZvcm0nKTtcclxuICAgIGNvbnN0IGNvbW1lbnRzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLWNvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgYXJ0aWNsZUlkID0gY29tbWVudHNDb250YWluZXIgPyBjb21tZW50c0NvbnRhaW5lci5kYXRhc2V0LmFydGljbGVJZCA6IG51bGw7XHJcblxyXG4gICAgaWYgKGNvbW1lbnRGb3JtKSB7XHJcbiAgICAgICAgY29tbWVudEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShjb21tZW50Rm9ybSk7XHJcblxyXG4gICAgICAgICAgICBmZXRjaChgL2FydGljbGUvJHthcnRpY2xlSWR9L2NvbW1lbnRgLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyZXVyOicsIGRhdGEuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvcm1hdGFnZSBkZSBsYSBkYXRlIGNvbW1lIGRhbnMgVHdpZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGAke2RhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX0vJHsoZGF0ZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfS8ke2RhdGUuZ2V0RnVsbFllYXIoKX0gw6AgJHtkYXRlLmdldEhvdXJzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfToke2RhdGUuZ2V0TWludXRlcygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29uc3RydWN0aW9uIGR1IEhUTUwgZXhhY3RlbWVudCBjb21tZSBkYW5zIGxlIHRlbXBsYXRlIFR3aWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudEVsZW1lbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtmb3JtRGF0YS5nZXQoJ2NvbnRlbnQnKX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGw+UG9zdMOpIHBhciA8c3Ryb25nPiR7ZGF0YS51c2VybmFtZX08L3N0cm9uZz4sIGxlICR7Zm9ybWF0dGVkRGF0ZX08L3NtYWxsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtkYXRhLmNhbkRlbGV0ZSA/IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlLWNvbW1lbnRcIiBkYXRhLWNvbW1lbnQtaWQ9XCIke2RhdGEuY29tbWVudElkfVwiIGFyaWEtbGFiZWw9XCJTdXBwcmltZXIgbGUgY29tbWVudGFpcmVcIiBvbmNsaWNrPVwicmV0dXJuIGNvbmZpcm0oJ8OKdGVzLXZvdXMgc8O7ciBkZSB2b3Vsb2lyIHN1cHByaW1lciBjZSBjb21tZW50YWlyZSA/Jyk7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2hcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnPDqXJlciBsZSBub3V2ZWF1IGNvbW1lbnRhaXJlIGF1IGTDqWJ1dCBkdSBjb250ZW5ldXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbW1lbnRzQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzQ29udGFpbmVyLmluc2VydEJlZm9yZShjb21tZW50RWxlbWVudCwgY29tbWVudHNDb250YWluZXIuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50c0NvbnRhaW5lci5hcHBlbmRDaGlsZChjb21tZW50RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFLDqWluaXRpYWxpc2VyIGxlIGZvcm11bGFpcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudEZvcm0ucmVzZXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpIGMnw6l0YWl0IGxlIHByZW1pZXIgY29tbWVudGFpcmUsIHN1cHByaW1lciBsZSBtZXNzYWdlIFwiQXVjdW4gY29tbWVudGFpcmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBub0NvbW1lbnRzTWVzc2FnZSA9IGNvbW1lbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3A6b25seS1jaGlsZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9Db21tZW50c01lc3NhZ2UgJiYgbm9Db21tZW50c01lc3NhZ2UudGV4dENvbnRlbnQuaW5jbHVkZXMoJ0F1Y3VuIGNvbW1lbnRhaXJlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29tbWVudHNNZXNzYWdlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJldXIgbG9ycyBkZSBsXFwnYWpvdXQgZHUgY29tbWVudGFpcmU6JywgZXJyb3IpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29tbWVudHNDb250YWluZXIpIHtcclxuICAgICAgICBjb21tZW50c0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmRlbGV0ZS1jb21tZW50Jyk7XHJcbiAgICAgICAgICAgIGlmIChkZWxldGVCdXR0b24pIHtcclxuICAgICAgICAgICAgICAgIC8vIExhIGNvbmZpcm1hdGlvbiBlc3QgZMOpasOgIGfDqXLDqWUgcGFyIGwnYXR0cmlidXQgb25jbGljayBkYW5zIGxlIEhUTUxcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRJZCA9IGRlbGV0ZUJ1dHRvbi5kYXRhc2V0LmNvbW1lbnRJZDtcclxuXHJcbiAgICAgICAgICAgICAgICBmZXRjaChgL2FydGljbGUvJHthcnRpY2xlSWR9L2NvbW1lbnQvJHtjb21tZW50SWR9L2RlbGV0ZWAsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJldXIgbG9ycyBkZSBsYSBzdXBwcmVzc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tbWVudEVsZW1lbnQgPSBkZWxldGVCdXR0b24uY2xvc2VzdCgnLmNvbW1lbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRFbGVtZW50LnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpIGMnw6l0YWl0IGxlIGRlcm5pZXIgY29tbWVudGFpcmUsIGFmZmljaGVyIGxlIG1lc3NhZ2UgXCJBdWN1biBjb21tZW50YWlyZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tbWVudHNDb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9Db21tZW50c01lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db21tZW50c01lc3NhZ2UudGV4dENvbnRlbnQgPSAnQXVjdW4gY29tbWVudGFpcmUgblxcJ2EgZW5jb3JlIMOpdMOpIHB1Ymxpw6kuJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50c0NvbnRhaW5lci5hcHBlbmRDaGlsZChub0NvbW1lbnRzTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvciB8fCAnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyZXVyOicsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1VuZSBlcnJldXIgZXN0IHN1cnZlbnVlIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24gZHUgY29tbWVudGFpcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTsiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29tbWVudEZvcm0iLCJnZXRFbGVtZW50QnlJZCIsImNvbW1lbnRzQ29udGFpbmVyIiwiYXJ0aWNsZUlkIiwiZGF0YXNldCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiZmV0Y2giLCJjb25jYXQiLCJtZXRob2QiLCJib2R5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJlcnJvciIsImNvbnNvbGUiLCJjb21tZW50RWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkYXRlIiwiRGF0ZSIsImZvcm1hdHRlZERhdGUiLCJnZXREYXRlIiwidG9TdHJpbmciLCJwYWRTdGFydCIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJpbm5lckhUTUwiLCJnZXQiLCJ1c2VybmFtZSIsImNhbkRlbGV0ZSIsImNvbW1lbnRJZCIsImZpcnN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsInJlc2V0Iiwibm9Db21tZW50c01lc3NhZ2UiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJpbmNsdWRlcyIsInJlbW92ZSIsImRlbGV0ZUJ1dHRvbiIsInRhcmdldCIsImNsb3Nlc3QiLCJvayIsIkVycm9yIiwic3VjY2VzcyIsImNoaWxkcmVuIiwibGVuZ3RoIiwiYWxlcnQiXSwic291cmNlUm9vdCI6IiJ9
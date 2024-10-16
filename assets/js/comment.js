document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche le rechargement de la page

        const formData = new FormData(commentForm);
        const articleId = commentForm.getAttribute('data-article-id');

        fetch(`/article/${articleId}/comment`, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    // Affiche l'erreur dans l'interface utilisateur
                    console.error(data.error);
                } else {
                    // Crée un nouvel élément pour le commentaire
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = `<p>${formData.get('content')}</p><small>${new Date().toLocaleString()}</small>`;
                    commentsContainer.appendChild(commentElement);

                    // Réinitialise le formulaire
                    commentForm.reset();
                }
            })
            .catch(error => console.error('Erreur:', error));
    });

    document.addEventListener('DOMContentLoaded', function () {
        const commentsContainer = document.getElementById('comments-container');
        const commentForm = document.getElementById('comment-form');

        // Suppression des commentaires
        commentsContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('delete-comment')) {
                const commentId = event.target.dataset.commentId;

                if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
                    fetch(`/comment/${commentId}/delete`, {
                        method: 'DELETE',
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Erreur lors de la suppression du commentaire.');
                            }
                            return response.json();
                        })
                        .then(data => {
                            // Retire le commentaire du DOM
                            event.target.closest('.comment').remove();
                        })
                        .catch(error => {
                            alert(error.message);
                        });
                }
            }
        });
    });
});

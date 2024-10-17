document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM chargé');

    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    if (commentForm) {
        console.log('Formulaire de commentaire trouvé');

        commentForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('Formulaire soumis');

            const formData = new FormData(commentForm);
            const articleId = commentForm.getAttribute('data-article-id');
            console.log('ID de l\'article:', articleId);

            fetch(`/article/${articleId}/comment`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.error('Erreur:', data.error);
                    } else {
                        console.log('Commentaire ajouté');

                        // Crée un nouvel élément pour le commentaire
                        const commentElement = document.createElement('div');
                        commentElement.classList.add('comment');
                        commentElement.innerHTML = `
            <p>${formData.get('content')}</p>
            <small>Posté par : ${data.username} le ${new Date().toLocaleString()}</small>
            <button class="delete-comment" data-comment-id="${data.commentId}">Supprimer</button>
        `;
                        commentsContainer.appendChild(commentElement);

                        // Réinitialise le formulaire
                        commentForm.reset();
                    }
                })

                .catch(error => console.error('Erreur lors de l\'ajout du commentaire:', error));
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
                const commentId = event.target.dataset.commentId;
                const articleId = commentForm.getAttribute('data-article-id');
                console.log('Comment ID:', commentId);
                console.log('Article ID:', articleId);

                if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
                    fetch(`/article/${articleId}/comment/${commentId}/delete`, {
                        method: 'DELETE'
                    })
                        .then(response => {
                            console.log('Réponse reçue:', response);
                            if (!response.ok) {
                                throw new Error('Erreur lors de la suppression');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Données reçues:', data);
                            if (data.success) {
                                event.target.closest('.comment').remove();
                            } else {
                                throw new Error(data.error || 'Erreur lors de la suppression');
                            }
                        })
                        .catch(error => {
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

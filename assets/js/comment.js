document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');
    const articleId = commentsContainer ? commentsContainer.dataset.articleId : null;

    if (commentForm) {
        commentForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(commentForm);

            fetch(`/article/${articleId}/comment`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.error('Erreur:', data.error);
                    } else {
                        const commentElement = document.createElement('div');
                        commentElement.classList.add('comment');

                        // Formatage de la date comme dans Twig
                        const date = new Date();
                        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} à ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

                        // Construction du HTML exactement comme dans le template Twig
                        commentElement.innerHTML = `
                            <p>${formData.get('content')}</p>
                            <small>Posté par <strong>${data.username}</strong>, le ${formattedDate}</small>
                            ${data.canDelete ? `
                                <button class="delete-comment" data-comment-id="${data.commentId}" aria-label="Supprimer le commentaire" onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?');">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            ` : ''}
                        `;

                        // Insérer le nouveau commentaire au début du conteneur
                        if (commentsContainer.firstChild) {
                            commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);
                        } else {
                            commentsContainer.appendChild(commentElement);
                        }

                        // Réinitialiser le formulaire
                        commentForm.reset();

                        // Si c'était le premier commentaire, supprimer le message "Aucun commentaire"
                        const noCommentsMessage = commentsContainer.querySelector('p:only-child');
                        if (noCommentsMessage && noCommentsMessage.textContent.includes('Aucun commentaire')) {
                            noCommentsMessage.remove();
                        }
                    }
                })
                .catch(error => console.error('Erreur lors de l\'ajout du commentaire:', error));
        });
    }

    if (commentsContainer) {
        commentsContainer.addEventListener('click', function (event) {
            const deleteButton = event.target.closest('.delete-comment');
            if (deleteButton) {
                // La confirmation est déjà gérée par l'attribut onclick dans le HTML
                const commentId = deleteButton.dataset.commentId;

                fetch(`/article/${articleId}/comment/${commentId}/delete`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erreur lors de la suppression');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.success) {
                            const commentElement = deleteButton.closest('.comment');
                            commentElement.remove();

                            // Si c'était le dernier commentaire, afficher le message "Aucun commentaire"
                            if (commentsContainer.children.length === 0) {
                                const noCommentsMessage = document.createElement('p');
                                noCommentsMessage.textContent = 'Aucun commentaire n\'a encore été publié.';
                                commentsContainer.appendChild(noCommentsMessage);
                            }
                        } else {
                            throw new Error(data.error || 'Erreur lors de la suppression');
                        }
                    })
                    .catch(error => {
                        console.error('Erreur:', error);
                        alert('Une erreur est survenue lors de la suppression du commentaire');
                    });
            }
        });
    }
});
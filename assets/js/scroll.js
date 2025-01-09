// assets/js/scrollToTop.js

document.addEventListener('DOMContentLoaded', function() {
    // Créer un bouton "scroll to top"
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.textContent = '↑'; // ou tu peux mettre une icône
    scrollToTopButton.classList.add('scroll-to-top'); // tu peux styliser ce bouton dans ton CSS
    document.body.appendChild(scrollToTopButton);

    // Fonction pour faire défiler la page en haut
    scrollToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /// scroll.js
    window.addEventListener('scroll', function () {
        var scrollToTopButton = document.getElementById('scrollToTop');

        // Afficher le bouton si la page est défilée de plus de 100px
        if (window.scrollY > 100) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

// Ajouter une fonctionnalité pour revenir en haut
    document.getElementById('scrollToTop').addEventListener('click', function () {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});

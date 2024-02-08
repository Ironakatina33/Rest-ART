// Sélectionne toutes les images avec la classe "outils"
const outilsImages = document.querySelectorAll('.outils');

// Ajoute un écouteur d'événement à chaque image
outilsImages.forEach(img => {
    img.addEventListener('click', () => {
        // Supprime la classe "selected" de toutes les images
        outilsImages.forEach(img => img.classList.remove('selected'));
        // Ajoute la classe "selected" à l'image cliquée
        img.classList.add('selected');
    });
});

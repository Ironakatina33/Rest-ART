function limitInputLength() {
    var codeInput = document.getElementById('codeInput');
    if (codeInput.value.length > 4) {
        codeInput.value = codeInput.value.slice(0, 4); // Limiter la saisie à 4 caractères
    }
}

function checkCode() {
    var enteredCode = document.getElementById('codeInput').value;

    // Ajoutez votre logique pour vérifier le code ici
    if (enteredCode === '1234') {
        // Redirigez l'utilisateur vers la page suivante
        window.location.href = '../page/Epreuve1Page3.html';
    } else {
        alert('Code incorrect. Veuillez réessayer.');
    }
}

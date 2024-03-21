function limitInputLength() {
    var codeInput = document.getElementById('codeInput');
    if (codeInput.value.length > 4) {
        codeInput.value = codeInput.value.slice(0, 4); // Limiter la saisie à 4 caractères
    }
}

function checkCode() {
    var enteredCode = document.getElementById('codeInput').value;

    // Ajoutez votre logique pour vérifier le code ici
    if (enteredCode === '1706') {
        // Redirigez l'utilisateur vers la page suivante
        window.location.href = '../page/Epreuve1Page3.html';
    } else {
        alert('Code incorrect. Veuillez réessayer.');
    }
}

function limitInputLength2() {
    var codeInput = document.getElementById('codeInput');
    if (codeInput.value.length > 4) {
        codeInput.value = codeInput.value.slice(0, 4); // Limiter la saisie à 4 caractères
    }
}

function checkCode2() {
    var enteredCode = document.getElementById('codeInput').value;

    // Ajoutez votre logique pour vérifier le code ici
    if (enteredCode === '8118') {
        // Redirigez l'utilisateur vers la page suivante
        window.location.href = '../page/Epreuve2Page3.html';
    } else {
        alert('Code incorrect. Veuillez réessayer.');
    }
}

function limitInputLength3() {
    var codeInput = document.getElementById('codeInput');
    if (codeInput.value.length > 4) {
        codeInput.value = codeInput.value.slice(0, 4); // Limiter la saisie à 4 caractères
    }
}

function checkCode3() {
    var enteredCode = document.getElementById('codeInput').value;

    // Ajoutez votre logique pour vérifier le code ici
    if (enteredCode === '1497') {
        // Redirigez l'utilisateur vers la page suivante
        window.location.href = '../page/Epreuve3Page3.html';
    } else {
        alert('Code incorrect. Veuillez réessayer.');
    }
}

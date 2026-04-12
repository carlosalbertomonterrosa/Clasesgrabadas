function toggleMonth(header) {
    const group = header.parentElement;
    group.classList.toggle('active');
}

const welcomeScreen = document.getElementById('welcome-screen');
const clasesScreen = document.getElementById('clases-screen');
const fundamentosScreen = document.getElementById('fundamentos-screen');
const linksScreen = document.getElementById('links-screen');

function showScreen(screen) {
    welcomeScreen.classList.add('hidden');
    clasesScreen.classList.add('hidden');
    fundamentosScreen.classList.add('hidden');
    linksScreen.classList.add('hidden');
    screen.classList.remove('hidden');
}

function showWelcome() {
    welcomeScreen.classList.remove('hidden');
    clasesScreen.classList.add('hidden');
    fundamentosScreen.classList.add('hidden');
    linksScreen.classList.add('hidden');
}

document.getElementById('btn-grabadas').addEventListener('click', () => {
    showScreen(clasesScreen);
});

document.getElementById('btn-fundamentos').addEventListener('click', () => {
    showScreen(fundamentosScreen);
});

document.getElementById('btn-intereses').addEventListener('click', () => {
    showScreen(linksScreen);
});

document.getElementById('back-home-clases').addEventListener('click', showWelcome);
document.getElementById('back-home-fundamentos').addEventListener('click', showWelcome);
document.getElementById('back-home-links').addEventListener('click', showWelcome);
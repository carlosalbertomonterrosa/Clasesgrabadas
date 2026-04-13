// Funcion para el acordeon de meses
function toggleMonth(header) {
    const group = header.parentElement;
    group.classList.toggle('active');
}

// Funcion para el acordeon de modulos
function toggleModulo(header) {
    const moduloCard = header.parentElement;
    moduloCard.classList.toggle('active');
}

// Referencias a las pantallas
const welcomeScreen = document.getElementById('welcome-screen');
const clasesScreen = document.getElementById('clases-screen');
const fundamentosScreen = document.getElementById('fundamentos-screen');
const linksScreen = document.getElementById('links-screen');
const floatingBackBtn = document.getElementById('floating-back-btn');

// Funcion para mostrar una pantalla especifica
function showScreen(screen) {
    welcomeScreen.classList.add('hidden');
    clasesScreen.classList.add('hidden');
    fundamentosScreen.classList.add('hidden');
    linksScreen.classList.add('hidden');
    screen.classList.remove('hidden');
    
    if (screen === clasesScreen || screen === fundamentosScreen || screen === linksScreen) {
        floatingBackBtn.classList.remove('hidden');
    } else {
        floatingBackBtn.classList.add('hidden');
    }
    
    if (screen === clasesScreen) {
        setTimeout(() => {
            inicializarCheckboxes();
            actualizarProgreso();
        }, 50);
    }
}

// Funcion para mostrar la pantalla de bienvenida
function showWelcome() {
    welcomeScreen.classList.remove('hidden');
    clasesScreen.classList.add('hidden');
    fundamentosScreen.classList.add('hidden');
    linksScreen.classList.add('hidden');
    floatingBackBtn.classList.add('hidden');
}

// Guardar progreso en localStorage
function guardarProgreso(idClase, completado) {
    let progreso = JSON.parse(localStorage.getItem('progresoClases') || '{}');
    progreso[idClase] = completado;
    localStorage.setItem('progresoClases', JSON.stringify(progreso));
    actualizarProgreso();
}

// Cargar progreso guardado
function cargarProgreso() {
    return JSON.parse(localStorage.getItem('progresoClases') || '{}');
}

// Actualizar barra de progreso
function actualizarProgreso() {
    const checkboxes = document.querySelectorAll('.clase-checkbox');
    const total = checkboxes.length;
    if (total === 0) return;
    
    const completadas = Array.from(checkboxes).filter(cb => cb.checked).length;
    const porcentaje = Math.round((completadas / total) * 100);
    
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    
    if (progressText) {
        progressText.innerHTML = `Tu progreso: ${completadas} de ${total} clases completadas (${porcentaje}%)`;
    }
    if (progressFill) {
        progressFill.style.width = `${porcentaje}%`;
    }
}

// Inicializar checkboxes
function inicializarCheckboxes() {
    const checkboxes = document.querySelectorAll('.clase-checkbox');
    const progresoGuardado = cargarProgreso();
    
    checkboxes.forEach(checkbox => {
        const claseId = checkbox.getAttribute('data-clase-id');
        if (claseId && progresoGuardado[claseId]) {
            checkbox.checked = progresoGuardado[claseId];
        }
        
        checkbox.addEventListener('change', (e) => {
            const id = e.target.getAttribute('data-clase-id');
            if (id) {
                guardarProgreso(id, e.target.checked);
            }
        });
    });
    
    actualizarProgreso();
}

// Buscador de clases
function iniciarBuscador() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase().trim();
        const courseCards = document.querySelectorAll('.course-card');
        const monthGroups = document.querySelectorAll('.month-group');
        
        courseCards.forEach(card => {
            const titulo = card.querySelector('.info h3')?.innerText.toLowerCase() || '';
            const descripcion = card.querySelector('.info p')?.innerText.toLowerCase() || '';
            const fecha = card.querySelector('.date')?.innerText.toLowerCase() || '';
            
            const coincide = termino === '' || titulo.includes(termino) || descripcion.includes(termino) || fecha.includes(termino);
            
            if (coincide) {
                card.classList.remove('hidden-card');
            } else {
                card.classList.add('hidden-card');
            }
        });
        
        monthGroups.forEach(group => {
            const cardsEnMes = group.querySelectorAll('.course-card');
            const algunaVisible = Array.from(cardsEnMes).some(card => !card.classList.contains('hidden-card'));
            
            if (termino === '') {
                group.classList.remove('hidden-month');
            } else {
                if (algunaVisible) {
                    group.classList.remove('hidden-month');
                    group.classList.add('active');
                } else {
                    group.classList.add('hidden-month');
                }
            }
        });
    });
}

// Event listeners
document.getElementById('btn-grabadas').addEventListener('click', () => {
    showScreen(clasesScreen);
});

document.getElementById('btn-fundamentos').addEventListener('click', () => {
    showScreen(fundamentosScreen);
});

document.getElementById('btn-intereses').addEventListener('click', () => {
    showScreen(linksScreen);
});

floatingBackBtn.addEventListener('click', showWelcome);

// Inicializar cuando carga la pagina
document.addEventListener('DOMContentLoaded', () => {
    iniciarBuscador();
    inicializarCheckboxes();
});
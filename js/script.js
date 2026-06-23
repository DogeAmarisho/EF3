// ==========================================
// 1. SELECCIÓN DE ELEMENTOS DEL DOM
// ==========================================
const gameForm = document.getElementById('game-form');
const gameList = document.getElementById('game-list');
const platformSelect = document.getElementById('game-platform');
const emptyMsg = document.querySelector('.empty-msg');

// ==========================================
// 2. MANEJO DE EVENTOS (Mínimo 3 distintos)
// ==========================================

// EVENTO 1: 'change' - Modifica el DOM visualmente según la opción seleccionada
platformSelect.addEventListener('change', (event) => {
    const platform = event.target.value;
    
    // Manipulación de estilos en línea mediante el DOM para dar feedback visual
    if (platform === 'Nintendo') {
        gameForm.style.borderLeft = '5px solid #E60012';
    } else if (platform === 'PlayStation') {
        gameForm.style.borderLeft = '5px solid #003791';
    } else if (platform === 'Xbox') {
        gameForm.style.borderLeft = '5px solid #107C10';
    } else if (platform === 'PC') {
        gameForm.style.borderLeft = '5px solid #333333';
    } else {
        gameForm.style.borderLeft = 'none';
    }
});

// ==========================================
// FUNCIONES DE VALIDACIÓN Y FEEDBACK VISUAL
// ==========================================

// Función auxiliar para aplicar feedback visual y mostrar mensajes
function setFieldStatus(inputElement, errorElement, isValid, errorMessage = '') {
    if (isValid) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid'); // Borde verde 
        errorElement.textContent = ''; 
    } else {
        inputElement.classList.remove('is-valid');
        inputElement.classList.add('is-invalid'); // Borde rojo 
        errorElement.textContent = errorMessage; // Mensaje debajo del campo 
    }
}

// ==========================================
// EVENTO PRINCIPAL: SUBMIT Y VALIDACIONES
// ==========================================

gameForm.addEventListener('submit', (event) => {
    // 1. Control del Envío Obligatorio: Detiene el refresco de la página 
    event.preventDefault(); 

    // Capturamos los elementos del DOM y sus valores
    const nameInput = document.getElementById('game-name');
    const platformInput = document.getElementById('game-platform');
    const hoursInput = document.getElementById('game-hours');
    const dateInput = document.getElementById('game-date');

    const errorName = document.getElementById('error-name');
    const errorPlatform = document.getElementById('error-platform');
    const errorHours = document.getElementById('error-hours');
    const errorDate = document.getElementById('error-date');

    const nameValue = nameInput.value.trim();
    const platformValue = platformInput.value;
    const hoursValue = hoursInput.value;
    const dateValue = dateInput.value;

    let isFormValid = true;

    // --- REGLA 2 Y 3: Longitud y Regex (Nombre del Juego) --- [cite: 63, 64]
    const nameRegex = /^[a-zA-Z0-9\s:\-]+$/;
    if (nameValue.length < 2 || nameValue.length > 50) {
        setFieldStatus(nameInput, errorName, false, 'El nombre debe tener entre 2 y 50 caracteres.');
        isFormValid = false;
    } else if (!nameRegex.test(nameValue)) {
        setFieldStatus(nameInput, errorName, false, 'Solo se permiten letras, números, espacios, guiones y dos puntos.');
        isFormValid = false;
    } else {
        setFieldStatus(nameInput, errorName, true);
    }

    // --- REGLA 1: Campo Requerido (Plataforma) --- 
    if (platformValue === '') {
        setFieldStatus(platformInput, errorPlatform, false, 'Debes seleccionar una plataforma.');
        isFormValid = false;
    } else {
        setFieldStatus(platformInput, errorPlatform, true);
    }

    // --- REGLA 4: Regla Propia (Fecha no en el futuro) --- 
    let isDateValid = true;
    if (dateValue !== '') {
        const selectedDate = new Date(dateValue);
        const today = new Date();
        // Reseteamos las horas de hoy para comparar solo la fecha
        today.setHours(0, 0, 0, 0); 

        if (selectedDate > today) {
            setFieldStatus(dateInput, errorDate, false, 'La fecha no puede estar en el futuro.');
            isFormValid = false;
            isDateValid = false;
        } else {
            setFieldStatus(dateInput, errorDate, true);
        }
    } else {
        // Limpiamos estilos si está vacío y no rompe otra regla
        dateInput.classList.remove('is-invalid', 'is-valid');
        errorDate.textContent = '';
    }

    // --- REGLA 5: Coincidencia Cruzada (Horas vs Fecha) --- 
    if (hoursValue > 0 && dateValue === '') {
        setFieldStatus(hoursInput, errorHours, false, 'Para registrar horas, debes indicar la fecha de adquisición.');
        // También marcamos la fecha como inválida para reforzar la experiencia de usuario
        setFieldStatus(dateInput, errorDate, false, 'Requerido si has jugado > 0 horas.');
        isFormValid = false;
    } else if (hoursValue < 0) {
        setFieldStatus(hoursInput, errorHours, false, 'Las horas no pueden ser negativas.');
        isFormValid = false;
    } else {
        setFieldStatus(hoursInput, errorHours, true);
        // Si la fecha era válida por sí sola, le restauramos su estado positivo
        if (isDateValid && dateValue !== '') {
             setFieldStatus(dateInput, errorDate, true);
        }
    }

    // ==========================================
    // SI EL FORMULARIO NO ES VÁLIDO, CORTAMOS LA EJECUCIÓN AQUÍ 
    // ==========================================
    if (!isFormValid) {
        return; // No procesamos ni guardamos nada
    }

    // ==========================================
    // SI TODO ES VÁLIDO: PROCEDEMOS CON LA CREACIÓN EN EL DOM (Bloque 2)
    // ==========================================
    
    if (emptyMsg) emptyMsg.style.display = 'none';
renderGameCard(nameValue, platformValue, hoursValue);
gameForm.reset();
gameForm.style.borderLeft = 'none';
// ... (resto de la limpieza de clases)

    // Reseteamos el formulario y los estados visuales
    gameForm.reset();
    gameForm.style.borderLeft = 'none';
    
    // Limpiamos las clases de validación de todos los inputs
    const allInputs = gameForm.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
});

// ==========================================
// FUNCIÓN REUTILIZABLE: RENDERIZAR TARJETA 
// ==========================================
// Usaremos esta función tanto para los datos del JSON como para los del formulario
function renderGameCard(name, platform, hours) {
    const card = document.createElement('div');
    card.classList.add('game-card');

    const title = document.createElement('h3');
    title.textContent = name; 

    const detailsInfo = document.createElement('p');
    const displayHours = (hours === '' || hours === null) ? '0' : hours; 
    detailsInfo.innerHTML = `<strong>${platform}</strong> | ${displayHours} hrs jugadas`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
        card.remove(); 
        if (gameList.querySelectorAll('.game-card').length === 0 && emptyMsg) {
            emptyMsg.style.display = 'block';
        }
    });

    card.appendChild(title);
    card.appendChild(detailsInfo);
    card.appendChild(deleteBtn);
    gameList.appendChild(card);
}

// ==========================================
// FETCH ASÍNCRONO A JSON LOCAL (BLOQUE 4)
// ==========================================
async function loadInitialData() {
    // 1. Estado de carga visual (Buena práctica de usabilidad)
    const loadingMsg = document.createElement('p');
    loadingMsg.textContent = 'Cargando tu catálogo de juegos...';
    loadingMsg.classList.add('empty-msg'); 
    gameList.appendChild(loadingMsg);

    if (emptyMsg) emptyMsg.style.display = 'none';

    try {
        // 2. Ejecutamos el fetch a nuestro archivo local estructurado
        const response = await fetch('./data/datos.json');
        
        // 3. Verificamos que la respuesta HTTP sea correcta (Estado 200-299)
        if (!response.ok) {
            throw new Error(`Error de red o archivo no encontrado: ${response.status}`);
        }

        // 4. Parseamos la respuesta a JSON
        const gamesData = await response.json();
        
        loadingMsg.remove(); // Quitamos el mensaje de carga

        // 5. Renderizamos los datos obtenidos directamente en el DOM
        if (gamesData.length > 0) {
            gamesData.forEach(game => {
                renderGameCard(game.name, game.platform, game.hours);
            });
        } else {
            if (emptyMsg) emptyMsg.style.display = 'block';
        }

    } catch (error) {
        // 6. Control riguroso de excepciones sin romper la usabilidad
        loadingMsg.remove();
        console.error('Fallo al cargar los datos iniciales:', error);
        
        // Mostramos un mensaje amigable al usuario en la interfaz
        const errorDOM = document.createElement('p');
        errorDOM.textContent = 'No se pudo cargar el catálogo inicial. Pero no te preocupes, puedes agregar juegos manualmente.';
        errorDOM.style.color = 'var(--error-color)';
        errorDOM.classList.add('empty-msg');
        gameList.appendChild(errorDOM);
    }
}

// Ejecutamos la carga inicial en cuanto el documento esté listo
document.addEventListener('DOMContentLoaded', loadInitialData);
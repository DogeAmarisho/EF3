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

// EVENTO 2: 'submit' - Intercepta el envío del formulario para crear el elemento
gameForm.addEventListener('submit', (event) => {
    // Nota: preventDefault es estrictamente del Bloque 3, pero es indispensable 
    // invocarlo aquí para que el formulario no recargue la página y podamos ver el DOM.
    event.preventDefault(); 

    // Capturamos los valores ingresados
    const nameValue = document.getElementById('game-name').value;
    const platformValue = platformSelect.value;
    const hoursValue = document.getElementById('game-hours').value;

    // (Aquí irá la lógica de validación del Bloque 3. Por ahora, si no hay nombre, salimos)
    if (nameValue.trim() === '') return;

    // Ocultamos el mensaje de "Catálogo vacío" si existe modificando su estilo
    if (emptyMsg) {
        emptyMsg.style.display = 'none';
    }

    // ==========================================
    // 3. GENERACIÓN DINÁMICA DE ELEMENTOS
    // ==========================================
    
    // Creamos el contenedor principal de la tarjeta
    const card = document.createElement('div');
    card.classList.add('game-card'); // Manipulación de clases CSS

    // Creamos y configuramos el título
    const title = document.createElement('h3');
    title.textContent = nameValue; 

    // Creamos la información de plataforma y horas
    const platformInfo = document.createElement('p');
    platformInfo.textContent = `Plataforma: ${platformValue}`;

    const hoursInfo = document.createElement('p');
    hoursInfo.textContent = `Horas jugadas: ${hoursValue} hrs`;

    // Creamos el botón de eliminación
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('delete-btn');

    // EVENTO 3: 'click' - Evento anidado para destruir el elemento recién creado
    deleteBtn.addEventListener('click', () => {
        // Destrucción del nodo en el DOM
        card.remove(); 
        
        // Verificamos si quedaron tarjetas en la cuadrícula
        const remainingCards = gameList.querySelectorAll('.game-card');
        if (remainingCards.length === 0 && emptyMsg) {
            emptyMsg.style.display = 'block'; // Volvemos a mostrar el mensaje si está vacío
        }
    });

    // Ensamblamos la tarjeta insertando los hijos (appendChild)
    card.appendChild(title);
    card.appendChild(platformInfo);
    card.appendChild(hoursInfo);
    card.appendChild(deleteBtn);

    // Insertamos la tarjeta completa en el flujo del documento
    gameList.appendChild(card);

    // Limpiamos el formulario y reseteamos el borde visual
    gameForm.reset();
    gameForm.style.borderLeft = 'none';
});
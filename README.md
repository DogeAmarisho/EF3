## Objetivo del Proyecto
El presente proyecto consiste en una Mini-Aplicación Web Interactiva orientada a la gestión de un catálogo personal de videojuegos. Permite al usuario registrar sus títulos adquiridos detallando su nombre, plataforma de juego, cantidad de horas invertidas y fecha de adquisición, brindando un entorno libre de fallas, responsivo y validado.

## Checklist de Requerimientos Técnicos Cumplidos

- [x] **Proyecto desde cero:** Estructura de carpetas manual sin reutilización de archivos anteriores.
- [x] **Separación estricta:** Archivos `.html`, `.css` y `.js` modulares. Sin estilos inline.
- [x] **Manipulación del DOM y Eventos:** Uso de `querySelector`, `createElement`, `appendChild` y `remove`. Implementación de eventos `change`, `submit` y `click`.
- [x] **Formulario Integral:** 4 campos independientes (texto, selección, numérico y fecha).
- [x] **Validaciones Estrictas:** - [x] Campo requerido (Plataforma).
  - [x] Regex (Nombre del juego admite letras, números y ciertos caracteres).
  - [x] Longitud (Nombre entre 2 y 50 caracteres).
  - [x] Coincidencia cruzada (Horas jugadas requiere ingresar fecha).
  - [x] Regla propia (Fecha de adquisición no puede estar en el futuro).
- [x] **Control de Envío:** Uso de `event.preventDefault()` y feedback visual dinámico.
- [x] **Persistencia de Datos:** Uso de `Fetch` a un archivo JSON local con control estructurado mediante `try/catch`.
- [x] **Usabilidad:** Código limpio, sin errores en consola y diseño adaptable (Desktop y Móvil).

---

## Instrucciones Operativas de Despliegue

Debido al uso de la API `Fetch` para el consumo de un archivo JSON local, la aplicación debe ejecutarse a través de un servidor HTTP para evitar restricciones de seguridad (CORS) propias de los navegadores modernos. 

**Pasos para ejecutar la aplicación:**
1. Clonar este repositorio o descargar el código fuente.
2. Abrir la carpeta raíz del proyecto en un editor de código como Visual Studio Code.
3. Iniciar un servidor local. Se recomienda la extensión **Live Server**:
   - Haz clic derecho sobre el archivo `index.html`.
   - Selecciona la opción "Open with Live Server".
4. La aplicación se abrirá automáticamente en el navegador predeterminado (ej: `http://127.0.0.1:5500/index.html`).

---

## Evidencias Visuales de Funcionamiento

**1. Estado Inicial y Carga de Datos (Fetch)**
![Carga inicial y persistencia de datos](assets/Persistencia.png)

**2. Validaciones de Formulario y Feedback Visual**
![Validación de formulario y errores](assets/Error.png)

**3. Renderizado Dinámico de Elementos y Estados**
![Estados de la aplicación y tarjetas](assets/Estados.png)
---

## Autoevaluación de Criterios Institucionales

| Criterio de Rúbrica | Estado de Cumplimiento | Evidencia Técnica en el Proyecto |
| :--- | :--- | :--- |
| **Integración con maqueta** | Cumplido | HTML, CSS y JS separados en sus carpetas respectivas. Diseño responsive propio. |
| **DOM y eventos** | Cumplido | Eventos integrados (change, submit, click). Construcción dinámica de tarjetas en pantalla. |
| **Formulario y validaciones** | Cumplido | Prevención por defecto activa. 5 reglas implementadas con mensajes descriptivos bajo cada *input*. |
| **Datos y persistencia** | Cumplido | Carga de datos asíncrona mediante un bloque asíncrono con control de excepciones `try/catch`. |
| **Usabilidad y depuración** | Cumplido | Ejecución limpia sin errores críticos de consola (validado en Chrome y Edge). |
| **Documentación y Git** | Cumplido | Historial de *commits* secuenciales. Presente en este documento `README.md`. |
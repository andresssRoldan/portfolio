// 1. Esperamos a que todo el HTML de la página esté cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // 2. Buscamos el formulario en el HTML
    const formulario = document.querySelector("form");

    // 3. Verificamos que el formulario realmente exista antes de continuar
    if (formulario) {
        
        // 4. Escuchamos el momento en que el usuario da clic en "Enviar"
        formulario.addEventListener("submit", (evento) => {
            
            // 5. Capturamos los valores reales usando .value y limpiamos espacios con .trim()
            const nombre = document.querySelector('input[type="text"]').value.trim();
            const correo = document.querySelector('input[type="email"]').value.trim();
            const mensaje = document.querySelector('textarea').value.trim();

            // 6. Validación: Si alguno de los tres campos está vacío...
            if (nombre === "" || correo === "" || mensaje === "") {
                evento.preventDefault(); // Detenemos el envío automático del formulario
                alert("⚠️ ¡Por favor, completa todos los campos antes de enviar tu mensaje!");
            } else {
                // Si todo está lleno, dejamos que Formspree haga su magia y avisamos al usuario
                alert("🚀 ¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.");
            }
        });
    }
});
// 1. Esperamos a que todo el HTML de la página esté cargado
document.addEventListener("DOMContentLoaded", () => {    
    // 2. Buscamos el formulario en el HTML
    const formulario = document.querySelector(".formulario-contacto");

    // 3. Verificamos que el formulario realmente exista antes de continuar
    if (formulario) {        
        // 4. Escuchamos el momento en que el usuario da clic en "Enviar"
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            // 5. Capturamos los valores reales usando .value y limpiamos espacios con .trim()
            const nombre = document.querySelector("#nombre").value.trim();
            const correo = document.querySelector("#email").value.trim();
            const mensaje = document.querySelector("#mensaje").value.trim();

            // 6. Validación: Si alguno de los tres campos está vacío...
            if (nombre === "" || correo === "" || mensaje === "") {                
                alert(" ¡Por favor, completa todos los campos antes de enviar tu mensaje!");
            } else {
                // 7. Si todos los campos están llenos, mostramos un mensaje de éxito
                alert(" ¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.");
                formulario.reset(); // Limpiamos el formulario después de enviar
            }
        });
    }
});
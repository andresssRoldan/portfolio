// 1. Esperamos a que todo el HTML de la página esté cargado
document.addEventListener("DOMContentLoaded", () => {    
    // 2. Buscamos el formulario en el HTML
    const formulario = document.querySelector(".formulario-contacto");

    // 3. Verificamos que el formulario realmente exista antes de continuar
    if (formulario) {        
        // 4. Escuchamos el evento submit con una función asíncrona (async)
        formulario.addEventListener("submit", async (evento) => {
            // Detenemos el envío nativo del navegador para que no recargue la página
            evento.preventDefault();

            // 5. Capturamos los valores de los inputs
            const nombre = document.querySelector("#nombre").value.trim();
            const correo = document.querySelector("#email").value.trim();
            const mensaje = document.querySelector("#mensaje").value.trim();

            // 6. Validación básica en el navegador
            if (nombre === "" || correo === "" || mensaje === "") {
                alert("⚠️ ¡Por favor, completa todos los campos antes de enviar tu mensaje!");
                return;
            }

            // 7. Agrupamos los datos a enviar
            const datosContacto = {
                nombre: nombre,
                email: correo,
                mensaje: mensaje
            };

            // Obtenemos el botón
            const boton = formulario.querySelector(".btn-enviar");

            try {
                boton.disabled = true;

                // 8. Hacemos la petición POST a tu servidor Node.js
                const respuesta = await fetch("http://localhost:5000/api/contacto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datosContacto)
                });

                const resultado = await respuesta.json();

                if (respuesta.ok) {
                    alert(` ¡Gracias ${nombre}! ${resultado.mensaje}`);
                    formulario.reset();
                } else {
                    alert(` Hubo un problema: ${resultado.error}`);
                }

            } catch (error) {
                console.error("Error al conectar con el servidor:", error);
                alert(" No se pudo conectar con el servidor backend. Revisa que esté encendido en la terminal.");
            } finally {
                boton.disabled = false;
            }
        });
    }
});

/* Animaciones de entrada eliminadas: ya no se observa ni agrega la clase visible. */
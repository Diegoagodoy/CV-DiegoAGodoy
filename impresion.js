document.getElementById('download-pdf').addEventListener('click', function () {
    const $elementoParaConvertir = document.getElementById('content'); // El contenedor con el contenido que quieres convertir

    // Crear el mensaje de carga
    const loadingMessage = document.createElement('div');
    loadingMessage.innerText = 'Generando PDF...';
    loadingMessage.style.position = 'fixed';
    loadingMessage.style.top = '50%';
    loadingMessage.style.left = '50%';
    loadingMessage.style.transform = 'translate(-50%, -50%)';
    loadingMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    loadingMessage.style.color = 'white';
    loadingMessage.style.padding = '20px';
    loadingMessage.style.borderRadius = '5px';
    loadingMessage.style.zIndex = '9999';
    document.body.appendChild(loadingMessage);

    const timeoutDuration = 10000; // 10 segundos
    let timeout = setTimeout(function() {
        loadingMessage.innerText = "Se ha agotado el tiempo de espera. Intenta de nuevo.";
    }, timeoutDuration);

    // Pausar 1 segundo antes de mostrar el mensaje de carga
    setTimeout(function() {
        // Crear el PDF
        html2pdf()
            .set({
                margin: 10, // Ajusta el margen para evitar que el contenido se pegue a los bordes
                filename: 'curriculum.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 5, // Escala 1 para ajustarlo de manera natural al tamaño de la página
                    letterRendering: true
                },
                jsPDF: {
                    unit: 'mm',
                    format: [415.9, 655.6], // Tamaño Oficio (Legal) en mm (215.9 x 355.6)
                    orientation: 'portrait',
                    pagesplit: false // Desactivamos la paginación para que todo quede en una sola página
                }
            })
            .from($elementoParaConvertir) // Convertir el contenido del contenedor
            .save()
            .catch((err) => {
                console.log("Error al generar el PDF:", err); // Si ocurre un error
            })
            .finally(() => {
                document.body.removeChild(loadingMessage); // Eliminar el mensaje de carga
                clearTimeout(timeout); // Limpiar el timeout
            });

    }, 2000); // Pausa de 2 segundos antes de comenzar el proceso
});

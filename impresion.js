//Impresion PDF
document.getElementById('download-pdf').addEventListener('click', function () {
    const $elementoParaConvertir = document.getElementById('content'); 

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

    const timeoutDuration = 10000; 
    let timeout = setTimeout(function() {
        loadingMessage.innerText = "Se ha agotado el tiempo de espera. Intenta de nuevo.";
    }, timeoutDuration);

    setTimeout(function() {
       
        html2pdf()
            .set({
                margin: 10, 
                filename: 'curriculum.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 5, 
                    letterRendering: true
                },
                jsPDF: {
                    unit: 'mm',
                    format: [415.9, 655.6], 
                    orientation: 'portrait',
                    pagesplit: false 
                }
            })
            .from($elementoParaConvertir) 
            .save()
            .catch((err) => {
                console.log("Error al generar el PDF:", err); 
            })
            .finally(() => {
                document.body.removeChild(loadingMessage); 
                clearTimeout(timeout); 
            });

    }, 2000); 
});


//Copiar Enlaces
// Esperamos a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos todos los botones con la clase .copy-btn
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    // Añadimos el evento de clic a cada botón
    copyButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Obtenemos el texto del atributo data-clipboard-text del botón
        const textToCopy = button.getAttribute('data-clipboard-text');
        
        // Creamos un campo de texto temporal
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        
        // Seleccionamos el texto y lo copiamos al portapapeles
        tempInput.select();
        document.execCommand('copy');
        
        // Eliminamos el campo de texto temporal
        document.body.removeChild(tempInput);
        
        // Creamos el mensaje de carga
        const loadingMessage = document.createElement('div');
        loadingMessage.innerText = `${textToCopy} ...Se ha copiado al Portapapeles...`;
        loadingMessage.style.position = 'fixed';
        loadingMessage.style.top = '75%';
        loadingMessage.style.left = '60%';
        loadingMessage.style.transform = 'translate(-50%, -50%)';
        loadingMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        loadingMessage.style.color = 'white';
        loadingMessage.style.padding = '20px';
        loadingMessage.style.borderRadius = '5px';
        loadingMessage.style.zIndex = '9999';
        document.body.appendChild(loadingMessage);
        
        // Después de 2 segundos (2000 ms), eliminamos el mensaje
        setTimeout(function() {
          document.body.removeChild(loadingMessage);
        }, 2000);
      });
    });
  });
  
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

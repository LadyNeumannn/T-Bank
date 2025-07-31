document.addEventListener('DOMContentLoaded', () => {
  
    const rippleParents = document.querySelectorAll('.ripple-parent');

    rippleParents.forEach(parent => {
        parent.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - (size / 2);
            const y = e.clientY - rect.top - (size / 2);

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });

    
    const downloadEditedPdfButton = document.getElementById('downloadEditedPdfButton');
    if (downloadEditedPdfButton) {
        downloadEditedPdfButton.addEventListener('click', () => {
            const element = document.getElementById('resumeContent'); 

    
            const opt = {
                margin:       10,          
                filename:     'Resume.pdf', 
                image:        { type: 'jpeg', quality: 0.98 }, 
                html2canvas:  { scale: 2, logging: true, dpi: 192, letterRendering: true }, 
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' } 
            };

         
            html2pdf().set(opt).from(element).save();
        });
    }

    const editableElements = document.querySelectorAll('[contenteditable="true"]');


    editableElements.forEach(element => {
        const key = element.id || (element.className.split(' ').join('_') + '_' + Array.from(element.parentNode.children).indexOf(element));
        const savedValue = localStorage.getItem(key);
        if (savedValue !== null) {
            element.textContent = savedValue;
        }
        if (element.textContent.trim() === '') {
            element.textContent = '';
        }
    });

    editableElements.forEach(element => {
        element.addEventListener('input', () => {
            const key = element.id || (element.className.split(' ').join('_') + '_' + Array.from(element.parentNode.children).indexOf(element));
            localStorage.setItem(key, element.textContent);
        });
    });
});
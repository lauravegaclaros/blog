document.addEventListener('DOMContentLoaded', function() {
      // --- BOTÓN DE TEMA ---
      const btnTheme = document.getElementById('btnTheme');
      const html = document.documentElement;

      // Cargar tema guardado
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateButtonText(savedTheme);
      }

      // Cambiar tema al hacer clic
      btnTheme.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateButtonText(newTheme);
      });

      // Actualizar texto del botón
      function updateButtonText(theme) {
        btnTheme.textContent = theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
      }
      
      // --- BOTÓN DE DESCARGA ---
      const btnDownload = document.getElementById('btnDownload');
      const downloadModal = document.getElementById('downloadModal');
      const downloadPDF = document.getElementById('downloadPDF');
      const downloadPrint = document.getElementById('downloadPrint');
      const closeModal = document.getElementById('closeModal');
      
      // Abrir modal de descarga
      btnDownload.addEventListener('click', () => {
        downloadModal.classList.add('active');
      });
      
      // Cerrar modal
      closeModal.addEventListener('click', () => {
        downloadModal.classList.remove('active');
      });
      
      // Cerrar modal al hacer clic fuera
      downloadModal.addEventListener('click', (e) => {
        if (e.target === downloadModal) {
          downloadModal.classList.remove('active');
        }
      });
      
      // Descargar como PDF
      downloadPDF.addEventListener('click', () => {
        // Crear contenido para el PDF
        const content = document.createElement('div');
        content.innerHTML = `
          <h1 style="text-align: center; color: #2c3e50;">Laura Alejandra Vega Claros</h1>
          <h2 style="text-align: center; color: #3498db;">Técnico Superior en Sistemas Informáticos</h2>
          <hr>
          <h3>Datos Personales</h3>
          <p><strong>Email:</strong> laualevgaclaros@gmail.com</p>
          <p><strong>Celular:</strong> 61832844</p>
          <p><strong>Ubicación:</strong> Oruro, Bolivia</p>
          
          <h3>Perfil Profesional</h3>
          <p>Profesional en el área de Informática, con experiencia en soporte técnico, mantenimiento de equipos, diseño gráfico, desarrollo de páginas web.}.</p>
          
          <h3>Experiencia Laboral</h3>
          <h4>Técnico en Soporte Informático - Empresa Dic Bol (2024 - Presente)</h4>
          <ul>
            <li>Instalación, mantenimiento y reparación de equipos de cómputo</li>
            <li>Solución de problemas técnicos de hardware y software</li>
            <li>Atención al cliente y soporte técnico presencial y remoto</li>
          </ul>
          
          <h4>Encargada de Marketing - PCHouse (2023)</h4>
          <ul>
            <li>Gestión de estrategias de marketing</li>
            <li>Diseño de material promocional</li>
            <li>Administración de redes sociales</li>
          </ul>
          
          <h3>Educación</h3>
          <h4>Técnico Superior en Sistemas Informáticos</h4>
          <p>Instituto Jesús María, Oruro - Bolivia</p>
          <p>Formación especializada en sistemas informáticos, hardware, software y redes.</p>
          
          <h3>Habilidades</h3>
          <ul>
            <li>Soporte Técnico - Nivel Avanzado</li>
            <li>Sistemas Informáticos - Nivel Intermedio</li>
            <li>Diseño Gráfico - Nivel Intermedio</li>
            <li>Marketing - Nivel Intermedio</li>
          </ul>
          
          <p style="margin-top: 30px; text-align: center; font-size: 0.9em; color: #7f8c8d;">
            Currículum generado el ${new Date().toLocaleDateString()} - 
            Para más información contactar a: laualevgaclaros@gmail.com
          </p>
        `;
        
        // Configuración para html2pdf
        const options = {
          margin: 10,
          filename: 'CV_Laura_Alejandra_Vega_Claros.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        // Generar PDF
        html2pdf().set(options).from(content).save();
        
        // Cerrar modal
        downloadModal.classList.remove('active');
      });
      
      // Imprimir currículum
      downloadPrint.addEventListener('click', () => {
        window.print();
        downloadModal.classList.remove('active');
      });
      
      // --- MENÚ MÓVIL ---
      const navToggle = document.querySelector('.nav-toggle');
      const nav = document.querySelector('.header__nav');
      
      if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
          nav.classList.toggle('active');
          const isExpanded = nav.classList.contains('active');
          navToggle.setAttribute('aria-expanded', isExpanded);
        });
      }
      
      const navLinks = document.querySelectorAll('.nav__link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        });
      });
      
      // --- ANIMACIÓN DE BARRAS DE HABILIDADES ---
      const skillBars = document.querySelectorAll('.skill__progress');
      if (skillBars.length > 0) {
        window.addEventListener('scroll', animateSkillBars);
        // Ejecutar una vez al cargar
        setTimeout(animateSkillBars, 100);
      }
      
      function animateSkillBars() {
        skillBars.forEach(bar => {
          const rect = bar.getBoundingClientRect();
          const isInViewport = rect.top <= (window.innerHeight || document.documentElement.clientHeight) && 
                              rect.bottom >= 0;
          
          if (isInViewport && !bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
            bar.classList.add('animated');
          }
        });
      }
    });
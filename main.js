document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  
  menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
          
          // Set active link
          navLinks.forEach(item => item.classList.remove('active'));
          this.classList.add('active');
      });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });
  
  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
          backToTop.classList.add('active');
      } else {
          backToTop.classList.remove('active');
      }
  });
  
  // Loan simulator functionality
  const loanValueInput = document.getElementById('loan-value');
  const loanTermInput = document.getElementById('loan-term');
  const loanValueDisplay = document.getElementById('loan-value-display');
  const loanTermDisplay = document.getElementById('loan-term-display');
  const simulatorForm = document.getElementById('credit-simulator');
  const simulationResult = document.getElementById('simulation-result');
  
  // Format currency
  function formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', { 
          style: 'currency', 
          currency: 'BRL' 
      }).format(value);
  }
  
  // Update loan value display
  function updateLoanValue(value) {
      loanValueDisplay.textContent = formatCurrency(value);
  }
  
  // Update loan term display
  function updateLoanTerm(value) {
      loanTermDisplay.textContent = `${value} meses`;
  }
  
  // Calculate installment
  function calculateInstallment(amount, term, rate) {
      const monthlyRate = rate / 100;
      const installment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
      return installment;
  }
  
  // Show simulation result
  function showResult(amount, term, rate, installment, total) {
      document.getElementById('result-amount').textContent = formatCurrency(amount);
      document.getElementById('result-term').textContent = `${term} meses`;
      document.getElementById('result-rate').textContent = `${rate.toFixed(2)}% a.m.`;
      document.getElementById('result-installment').textContent = formatCurrency(installment);
      document.getElementById('result-total').textContent = formatCurrency(total);
      
      simulationResult.style.display = 'block';
      window.scrollTo({
          top: simulationResult.offsetTop - 80,
          behavior: 'smooth'
      });
  }
  
  // Close result
  function closeResult() {
      simulationResult.style.display = 'none';
  }
  
  // Simulator form submission
  if (simulatorForm) {
      simulatorForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const amount = parseFloat(loanValueInput.value);
          const term = parseInt(loanTermInput.value);
          const purpose = document.getElementById('loan-purpose').value;
          
          // Define interest rates based on loan purpose
          let rate;
          switch(purpose) {
              case 'consignado':
                  rate = 1.99;
                  break;
              case 'pessoal':
                  rate = 3.5;
                  break;
              case 'veiculo':
                  rate = 1.2;
                  break;
              case 'imovel':
                  rate = 0.8;
                  break;
              default:
                  rate = 2.5;
          }
          
          const installment = calculateInstallment(amount, term, rate);
          const total = installment * term;
          
          showResult(amount, term, rate, installment, total);
      });
  }
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Here you would typically send the form data to a server
          // For demonstration, we'll just show an alert
          alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
          contactForm.reset();
      });
  }
  
  // Initialize WOW.js for animations
  new WOW().init();
  
  // Testimonials slider (simple implementation)
  const testimonialsSlider = document.querySelector('.testimonials-slider');
  if (testimonialsSlider) {
      let isDown = false;
      let startX;
      let scrollLeft;
      
      testimonialsSlider.addEventListener('mousedown', (e) => {
          isDown = true;
          startX = e.pageX - testimonialsSlider.offsetLeft;
          scrollLeft = testimonialsSlider.scrollLeft;
      });
      
      testimonialsSlider.addEventListener('mouseleave', () => {
          isDown = false;
      });
      
      testimonialsSlider.addEventListener('mouseup', () => {
          isDown = false;
      });
      
      testimonialsSlider.addEventListener('mousemove', (e) => {
          if(!isDown) return;
          e.preventDefault();
          const x = e.pageX - testimonialsSlider.offsetLeft;
          const walk = (x - startX) * 2;
          testimonialsSlider.scrollLeft = scrollLeft - walk;
      });
  }
});
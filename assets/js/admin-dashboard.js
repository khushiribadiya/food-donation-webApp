
document.addEventListener('DOMContentLoaded', function() {
    // Add counter animation to number elements
    const countElements = document.querySelectorAll('.fs-1');
    
    countElements.forEach(element => {
      const finalValue = parseInt(element.textContent);
      if (!isNaN(finalValue)) {
        element.classList.add('counter-js');
        
        // Only animate if value is greater than 0
        if (finalValue > 0) {
          // Start from 0
          let startValue = 0;
          const duration = 1500; // Animation duration in milliseconds
          const increment = finalValue / (duration / 16); // Increment per frame (assuming 60fps)
          
          // Start the animation
          const counter = setInterval(() => {
            startValue += increment;
            
            if (startValue >= finalValue) {
              element.textContent = finalValue;
              clearInterval(counter);
            } else {
              element.textContent = Math.floor(startValue);
            }
          }, 16);
        }
      }
    });
    
    // Add toggle functionality for sidebar if needed
    const sidebarToggler = document.getElementById('sidebar-toggler-btn');
    if (sidebarToggler) {
      sidebarToggler.addEventListener('click', function() {
        const sidebar = document.querySelector('aside') || document.querySelector('.sidebar');
        const mainWrapper = document.getElementById('main-wrapper');
        
        if (sidebar) sidebar.classList.toggle('collapsed');
        if (mainWrapper) mainWrapper.classList.toggle('expanded');
      });
    }
  });
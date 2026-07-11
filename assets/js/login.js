// Login page UI interactions (password toggle, focus/entry animations, submit state)
document.addEventListener('DOMContentLoaded', function () {

  // Password show/hide toggle
  const passwordToggle = document.querySelector('.password-toggle');
  const passwordField = document.querySelector('#password');

  if (passwordToggle && passwordField) {
    passwordToggle.addEventListener('click', function () {
      const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordField.setAttribute('type', type);

      const icon = this.querySelector('i');
      if (icon) {
        if (type === 'text') {
          icon.classList.remove('bi-eye-slash-fill');
          icon.classList.add('bi-eye-fill');
        } else {
          icon.classList.remove('bi-eye-fill');
          icon.classList.add('bi-eye-slash-fill');
        }
      }
    });
  }

  // Subtle entrance animation for input fields
    const inputs = document.querySelectorAll('.input-animated');

    inputs.forEach((input, index) => {
    input.style.opacity = "0";
    input.style.transform = "translateY(12px)";

    setTimeout(() => {
        input.style.transition = "all .4s ease";
        input.style.opacity = "1";
        input.style.transform = "translateY(0)";
    }, index * 120);
    });

  // Focus/blur lift effect on the wrapping field
  inputs.forEach((input) => {
    input.addEventListener('focus', function () {
      const wrapper = this.closest('.input-wrapper');
      if (wrapper) wrapper.style.transform = 'translateY(-3px)';
    }, true);

    input.addEventListener('blur', function () {
      const wrapper = this.closest('.input-wrapper');
      if (wrapper) wrapper.style.transform = 'translateY(0)';
    }, true);
  });

  // Submit button loading state
  const form = document.querySelector('.login-form');
  const submitBtn = document.querySelector('.submit-btn');

  if (form && submitBtn) {
    form.addEventListener('submit', function () {
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing In...';
      submitBtn.disabled = true;
    });
  }

  // Animated background shapes: gentle randomized offsets so they don't move in lockstep
  function createBackgroundAnimation() {
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape) => {
      const randomX = Math.random() * 10 - 5;
      const randomY = Math.random() * 10 - 5;
      const randomDelay = Math.random() * 6;

      shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
      shape.style.animationDelay = `${randomDelay}s`;
    });
  }

  createBackgroundAnimation();
});
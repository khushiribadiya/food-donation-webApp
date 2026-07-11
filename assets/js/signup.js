// Signup page UI interactions (password toggles, strength meter, match
// indicator, submit state). All checks here are UI-only; server-side
// validation is untouched.
document.addEventListener('DOMContentLoaded', function () {

  // ------------------------------------------------------------------
  // Password visibility toggles (works for both password1 and password2)
  // ------------------------------------------------------------------
  function togglePasswordVisibility(toggle) {
    const targetId = toggle.getAttribute('data-target');
    const field = targetId ? document.getElementById(targetId) : null;
    if (!field) return;

    const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
    field.setAttribute('type', type);

    const icon = toggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('bi-eye-slash-fill', type === 'password');
      icon.classList.toggle('bi-eye-fill', type === 'text');
    }

    toggle.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password');
  }

  document.querySelectorAll('.password-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      togglePasswordVisibility(this);
    });

    // Keyboard support (Enter / Space) since this control is a styled <span>
    toggle.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        togglePasswordVisibility(this);
      }
    });
  });

  // ------------------------------------------------------------------
  // Password strength meter (UI only)
  // ------------------------------------------------------------------
  const passwordInput = document.getElementById('password1');
  const strengthBar = document.getElementById('passwordStrength');
  const strengthLabel = document.getElementById('passwordStrengthLabel');

  function updateStrength() {
    if (!passwordInput || !strengthBar) return;

    const val = passwordInput.value;
    let strength = 0;

    if (val.length > 0) {
      if (val.match(/[a-z]/)) strength += 20;
      if (val.match(/[A-Z]/)) strength += 20;
      if (val.match(/[0-9]/)) strength += 20;
      if (val.match(/[^a-zA-Z0-9]/)) strength += 20;
      if (val.length >= 8) strength += 20;
    }

    strengthBar.style.width = strength + '%';

    let label = '';
    let color = 'var(--danger)';

    if (val.length === 0) {
      label = '';
    } else if (strength < 40) {
      label = 'Weak';
      color = 'var(--danger)';
    } else if (strength < 80) {
      label = 'Medium';
      color = 'var(--warning)';
    } else {
      label = 'Strong';
      color = 'var(--success)';
    }

    strengthBar.style.background = color;
    if (strengthLabel) strengthLabel.textContent = label;
  }

  if (passwordInput && strengthBar) {
    passwordInput.addEventListener('input', updateStrength);
  }

  // ------------------------------------------------------------------
  // Passwords match indicator (UI only)
  // ------------------------------------------------------------------
  const password2Input = document.getElementById('password2');
  const matchIndicator = document.getElementById('passwordMatch');
  const matchText = matchIndicator ? matchIndicator.querySelector('span') : null;

  function updateMatch() {
    if (!passwordInput || !password2Input || !matchIndicator) return;

    if (password2Input.value.length === 0) {
      matchIndicator.classList.remove('is-match', 'is-mismatch');
      return;
    }

    const isMatch = passwordInput.value === password2Input.value;
    matchIndicator.classList.toggle('is-match', isMatch);
    matchIndicator.classList.toggle('is-mismatch', !isMatch);

    const icon = matchIndicator.querySelector('i');
    if (icon) {
      icon.classList.toggle('bi-check-circle-fill', isMatch);
      icon.classList.toggle('bi-x-circle-fill', !isMatch);
    }
    if (matchText) {
      matchText.textContent = isMatch ? 'Passwords match' : 'Passwords do not match';
    }
  }

  if (passwordInput) passwordInput.addEventListener('input', updateMatch);
  if (password2Input) password2Input.addEventListener('input', updateMatch);

  // ------------------------------------------------------------------
  // Submit button loading state
  // ------------------------------------------------------------------
  const form = document.querySelector('.login-form');
  const submitBtn = document.querySelector('.submit-btn');

  if (form && submitBtn) {
    form.addEventListener('submit', function () {
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
      submitBtn.disabled = true;
    });
  }

  // ------------------------------------------------------------------
  // Animated background shapes: gentle randomized offsets
  // ------------------------------------------------------------------
  function createBackgroundAnimation() {
    document.querySelectorAll('.shape').forEach(function (shape) {
      const randomX = Math.random() * 20 - 10;
      const randomY = Math.random() * 20 - 10;
      const randomDelay = Math.random() * 6;

      shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
      shape.style.animationDelay = `${randomDelay}s`;
    });
  }

  createBackgroundAnimation();
});
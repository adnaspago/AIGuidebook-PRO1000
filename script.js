// State
let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 100;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initFontSize();
  initNavigation();
  initHamburgerMenu();
  initAIChecklist();
  
  // Font size toggle
  const fontSizeBtn = document.getElementById('fontSizeBtn');
  if (fontSizeBtn) {
    fontSizeBtn.addEventListener('click', increaseFontSize);
  }
});

// AI Responsibility Checklist
function initAIChecklist() {
  const checkboxes = document.querySelectorAll('.ai-check');
  const progressEl = document.getElementById('checklist-progress');
  const completeEl = document.getElementById('checklist-complete');
  const resetBtn = document.getElementById('resetChecklist');

  if (!checkboxes.length || !progressEl || !completeEl || !resetBtn) return;

  const updateChecklist = () => {
    const total = checkboxes.length;
    const checkedCount = Array.from(checkboxes).filter(c => c.checked).length;

    if (progressEl) {
      progressEl.textContent = `${checkedCount} av ${total} fullført`;
    }

    checkboxes.forEach(box => {
      const parent = box.closest('.checklist-item');
      if (parent) {
        parent.classList.toggle('checked', box.checked);
      }
    });

    if (checkedCount === total) {
      completeEl.classList.add('visible');
    } else {
      completeEl.classList.remove('visible');
    }
  };

  checkboxes.forEach(box => {
    box.addEventListener('change', updateChecklist);
  });

  resetBtn.addEventListener('click', () => {
    checkboxes.forEach(box => {
      box.checked = false;
      const parent = box.closest('.checklist-item');
      if (parent) parent.classList.remove('checked');
    });
    updateChecklist();
    checkboxes[0]?.focus();
  });

  updateChecklist();
}

// Language Functions
// Font Size Functions
function initFontSize() {
  updateFontSize();
}

function increaseFontSize() {
  currentFontSize += 10;
  if (currentFontSize > 130) {
    currentFontSize = 100;
  }
  localStorage.setItem('fontSize', currentFontSize);
  updateFontSize();
}

function updateFontSize() {
  const body = document.body;
  const display = document.getElementById('fontSizeDisplay');
  
  // Remove all font classes
  body.classList.remove('font-medium', 'font-large', 'font-xlarge');
  
  // Add appropriate class
  if (currentFontSize === 110) {
    body.classList.add('font-medium');
  } else if (currentFontSize === 120) {
    body.classList.add('font-large');
  } else if (currentFontSize === 130) {
    body.classList.add('font-xlarge');
  }
  
  // Update display
  if (display) {
    display.textContent = currentFontSize + '%';
  }
}

// Navigation Active State
function initNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// Hamburger Menu Toggle
function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.querySelector('.nav-links');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        navLinks.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// Export for use in other contexts if needed

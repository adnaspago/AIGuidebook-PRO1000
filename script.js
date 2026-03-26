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
  const pathParts = window.location.pathname.split('/');
  const currentFile = pathParts[pathParts.length - 1] || 'index.html';
  const isInPages = pathParts.includes('Pages');
  
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Remove any existing active state
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    
    if (isInPages) {
      // For pages in Pages/ directory, match the filename directly
      if (href === currentFile) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    } else if (currentFile === 'index.html') {
      // For index.html, check if href is index.html
      if (href === 'index.html') {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
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

// AI Checklist Functionality
function initChecklist() {
  const checkboxes = document.querySelectorAll('.ai-check');
  const completeElement = document.getElementById('checklist-complete');
  const resetButton = document.getElementById('resetChecklist');

  if (checkboxes.length === 0) return;

  function updateProgress() {
    const checkedCount = document.querySelectorAll('.ai-check:checked').length;
    const totalCount = checkboxes.length;

    if (completeElement) {
      if (checkedCount === totalCount) {
        completeElement.style.display = 'block';
      } else {
        completeElement.style.display = 'none';
      }
    }
  }

  // Add event listeners to checkboxes
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
  });

  // Reset button functionality
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
      updateProgress();
    });
  }

  // Initial update
  updateProgress();
}

// Initialize checklist on page load
document.addEventListener('DOMContentLoaded', function() {
  initFontSize();
  initNavigation();
  initHamburgerMenu();
  initChecklist();  // Add this line
  
  // Font size toggle
  const fontSizeBtn = document.getElementById('fontSizeBtn');
  if (fontSizeBtn) {
    fontSizeBtn.addEventListener('click', increaseFontSize);
  }
});

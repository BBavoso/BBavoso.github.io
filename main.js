// Navigation handling
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  function showSection(sectionId) {
    sections.forEach(section => {
      section.classList.remove('active');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    const targetSection = document.querySelector(sectionId);
    const targetLink = document.querySelector(`[href="${sectionId}"]`);
    
    if (targetSection) targetSection.classList.add('active');
    if (targetLink) targetLink.classList.add('active');
  }

  // Handle navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('href');
      showSection(sectionId);
      history.pushState(null, '', sectionId);
    });
  });

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const sectionId = window.location.hash || '#home';
    showSection(sectionId);
  });

  // Show initial section
  const initialSection = window.location.hash || '#home';
  showSection(initialSection);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});
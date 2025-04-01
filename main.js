// Project data
const projectData = {
  "potion-problems": {
    title: "Potion Problems",
    fullDesc: "",
    technologies: ["Unreal Engine", "Wwise", "C++", "Blueprints"],
    features: ["Room Ambience", "Footsteps", "Dynamic Music"],
    demoLink: "",
  },
  "harvard-burger": {
    title: "Harvard Burger",
    fullDesc:
      "You interact using only your voice. The app automatically detects when you start and stop talking, uses AI to transcribe what you say, figures out the food items (with modifications) you want to order, and adds them to your current order. It even handles details like size and flavor preferences. The AI then generates text-to-speech audio, which is played back to confirm your order in a humorous, engaging way. There is absolutely zero set-up or management necessary, as the program will completely ignore all background noises and conversation. Even then, it will still take your order with staggering precision.",
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "Python",
      "Flask",
      "OpenAI",
    ],
    features: [
      "Full-stack application",
      "User authentication",
      "Dynamic burger creation",
      "Voice Recognition",
      "AI-powered burger recommendations",
    ],
    demoLink: "https://devpost.com/software/harvard-burger",
  },
  "fandom-wiki-race": {
    title: "FandomWikiRace",
    fullDesc: "",
    technologies: [],
    features: [],
    demoLink: "",
  },
  "ocean-microplastics": {
    title: "Ocean Microplastics Mania",
    fullDesc: "",
    technologies: [],
    features: [],
    demoLink: "",
  },
};

// Navigation handling
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  function showSection(sectionId) {
    sections.forEach((section) => {
      section.classList.remove("active");
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    const targetSection = document.querySelector(sectionId);
    const targetLink = document.querySelector(`[href="${sectionId}"]`);

    if (targetSection) targetSection.classList.add("active");
    if (targetLink) targetLink.classList.add("active");
  }

  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("href");
      showSection(sectionId);
      history.pushState(null, "", sectionId);
    });
  });

  // Handle browser back/forward
  window.addEventListener("popstate", () => {
    const sectionId = window.location.hash || "#home";
    showSection(sectionId);
  });

  // Show initial section
  const initialSection = window.location.hash || "#home";
  showSection(initialSection);

  // Add click handlers to project cards
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const projectId = card.getAttribute("data-project-id");
      if (projectId) {
        showProjectDetails(projectId);
      }
    });
  });
}

function showProjectDetails(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  // Create modal container
  const modal = document.createElement("div");
  modal.className = "project-modal";

  // Create modal content
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-button">&times;</button>
      <h2>${project.title}</h2>
      <p class="project-full-desc">${project.fullDesc}</p>
      
      <h3>Technologies</h3>
      <ul class="tech-list">
        ${project.technologies.map((tech) => `<li>${tech}</li>`).join("")}
      </ul>
      
      <h3>Features</h3>
      <ul class="feature-list">
        ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
      </ul>
      
      ${
        project.demoLink
          ? `<div class="demo-link">
               <a href="${project.demoLink}" target="_blank" class="demo-button">View Demo</a>
             </div>`
          : ""
      }
    </div>
  `;

  // Add modal to page
  document.body.appendChild(modal);

  // Add close functionality
  const closeButton = modal.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    modal.remove();
  });

  // Close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();

  // Add project IDs to cards
  document.querySelectorAll(".project-card").forEach((card) => {
    const title = card.querySelector("h3").textContent;
    const projectId = Object.keys(projectData).find(
      (key) => projectData[key].title === title
    );
    if (projectId) {
      card.setAttribute("data-project-id", projectId);
    }
  });
});

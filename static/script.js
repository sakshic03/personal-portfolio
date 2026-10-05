const projectList = document.getElementById("project-list");
const featuredProject = document.getElementById("featured-project");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const progressBar = document.getElementById("scroll-progress");
const themeToggle = document.getElementById("theme-toggle");
const copyEmailButton = document.getElementById("copy-email");

const projectDialog = document.getElementById("project-dialog");
const dialogClose = document.getElementById("dialog-close");
const dialogTitle = document.getElementById("dialog-title");
const dialogType = document.getElementById("dialog-type");
const dialogDescription = document.getElementById("dialog-description");
const dialogFeatures = document.getElementById("dialog-features");
const dialogTech = document.getElementById("dialog-tech");
const dialogLive = document.getElementById("dialog-live");
const dialogGithub = document.getElementById("dialog-github");

document.getElementById("current-year").textContent = new Date().getFullYear();

const projectDetails = {
  "Taste-e-Magic": {
    type: "Diploma 5th Semester Internship Project",
    description:
      "A user-friendly online food ordering website. Customers can explore the menu, select food, and send their order details directly through WhatsApp.",
    features: [
      "Interactive food menu",
      "Selected menu items automatically fill the order form",
      "WhatsApp-based order submission",
      "Developed independently from idea to implementation"
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/sakshic03/taste-e-magic"
  },

  "Smart Study Planner": {
    type: "Personal Project",
    description:
      "An AI-based study planning web application that helps students organize study schedules and tasks, with an AI chat feature for interactive assistance.",
    features: [
      "Create and manage study plans",
      "Organize study tasks",
      "AI-based chat assistance",
      "Backend and database integration"
    ],
    technologies: ["Python", "Flask", "HTML", "CSS", "JavaScript", "SQLite"],
    github: "https://github.com/sakshic03/smart-study-planner"
  },

  "Pup Paradise": {
    type: "Pet Shop Website · Web Development Project",
    description:
      "A responsive and user-friendly pet shop website designed to showcase pets and pet-related products in an attractive, organized way, with a clean interface and smooth browsing experience.",
    features: [
      "Attractive and responsive UI",
      "Pet and product sections",
      "Organized product information",
      "Interactive navigation",
      "User-friendly browsing experience"
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/sakshic03/petshop"
  }
};

function setTheme(theme) {
  document.body.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☼" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
  localStorage.setItem("portfolio-theme", theme);
}

const savedTheme = localStorage.getItem("portfolio-theme");
setTheme(savedTheme === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

const roles = [
  "Computer Science student",
  "Web development learner",
  "Aspiring full-stack developer"
];

const typedRole = document.getElementById("typed-role");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reduceMotion && typedRole) {
  let roleIndex = 0;
  let letterIndex = roles[0].length;
  let deleting = true;

  function typeRole() {
    const currentRole = roles[roleIndex];

    if (deleting) {
      letterIndex--;
      typedRole.textContent = currentRole.slice(0, letterIndex);

      if (letterIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    } else {
      const nextRole = roles[roleIndex];
      letterIndex++;
      typedRole.textContent = nextRole.slice(0, letterIndex);

      if (letterIndex >= nextRole.length) {
        deleting = true;
        setTimeout(typeRole, 1400);
        return;
      }
    }

    setTimeout(typeRole, deleting ? 45 : 75);
  }

  setTimeout(typeRole, 1400);
}

function openCaseStudy(project, details) {
  dialogType.textContent = details.type;
  dialogTitle.textContent = project.title;
  dialogDescription.textContent = details.description;

  dialogFeatures.innerHTML = "";
  details.features.forEach((feature) => {
    const item = document.createElement("li");
    item.textContent = feature;
    dialogFeatures.appendChild(item);
  });

  dialogTech.innerHTML = "";
  details.technologies.forEach((technology) => {
    const tag = document.createElement("span");
    tag.textContent = technology;
    dialogTech.appendChild(tag);
  });

  dialogLive.href = project.project_url;

  if (details.github) {
    dialogGithub.href = details.github;
    dialogGithub.style.display = "inline-flex";
  } else {
    dialogGithub.style.display = "none";
  }

  projectDialog.showModal();
}

function renderFeaturedProject(project) {
  if (!featuredProject) return;

  const details = projectDetails[project.title];
  const card = document.createElement("article");
  card.className = "featured-project-card";

  const copy = document.createElement("div");
  copy.className = "featured-project-copy";

  const label = document.createElement("p");
  label.className = "featured-label";
  label.textContent = "✦ FEATURED PROJECT";

  const type = document.createElement("p");
  type.className = "featured-type";
  type.textContent = details?.type || "Selected project";

  const title = document.createElement("h3");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.className = "featured-description";
  description.textContent = details?.description || project.description;

  const tags = document.createElement("div");
  tags.className = "featured-tags";

  (details?.technologies || []).forEach((technology) => {
    const tag = document.createElement("span");
    tag.textContent = technology;
    tags.appendChild(tag);
  });

  const actions = document.createElement("div");
  actions.className = "featured-actions";

  if (project.project_url) {
    const liveLink = document.createElement("a");
    liveLink.className = "button button-primary";
    liveLink.href = project.project_url;
    liveLink.target = "_blank";
    liveLink.rel = "noopener noreferrer";
    liveLink.textContent = "Live Demo ↗";
    actions.appendChild(liveLink);
  }

  if (details?.github) {
    const githubLink = document.createElement("a");
    githubLink.className = "button button-secondary";
    githubLink.href = details.github;
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
    githubLink.textContent = "GitHub ↗";
    actions.appendChild(githubLink);
  }

  if (details) {
    const caseStudyButton = document.createElement("button");
    caseStudyButton.className = "project-detail-button";
    caseStudyButton.type = "button";
    caseStudyButton.textContent = "Case Study";
    caseStudyButton.addEventListener("click", () => {
      openCaseStudy(project, details);
    });
    actions.appendChild(caseStudyButton);
  }

  copy.append(label, type, title, description, tags, actions);

  const visual = document.createElement("div");
  visual.className = "featured-visual";
  visual.innerHTML = `
    <div class="featured-visual-top">
      <span>STUDY / PLAN / GROW</span>
      <span>✳</span>
    </div>
    <div class="featured-visual-center">
      <span class="featured-orbit"></span>
      <span class="featured-monogram">SP</span>
    </div>
    <div class="featured-visual-bottom">
      <span>AI STUDY PLANNER</span>
      <span>✦</span>
    </div>
  `;

  card.append(copy, visual);
  featuredProject.replaceChildren(card);
}

async function loadProjects() {
  try {
    const response = await fetch("/api/projects");
    if (!response.ok) {
      throw new Error("Could not load projects");
    }

    const projects = await response.json();
    projectList.innerHTML = "";

    const featured = projects.find(
      (project) => project.title === "Smart Study Planner"
    );

    if (featured) {
      renderFeaturedProject(featured);
    }

    const otherProjects = projects.filter(
      (project) => project.title !== "Smart Study Planner"
    );

    otherProjects.forEach((project, index) => {
      const details = projectDetails[project.title];
      const card = document.createElement("article");
      card.className = "project-card";

      if (project.project_url) {
        card.tabIndex = 0;
        card.setAttribute("role", "link");
        card.setAttribute("aria-label", `Open ${project.title} live website`);

        const openProject = () => {
          window.open(project.project_url, "_blank", "noopener,noreferrer");
        };

        card.addEventListener("click", (event) => {
          if (!event.target.closest("a, button")) {
            openProject();
          }
        });

        card.addEventListener("keydown", (event) => {
          if (
            (event.key === "Enter" || event.key === " ") &&
            event.target === card
          ) {
            event.preventDefault();
            openProject();
          }
        });
      }

      const top = document.createElement("div");
      top.className = "project-card-top";

      const number = document.createElement("span");
      number.className = "project-index";
      number.textContent = `PROJECT / ${String(index + 1).padStart(2, "0")}`;

      const icon = document.createElement("span");
      icon.className = "project-icon";
      icon.textContent = index % 2 === 0 ? "✳" : "⌘";
      top.append(number, icon);

      const info = document.createElement("div");

      const title = document.createElement("h3");
      title.textContent = project.title;

      const description = document.createElement("p");
      description.textContent = project.description;

      info.append(title, description);

      const actions = document.createElement("div");
      actions.className = "project-card-bottom";

      if (project.project_url) {
        const liveLink = document.createElement("a");
        liveLink.className = "project-action primary";
        liveLink.href = project.project_url;
        liveLink.target = "_blank";
        liveLink.rel = "noopener noreferrer";
        liveLink.textContent = "Live demo ↗";
        actions.appendChild(liveLink);
      }

      if (details) {
        const caseStudyButton = document.createElement("button");
        caseStudyButton.className = "project-detail-button";
        caseStudyButton.type = "button";
        caseStudyButton.textContent = "Case study";
        caseStudyButton.addEventListener("click", () => {
          openCaseStudy(project, details);
        });
        actions.appendChild(caseStudyButton);

        if (details.github) {
          const githubLink = document.createElement("a");
          githubLink.className = "project-action";
          githubLink.href = details.github;
          githubLink.target = "_blank";
          githubLink.rel = "noopener noreferrer";
          githubLink.textContent = "GitHub ↗";
          actions.appendChild(githubLink);
        }
      }

      card.append(top, info, actions);
      projectList.appendChild(card);
    });
  } catch (error) {
    projectList.innerHTML =
      '<p class="error-message">Projects could not be loaded. Please refresh the page.</p>';
  }
}

dialogClose.addEventListener("click", () => projectDialog.close());

projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) {
    projectDialog.close();
  }
});

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formStatus.textContent = "Sending…";

  const formData = new FormData(contactForm);
  const messageData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData)
    });

    const result = await response.json();

    if (!response.ok) {
      formStatus.textContent =
        result.error || "Please check your details and try again.";
      return;
    }

    formStatus.textContent = result.message;
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = "Could not send the message. Please try again.";
  }
});

copyEmailButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("chavansakshi0003@gmail.com");
    copyEmailButton.textContent = "Email copied ✓";

    setTimeout(() => {
      copyEmailButton.textContent = "Copy email address";
    }, 1800);
  } catch (error) {
    copyEmailButton.textContent = "Email: chavansakshi0003@gmail.com";
  }
});

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  navLinks.classList.toggle("open", !open);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
  });
});

function updateProgress() {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (window.scrollY / height) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress);
updateProgress();

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navItems.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

function observeRevealElements() {
  const elements = document.querySelectorAll(".reveal:not(.visible)");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => revealObserver.observe(element));
}

observeRevealElements();
loadProjects();

async function loadCertificates() {
  const certificateGrid = document.getElementById("certificate-grid");
  if (!certificateGrid) return;

  try {
    const response = await fetch("/api/certificates");

    if (!response.ok) {
      throw new Error("Could not load certificates");
    }

    const certificates = await response.json();
    certificateGrid.innerHTML = "";

    if (certificates.length === 0) {
      certificateGrid.innerHTML =
        '<p class="loading-message">No certificate PDFs found in static.</p>';
      return;
    }

    certificates.forEach((certificate, index) => {
      const link = document.createElement("a");
      link.className = "certificate-card";
      link.href = certificate.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const number = document.createElement("span");
      number.className = "certificate-number";
      number.textContent = String(index + 1).padStart(2, "0");

      const icon = document.createElement("span");
      icon.className = "certificate-icon";
      icon.textContent = "PDF";

      const name = document.createElement("span");
      name.className = "certificate-name";
      name.textContent = certificate.title;

      const arrow = document.createElement("span");
      arrow.className = "certificate-arrow";
      arrow.textContent = "↗";

      link.append(number, icon, name, arrow);
      certificateGrid.appendChild(link);
    });
  } catch (error) {
    certificateGrid.innerHTML =
      '<p class="error-message">Certificates could not be loaded. Please refresh the page.</p>';
  }
}

loadCertificates();
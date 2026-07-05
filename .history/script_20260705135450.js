/* =========================================================
   KUNAL PANDIT PORTFOLIO - SCRIPT.JS
   Pure HTML/CSS/JS portfolio with hidden admin panel
========================================================= */

/* =========================================================
   1) DEFAULT PORTFOLIO DATA
   Edit these defaults if you want the original base content changed.
========================================================= */
const DEFAULT_PORTFOLIO = {
  basic: {
    name: "Kunal Pandit",
    role: "Aspiring DevOps Engineer | Cloud & Full-Stack Developer",
    heroIntro:
      "Computer Science undergraduate focused on full-stack development, Linux, CI/CD, cloud fundamentals, and building toward DevOps and scalable engineering roles.",
    avatarText: "KP",
    typingRoles: [
      "DevOps Learner",
      "Cloud Enthusiast",
      "Full-Stack Developer",
      "Linux & CI/CD Explorer",
    ],
  },

  about: {
    text:
      "I am a Computer Science undergraduate with hands-on experience in full-stack web development and a strong interest in DevOps, Cloud Computing, Linux, CI/CD, and automation. I have worked on real-world projects using JavaScript, Python, React, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, and Flask. I also have practical familiarity with Linux, Git, GitHub, GitHub Actions, Bash, Docker basics, and cloud fundamentals. I’m currently building toward DevOps, Cloud, and scalable software engineering roles by combining development experience with modern infrastructure learning.",
  },

  resume: {
    label: "Download Resume",
    link: "assets/Kunal-Pandit-Resume.pdf",
  },

  contact: {
    email: "kunalpandit5240@gmail.com",
    phone: "+91 9032879407",
    location: "Pune, Maharashtra, India",
    linkedin: "https://www.linkedin.com/in/kunal-pandit-515328399",
    github: "https://github.com/Kunal-Pandit07",
  },

  appearance: {
    accentColor: "#66a6ff",
    defaultTheme: "dark",
  },

  skills: [
    {
      category: "Languages",
      items: ["JavaScript", "Python", "C", "SQL", "HTML", "CSS"],
    },
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "Responsive Web Design", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "Flask", "REST APIs"],
    },
    {
      category: "Databases",
      items: ["MongoDB", "PostgreSQL", "Supabase", "Firebase"],
    },
    {
      category: "DevOps & Cloud",
      items: [
        "Linux",
        "Git",
        "GitHub",
        "GitHub Actions",
        "Bash",
        "Docker",
        "CI/CD Concepts",
        "AWS Fundamentals",
        "Azure Fundamentals",
      ],
    },
    {
      category: "Tools",
      items: ["VS Code", "Postman", "MongoDB Atlas", "Cloudinary", "Razorpay"],
    },
  ],

  projects: [
    {
      id: generateId(),
      title: "AI Job & Internship Finder",
      description:
        "AI-powered platform with job matching, resume parsing, resume feedback, skill-gap analysis, and personalized recommendations.",
      techStack: ["React", "Node.js", "Express.js", "MongoDB", "AI APIs"],
      github: "https://github.com/your-username/ai-job-finder",
      demo: "https://your-demo-link.com",
      category: "Full Stack",
      imageLabel: "AI Job Finder",
    },
    {
      id: generateId(),
      title: "Music Streaming Platform",
      description:
        "Music and podcast streaming platform with playlists, artist profiles, search, authentication, and a modern responsive interface.",
      techStack: ["Next.js", "MongoDB", "Tailwind CSS", "Cloudinary"],
      github: "https://github.com/your-username/music-platform",
      demo: "https://your-demo-link.com",
      category: "Web App",
      imageLabel: "Music Platform",
    },
    {
      id: generateId(),
      title: "Medical Store Management System",
      description:
        "Pharmacy management application with billing, medicine inventory, role-based access, stock updates, expiry tracking, and invoice generation.",
      techStack: ["Flask", "Python", "PostgreSQL", "SQLite"],
      github: "https://github.com/your-username/medical-store-system",
      demo: "https://your-demo-link.com",
      category: "Python",
      imageLabel: "Medical Store",
    },
    {
      id: generateId(),
      title: "SolarSwipe Service Platform",
      description:
        "Solar panel cleaning service platform with booking system, worker management, dashboard, and admin workflow.",
      techStack: ["Next.js", "MongoDB", "Express.js"],
      github: "https://github.com/your-username/solarswipe",
      demo: "https://your-demo-link.com",
      category: "DevOps",
      imageLabel: "SolarSwipe",
    },
    {
      id: generateId(),
      title: "FoodRush Food Ordering System",
      description:
        "Food ordering platform with cart, payments, coupons, tracking, admin controls, and responsive UI.",
      techStack: ["React", "Express.js", "MongoDB"],
      github: "https://github.com/your-username/foodrush",
      demo: "https://your-demo-link.com",
      category: "Full Stack",
      imageLabel: "FoodRush",
    },
  ],

  education: {
    degree: "Bachelor of Science (Computer Science)",
    college: "Annasaheb Magar College, Hadapsar, Pune",
    university: "Savitribai Phule Pune University (SPPU)",
    graduation: "2028",
  },

  certificates: [
    {
      id: generateId(),
      title: "Git & GitHub Certificate",
      link: "#",
      note: "Certificate item kept compact and editable from the admin panel.",
    },
  ],
};

/* =========================================================
   2) CONFIG
========================================================= */
const STORAGE_KEY = "kunalPortfolioData";
const THEME_KEY = "kunalPortfolioTheme";
const ADMIN_PASSWORD = "kunal@admin123"; // CHANGE THIS TO YOUR OWN PASSWORD

let portfolioData = loadPortfolioData();
let currentProjectFilter = "All";

/* =========================================================
   3) DOM ELEMENTS
========================================================= */
const body = document.body;
const root = document.documentElement;

/* General */
const loader = document.getElementById("loader");
const currentYear = document.getElementById("currentYear");

/* Navbar */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

/* Theme */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

/* Hero / About / Footer */
const navBrandName = document.getElementById("navBrandName");
const heroName = document.getElementById("heroName");
const heroRole = document.getElementById("heroRole");
const heroIntro = document.getElementById("heroIntro");
const heroCardName = document.getElementById("heroCardName");
const heroCardRole = document.getElementById("heroCardRole");
const avatarCircle = document.getElementById("avatarCircle");
const typedText = document.getElementById("typedText");
const aboutText = document.getElementById("aboutText");
const resumeBtn = document.getElementById("resumeBtn");
const footerName = document.getElementById("footerName");
const footerNameCopy = document.getElementById("footerNameCopy");

/* Dynamic sections */
const skillsGrid = document.getElementById("skillsGrid");
const projectsGrid = document.getElementById("projectsGrid");
const educationCard = document.getElementById("educationCard");
const certificateGrid = document.getElementById("certificateGrid");
const contactList = document.getElementById("contactList");
const footerSocials = document.getElementById("footerSocials");

/* Project filters */
const projectFilters = document.getElementById("projectFilters");

/* Contact form */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

/* Back to top */
const backToTop = document.getElementById("backToTop");

/* Admin modal */
const adminSecretTrigger = document.getElementById("adminSecretTrigger");
const adminModal = document.getElementById("adminModal");
const adminBackdrop = document.getElementById("adminBackdrop");
const adminGate = document.getElementById("adminGate");
const adminEditor = document.getElementById("adminEditor");
const adminCloseGate = document.getElementById("adminCloseGate");
const adminCloseEditor = document.getElementById("adminCloseEditor");
const adminCancelBtn = document.getElementById("adminCancelBtn");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminPassword = document.getElementById("adminPassword");
const adminPasswordError = document.getElementById("adminPasswordError");
const closeAdminBtn = document.getElementById("closeAdminBtn");
const savePortfolioBtn = document.getElementById("savePortfolioBtn");
const resetPortfolioBtn = document.getElementById("resetPortfolioBtn");
const adminSaveStatus = document.getElementById("adminSaveStatus");

/* Admin tabs */
const adminTabs = document.querySelectorAll(".admin-tab");
const adminTabPanels = document.querySelectorAll(".admin-tab-panel");

/* Admin fields */
const adminName = document.getElementById("adminName");
const adminRole = document.getElementById("adminRole");
const adminHeroIntro = document.getElementById("adminHeroIntro");
const adminAboutText = document.getElementById("adminAboutText");
const adminResumeLink = document.getElementById("adminResumeLink");
const adminResumeLabel = document.getElementById("adminResumeLabel");

const adminDegree = document.getElementById("adminDegree");
const adminCollege = document.getElementById("adminCollege");
const adminUniversity = document.getElementById("adminUniversity");
const adminGraduation = document.getElementById("adminGraduation");

const adminEmail = document.getElementById("adminEmail");
const adminPhone = document.getElementById("adminPhone");
const adminLocation = document.getElementById("adminLocation");
const adminLinkedIn = document.getElementById("adminLinkedIn");
const adminGitHub = document.getElementById("adminGitHub");

const adminAccentColor = document.getElementById("adminAccentColor");
const adminDefaultTheme = document.getElementById("adminDefaultTheme");

/* Admin dynamic containers */
const adminSkillsContainer = document.getElementById("adminSkillsContainer");
const adminProjectsContainer = document.getElementById("adminProjectsContainer");
const adminCertificatesContainer = document.getElementById("adminCertificatesContainer");

const addSkillBtn = document.getElementById("addSkillBtn");
const addProjectBtn = document.getElementById("addProjectBtn");
const addCertificateBtn = document.getElementById("addCertificateBtn");

/* =========================================================
   4) INIT
========================================================= */
window.addEventListener("DOMContentLoaded", () => {
  currentYear.textContent = new Date().getFullYear();

  applyAppearanceFromData();
  applyThemeOnLoad();
  renderPortfolio();
  initTypingEffect();
  initScrollReveal();
  initActiveNavOnScroll();
  initBackToTop();
  initNavbar();
  initProjectFilters();
  initContactForm();
  initAdminPanel();

  setTimeout(() => loader.classList.add("hide"), 700);
});

/* =========================================================
   5) DATA HELPERS
========================================================= */
function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

function deepClone(data) {
  return JSON.parse(JSON.stringify(data));
}

function loadPortfolioData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return deepClone(DEFAULT_PORTFOLIO);

  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to parse saved portfolio data:", error);
    return deepClone(DEFAULT_PORTFOLIO);
  }
}

function savePortfolioData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
}

function resetPortfolioData() {
  portfolioData = deepClone(DEFAULT_PORTFOLIO);
  savePortfolioData();
}

/* =========================================================
   6) THEME / APPEARANCE
========================================================= */
function applyAppearanceFromData() {
  // Accent color from data
  root.style.setProperty("--accent", portfolioData.appearance.accentColor || "#66a6ff");
}

function applyThemeOnLoad() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const themeToUse = savedTheme || portfolioData.appearance.defaultTheme || "dark";

  if (themeToUse === "light") {
    body.classList.add("light-mode");
    themeIcon.textContent = "☀️";
  } else {
    body.classList.remove("light-mode");
    themeIcon.textContent = "🌙";
  }
}

function toggleTheme() {
  const isLight = body.classList.toggle("light-mode");
  const newTheme = isLight ? "light" : "dark";
  themeIcon.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem(THEME_KEY, newTheme);
}

themeToggle.addEventListener("click", toggleTheme);

/* =========================================================
   7) RENDER PORTFOLIO
========================================================= */
function renderPortfolio() {
  renderBasicInfo();
  renderAbout();
  renderSkills();
  renderProjects();
  renderEducation();
  renderCertificates();
  renderContact();
  renderFooter();
  applyAppearanceFromData();
}

function renderBasicInfo() {
  const { basic, resume } = portfolioData;

  navBrandName.textContent = basic.name;
  heroName.textContent = basic.name;
  heroRole.textContent = basic.role;
  heroIntro.textContent = basic.heroIntro;
  heroCardName.textContent = basic.name;
  heroCardRole.textContent = "DevOps / Cloud / Full-Stack";
  avatarCircle.textContent = basic.avatarText || getInitials(basic.name);

  resumeBtn.textContent = resume.label || "Download Resume";
  resumeBtn.href = resume.link || "#";
}

function renderAbout() {
  aboutText.textContent = portfolioData.about.text;
}

function renderSkills() {
  skillsGrid.innerHTML = "";

  portfolioData.skills.forEach((group) => {
    const card = document.createElement("article");
    card.className = "skill-category glass reveal";

    const badges = group.items
      .map((item) => `<span class="skill-badge">${escapeHTML(item)}</span>`)
      .join("");

    card.innerHTML = `
      <h3>${escapeHTML(group.category)}</h3>
      <div class="skill-badges">
        ${badges}
      </div>
    `;

    skillsGrid.appendChild(card);
  });

  refreshRevealTargets();
}

function renderProjects() {
  projectsGrid.innerHTML = "";

  const projectsToRender =
    currentProjectFilter === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter(
          (project) => project.category === currentProjectFilter
        );

  if (projectsToRender.length === 0) {
    projectsGrid.innerHTML = `
      <div class="project-card glass" style="padding:24px;">
        <h3 style="margin-bottom:8px;color:var(--heading);">No projects in this category</h3>
        <p style="color:var(--text-muted);">Add or edit projects from the hidden admin panel.</p>
      </div>
    `;
    return;
  }

  projectsToRender.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card glass reveal";

    const techBadges = project.techStack
      .map((tech) => `<span class="stack-badge">${escapeHTML(tech)}</span>`)
      .join("");

    card.innerHTML = `
      <div class="project-thumb">
        <div class="project-thumb-inner">
          <div>
            <div style="font-size:1.2rem;margin-bottom:8px;">${escapeHTML(
              project.imageLabel || project.title
            )}</div>
            <div style="font-size:0.92rem;color:var(--text-muted);font-weight:600;">
              Project Placeholder Image
            </div>
          </div>
        </div>
      </div>

      <div class="project-content">
        <div class="project-top">
          <h3>${escapeHTML(project.title)}</h3>
          <span class="project-category">${escapeHTML(project.category)}</span>
        </div>

        <p>${escapeHTML(project.description)}</p>

        <div class="project-stack">
          ${techBadges}
        </div>

        <div class="project-actions">
          <a
            href="${project.github || "#"}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary"
          >
            GitHub
          </a>
          <a
            href="${project.demo || "#"}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            Live Demo
          </a>
        </div>
      </div>
    `;

    projectsGrid.appendChild(card);
  });

  refreshRevealTargets();
}

function renderEducation() {
  const edu = portfolioData.education;

  educationCard.innerHTML = `
    <div class="education-list">
      <h3>${escapeHTML(edu.degree)}</h3>
      <p class="education-meta">${escapeHTML(edu.college)}</p>
      <p class="education-meta">${escapeHTML(edu.university)}</p>
      <p class="education-meta"><strong>Expected Graduation:</strong> ${escapeHTML(
        edu.graduation
      )}</p>
    </div>
  `;
}

function renderCertificates() {
  certificateGrid.innerHTML = "";

  portfolioData.certificates.forEach((cert) => {
    const card = document.createElement("article");
    card.className = "certificate-card glass reveal";

    card.innerHTML = `
      <div>
        <h3>${escapeHTML(cert.title)}</h3>
        <p>${escapeHTML(cert.note || "Certificate item")}</p>
      </div>
      <a
        href="${cert.link || "#"}"
        class="btn btn-secondary certificate-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        View
      </a>
    `;

    certificateGrid.appendChild(card);
  });

  refreshRevealTargets();
}

function renderContact() {
  const c = portfolioData.contact;

  contactList.innerHTML = `
    <div class="contact-item">
      <div class="contact-item-icon">✉</div>
      <div>
        <h4>Email</h4>
        <a href="mailto:${c.email}">${escapeHTML(c.email)}</a>
      </div>
    </div>

    <div class="contact-item">
      <div class="contact-item-icon">☎</div>
      <div>
        <h4>Phone</h4>
        <a href="tel:${c.phone}">${escapeHTML(c.phone)}</a>
      </div>
    </div>

    <div class="contact-item">
      <div class="contact-item-icon">⌂</div>
      <div>
        <h4>Location</h4>
        <span>${escapeHTML(c.location)}</span>
      </div>
    </div>

    <div class="contact-item">
      <div class="contact-item-icon">in</div>
      <div>
        <h4>LinkedIn</h4>
        <a href="${c.linkedin}" target="_blank" rel="noopener noreferrer">
          ${escapeHTML(c.linkedin)}
        </a>
      </div>
    </div>

    <div class="contact-item">
      <div class="contact-item-icon">GH</div>
      <div>
        <h4>GitHub</h4>
        <a href="${c.github}" target="_blank" rel="noopener noreferrer">
          ${escapeHTML(c.github)}
        </a>
      </div>
    </div>
  `;
}

function renderFooter() {
  const { basic, contact } = portfolioData;

  footerName.textContent = basic.name;
  footerNameCopy.textContent = basic.name;

  footerSocials.innerHTML = `
    <a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    <a href="${contact.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="mailto:${contact.email}">Email</a>
  `;
}

/* =========================================================
   8) NAVBAR / ACTIVE LINK / MOBILE MENU
========================================================= */
function initNavbar() {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}

function initActiveNavOnScroll() {
  const sections = document.querySelectorAll("main section[id]");

  function updateActiveNav() {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();
}

/* =========================================================
   9) TYPING EFFECT
========================================================= */
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function initTypingEffect() {
  if (!typedText) return;
  clearTimeout(typingTimeout);
  typedText.textContent = "";
  typingIndex = 0;
  charIndex = 0;
  isDeleting = false;
  typeLoop();
}

function typeLoop() {
  const roles = portfolioData.basic.typingRoles || [];
  if (!roles.length) return;

  const currentWord = roles[typingIndex];

  if (!isDeleting) {
    typedText.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      typingTimeout = setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedText.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 45 : 90;
  typingTimeout = setTimeout(typeLoop, speed);
}

/* =========================================================
   10) PROJECT FILTERS
========================================================= */
function initProjectFilters() {
  if (!projectFilters) return;

  projectFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    document.querySelectorAll(".filter-btn").forEach((button) => {
      button.classList.remove("active");
    });

    btn.classList.add("active");
    currentProjectFilter = btn.dataset.filter;
    renderProjects();
  });
}

/* =========================================================
   11) CONTACT FORM VALIDATION
========================================================= */
function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "";

    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("contactMessage");

    let isValid = true;

    clearFieldError(nameInput);
    clearFieldError(emailInput);
    clearFieldError(messageInput);

    if (!nameInput.value.trim()) {
      setFieldError(nameInput, "Please enter your name.");
      isValid = false;
    }

    if (!emailInput.value.trim()) {
      setFieldError(emailInput, "Please enter your email.");
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      setFieldError(emailInput, "Please enter a valid email address.");
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      setFieldError(messageInput, "Please enter your message.");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      setFieldError(messageInput, "Message should be at least 10 characters.");
      isValid = false;
    }

    if (!isValid) return;

    formStatus.textContent =
      "Message validated successfully. This demo form is frontend-only.";
    contactForm.reset();
  });
}

function setFieldError(input, message) {
  const small = input.parentElement.querySelector(".error-msg");
  if (small) small.textContent = message;
}

function clearFieldError(input) {
  const small = input.parentElement.querySelector(".error-msg");
  if (small) small.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =========================================================
   12) SCROLL REVEAL
========================================================= */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function refreshRevealTargets() {
  // Re-apply visible class to dynamically added elements if already in viewport
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

/* =========================================================
   13) BACK TO TOP
========================================================= */
function initBackToTop() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* =========================================================
   14) ADMIN PANEL
========================================================= */
function initAdminPanel() {
  let secretClickCount = 0;
  let secretTimer;

  // Hidden trigger: click bottom-left invisible button 5 times quickly
  adminSecretTrigger.addEventListener("click", () => {
    secretClickCount++;

    clearTimeout(secretTimer);
    secretTimer = setTimeout(() => {
      secretClickCount = 0;
    }, 1800);

    if (secretClickCount >= 5) {
      secretClickCount = 0;
      openAdminModal();
    }
  });

  // Optional keyboard shortcut: Ctrl + Shift + K
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "k") {
      openAdminModal();
    }
  });

  adminCloseGate.addEventListener("click", closeAdminModal);
  adminCloseEditor.addEventListener("click", closeAdminModal);
  adminCancelBtn.addEventListener("click", closeAdminModal);
  closeAdminBtn.addEventListener("click", closeAdminModal);
  adminBackdrop.addEventListener("click", closeAdminModal);

  adminLoginBtn.addEventListener("click", handleAdminLogin);
  adminPassword.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAdminLogin();
  });

  adminTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchAdminTab(tab.dataset.tab));
  });

  addSkillBtn.addEventListener("click", addSkillCategory);
  addProjectBtn.addEventListener("click", addProject);
  addCertificateBtn.addEventListener("click", addCertificate);

  savePortfolioBtn.addEventListener("click", saveAdminChanges);
  resetPortfolioBtn.addEventListener("click", handleResetPortfolio);
}

function openAdminModal() {
  adminModal.classList.remove("hidden");
  body.classList.add("no-scroll");

  adminGate.classList.remove("hidden");
  adminEditor.classList.add("hidden");

  adminPassword.value = "";
  adminPasswordError.textContent = "";
  adminSaveStatus.textContent = "";
  adminPassword.focus();
}

function closeAdminModal() {
  adminModal.classList.add("hidden");
  body.classList.remove("no-scroll");
}

function handleAdminLogin() {
  if (adminPassword.value !== ADMIN_PASSWORD) {
    adminPasswordError.textContent = "Incorrect password.";
    return;
  }

  adminPasswordError.textContent = "";
  adminGate.classList.add("hidden");
  adminEditor.classList.remove("hidden");

  populateAdminForm();
  switchAdminTab("basic");
}

function switchAdminTab(tabName) {
  adminTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });

  adminTabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === `tab-${tabName}`);
  });
}

function populateAdminForm() {
  // Basic
  adminName.value = portfolioData.basic.name;
  adminRole.value = portfolioData.basic.role;
  adminHeroIntro.value = portfolioData.basic.heroIntro;

  // About
  adminAboutText.value = portfolioData.about.text;

  // Resume
  adminResumeLink.value = portfolioData.resume.link;
  adminResumeLabel.value = portfolioData.resume.label;

  // Education
  adminDegree.value = portfolioData.education.degree;
  adminCollege.value = portfolioData.education.college;
  adminUniversity.value = portfolioData.education.university;
  adminGraduation.value = portfolioData.education.graduation;

  // Contact
  adminEmail.value = portfolioData.contact.email;
  adminPhone.value = portfolioData.contact.phone;
  adminLocation.value = portfolioData.contact.location;
  adminLinkedIn.value = portfolioData.contact.linkedin;
  adminGitHub.value = portfolioData.contact.github;

  // Appearance
  adminAccentColor.value = portfolioData.appearance.accentColor || "#66a6ff";
  adminDefaultTheme.value = portfolioData.appearance.defaultTheme || "dark";

  renderAdminSkills();
  renderAdminProjects();
  renderAdminCertificates();
}

/* =========================
   ADMIN - SKILLS
========================= */
function renderAdminSkills() {
  adminSkillsContainer.innerHTML = "";

  portfolioData.skills.forEach((group, groupIndex) => {
    const wrapper = document.createElement("div");
    wrapper.className = "admin-item-card";

    const skillRows = group.items
      .map(
        (skill, skillIndex) => `
          <div class="skill-admin-row">
            <div class="form-group">
              <label>Category</label>
              <input
                type="text"
                value="${escapeAttribute(group.category)}"
                onchange="updateSkillCategory(${groupIndex}, this.value)"
              />
            </div>

            <div class="form-group">
              <label>Skill</label>
              <input
                type="text"
                value="${escapeAttribute(skill)}"
                onchange="updateSkillItem(${groupIndex}, ${skillIndex}, this.value)"
              />
            </div>

            <button class="btn btn-danger btn-sm" onclick="removeSkillItem(${groupIndex}, ${skillIndex})">
              Delete Skill
            </button>
          </div>
        `
      )
      .join("");

    wrapper.innerHTML = `
      <h5>Skill Category ${groupIndex + 1}</h5>
      ${skillRows}
      <div class="admin-item-actions">
        <button class="btn btn-secondary btn-sm" onclick="addSkillItem(${groupIndex})">
          + Add Skill
        </button>
        <button class="btn btn-danger btn-sm" onclick="removeSkillCategory(${groupIndex})">
          Remove Category
        </button>
      </div>
    `;

    adminSkillsContainer.appendChild(wrapper);
  });
}

function addSkillCategory() {
  portfolioData.skills.push({
    category: "New Category",
    items: ["New Skill"],
  });
  renderAdminSkills();
}

function removeSkillCategory(groupIndex) {
  portfolioData.skills.splice(groupIndex, 1);
  renderAdminSkills();
}

function addSkillItem(groupIndex) {
  portfolioData.skills[groupIndex].items.push("New Skill");
  renderAdminSkills();
}

function removeSkillItem(groupIndex, skillIndex) {
  portfolioData.skills[groupIndex].items.splice(skillIndex, 1);
  renderAdminSkills();
}

function updateSkillCategory(groupIndex, value) {
  portfolioData.skills[groupIndex].category = value.trim() || "Untitled Category";
}

function updateSkillItem(groupIndex, skillIndex, value) {
  portfolioData.skills[groupIndex].items[skillIndex] = value.trim() || "Unnamed Skill";
}

/* =========================
   ADMIN - PROJECTS
========================= */
function renderAdminProjects() {
  adminProjectsContainer.innerHTML = "";

  portfolioData.projects.forEach((project, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "admin-item-card";

    wrapper.innerHTML = `
      <h5>Project ${index + 1}</h5>

      <div class="admin-form-grid">
        <div class="form-group">
          <label>Title</label>
          <input
            type="text"
            value="${escapeAttribute(project.title)}"
            onchange="updateProjectField(${index}, 'title', this.value)"
          />
        </div>

        <div class="form-group">
          <label>Category</label>
          <input
            type="text"
            value="${escapeAttribute(project.category)}"
            onchange="updateProjectField(${index}, 'category', this.value)"
          />
        </div>

        <div class="form-group full">
          <label>Description</label>
          <textarea rows="4" onchange="updateProjectField(${index}, 'description', this.value)">${escapeHTML(
      project.description
    )}</textarea>
        </div>

        <div class="form-group">
          <label>GitHub Link</label>
          <input
            type="text"
            value="${escapeAttribute(project.github)}"
            onchange="updateProjectField(${index}, 'github', this.value)"
          />
        </div>

        <div class="form-group">
          <label>Live Demo Link</label>
          <input
            type="text"
            value="${escapeAttribute(project.demo)}"
            onchange="updateProjectField(${index}, 'demo', this.value)"
          />
        </div>

        <div class="form-group full">
          <label>Tech Stack (comma separated)</label>
          <input
            type="text"
            value="${escapeAttribute(project.techStack.join(', '))}"
            onchange="updateProjectTechStack(${index}, this.value)"
          />
        </div>

        <div class="form-group full">
          <label>Placeholder Image Label</label>
          <input
            type="text"
            value="${escapeAttribute(project.imageLabel || '')}"
            onchange="updateProjectField(${index}, 'imageLabel', this.value)"
          />
        </div>
      </div>

      <div class="admin-item-actions">
        <button class="btn btn-secondary btn-sm" onclick="moveProjectUp(${index})">Move Up</button>
        <button class="btn btn-secondary btn-sm" onclick="moveProjectDown(${index})">Move Down</button>
        <button class="btn btn-danger btn-sm" onclick="removeProject(${index})">Delete Project</button>
      </div>
    `;

    adminProjectsContainer.appendChild(wrapper);
  });
}

function addProject() {
  portfolioData.projects.push({
    id: generateId(),
    title: "New Project",
    description: "Add project description here.",
    techStack: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "#",
    category: "Web App",
    imageLabel: "Project Image",
  });

  renderAdminProjects();
}

function removeProject(index) {
  portfolioData.projects.splice(index, 1);
  renderAdminProjects();
}

function moveProjectUp(index) {
  if (index === 0) return;
  [portfolioData.projects[index - 1], portfolioData.projects[index]] = [
    portfolioData.projects[index],
    portfolioData.projects[index - 1],
  ];
  renderAdminProjects();
}

function moveProjectDown(index) {
  if (index >= portfolioData.projects.length - 1) return;
  [portfolioData.projects[index + 1], portfolioData.projects[index]] = [
    portfolioData.projects[index],
    portfolioData.projects[index + 1],
  ];
  renderAdminProjects();
}

function updateProjectField(index, field, value) {
  portfolioData.projects[index][field] = value.trim();
}

function updateProjectTechStack(index, value) {
  portfolioData.projects[index].techStack = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/* =========================
   ADMIN - CERTIFICATES
========================= */
function renderAdminCertificates() {
  adminCertificatesContainer.innerHTML = "";

  portfolioData.certificates.forEach((cert, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "admin-item-card";

    wrapper.innerHTML = `
      <h5>Certificate ${index + 1}</h5>
      <div class="admin-form-grid">
        <div class="form-group">
          <label>Certificate Title</label>
          <input
            type="text"
            value="${escapeAttribute(cert.title)}"
            onchange="updateCertificateField(${index}, 'title', this.value)"
          />
        </div>

        <div class="form-group">
          <label>Certificate Link</label>
          <input
            type="text"
            value="${escapeAttribute(cert.link || '#')}"
            onchange="updateCertificateField(${index}, 'link', this.value)"
          />
        </div>

        <div class="form-group full">
          <label>Certificate Note</label>
          <textarea rows="3" onchange="updateCertificateField(${index}, 'note', this.value)">${escapeHTML(
      cert.note || ""
    )}</textarea>
        </div>
      </div>

      <div class="admin-item-actions">
        <button class="btn btn-danger btn-sm" onclick="removeCertificate(${index})">
          Delete Certificate
        </button>
      </div>
    `;

    adminCertificatesContainer.appendChild(wrapper);
  });
}

function addCertificate() {
  portfolioData.certificates.push({
    id: generateId(),
    title: "New Certificate",
    link: "#",
    note: "Add a short note for this certificate.",
  });

  renderAdminCertificates();
}

function removeCertificate(index) {
  portfolioData.certificates.splice(index, 1);
  renderAdminCertificates();
}

function updateCertificateField(index, field, value) {
  portfolioData.certificates[index][field] = value.trim();
}

/* =========================
   ADMIN - SAVE / RESET
========================= */
function saveAdminChanges() {
  // Read static admin fields back into portfolioData
  portfolioData.basic.name = adminName.value.trim() || "Kunal Pandit";
  portfolioData.basic.role =
    adminRole.value.trim() || "Aspiring DevOps Engineer | Cloud & Full-Stack Developer";
  portfolioData.basic.heroIntro =
    adminHeroIntro.value.trim() ||
    "Computer Science undergraduate focused on DevOps, Cloud, and full-stack development.";

  // Keep avatar initials synced with name if desired
  portfolioData.basic.avatarText = getInitials(portfolioData.basic.name);

  portfolioData.about.text = adminAboutText.value.trim() || DEFAULT_PORTFOLIO.about.text;

  portfolioData.resume.link = adminResumeLink.value.trim() || "#";
  portfolioData.resume.label = adminResumeLabel.value.trim() || "Download Resume";

  portfolioData.education.degree =
    adminDegree.value.trim() || DEFAULT_PORTFOLIO.education.degree;
  portfolioData.education.college =
    adminCollege.value.trim() || DEFAULT_PORTFOLIO.education.college;
  portfolioData.education.university =
    adminUniversity.value.trim() || DEFAULT_PORTFOLIO.education.university;
  portfolioData.education.graduation =
    adminGraduation.value.trim() || DEFAULT_PORTFOLIO.education.graduation;

  portfolioData.contact.email =
    adminEmail.value.trim() || DEFAULT_PORTFOLIO.contact.email;
  portfolioData.contact.phone =
    adminPhone.value.trim() || DEFAULT_PORTFOLIO.contact.phone;
  portfolioData.contact.location =
    adminLocation.value.trim() || DEFAULT_PORTFOLIO.contact.location;
  portfolioData.contact.linkedin =
    adminLinkedIn.value.trim() || DEFAULT_PORTFOLIO.contact.linkedin;
  portfolioData.contact.github =
    adminGitHub.value.trim() || DEFAULT_PORTFOLIO.contact.github;

  portfolioData.appearance.accentColor =
    adminAccentColor.value || DEFAULT_PORTFOLIO.appearance.accentColor;
  portfolioData.appearance.defaultTheme =
    adminDefaultTheme.value || DEFAULT_PORTFOLIO.appearance.defaultTheme;

  savePortfolioData();
  renderPortfolio();
  initTypingEffect();

  adminSaveStatus.textContent = "Portfolio updated and saved to localStorage.";
  setTimeout(() => {
    adminSaveStatus.textContent = "";
  }, 2500);
}

function handleResetPortfolio() {
  const confirmed = confirm(
    "Reset all portfolio content back to default? This will overwrite saved local changes."
  );

  if (!confirmed) return;

  resetPortfolioData();
  renderPortfolio();
  populateAdminForm();
  initTypingEffect();

  // If there is no explicit saved theme after reset, use portfolio default
  localStorage.removeItem(THEME_KEY);
  applyThemeOnLoad();

  adminSaveStatus.textContent = "Portfolio reset to default.";
  setTimeout(() => {
    adminSaveStatus.textContent = "";
  }, 2500);
}

/* =========================================================
   15) GLOBAL ADMIN FUNCTIONS
   Exposed for inline onchange / onclick in admin dynamic HTML
========================================================= */
window.updateSkillCategory = updateSkillCategory;
window.updateSkillItem = updateSkillItem;
window.addSkillItem = addSkillItem;
window.removeSkillItem = removeSkillItem;
window.removeSkillCategory = removeSkillCategory;

window.updateProjectField = updateProjectField;
window.updateProjectTechStack = updateProjectTechStack;
window.removeProject = removeProject;
window.moveProjectUp = moveProjectUp;
window.moveProjectDown = moveProjectDown;

window.updateCertificateField = updateCertificateField;
window.removeCertificate = removeCertificate;

/* =========================================================
   16) UTILITIES
========================================================= */
function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function escapeHTML(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(str = "") {
  return escapeHTML(str);
}
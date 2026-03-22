// ===== Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== Scroll-based reveal (IntersectionObserver) =====
const revealElements = document.querySelectorAll(
  '.timeline-item, .project-card, .achievement-card, .arch-block'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => navObserver.observe(s));

// ===== GitHub Repos dynamic fetch (graceful fallback to static) =====
const GITHUB_USER = 'ramcreddy-ch';
const reposContainer = document.getElementById('repos-list');

// Language color map (subset)
const LANG_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Java: '#b07219',
  Go: '#00ADD8',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  HCL: '#844FBA',
  YAML: '#cb171e',
};

function buildRepoCard({ name, description, language, html_url, stargazers_count, forks_count }) {
  const langColor = LANG_COLORS[language] || '#8b949e';
  return `
    <a class="repo-card" href="${html_url}" target="_blank" rel="noopener noreferrer">
      <div class="repo-header">
        <span class="repo-icon">📦</span>
        <span class="repo-name">${name}</span>
      </div>
      <p class="repo-desc">${description || 'No description provided.'}</p>
      <div class="repo-meta">
        ${language ? `<span style="display:flex;align-items:center;gap:4px"><span class="repo-lang-dot" style="background:${langColor}"></span>${language}</span>` : ''}
        <span>⭐ ${stargazers_count}</span>
        <span>🍴 ${forks_count}</span>
      </div>
    </a>`;
}

async function loadRepos() {
  try {
    const resp = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12&type=public`
    );
    if (!resp.ok) throw new Error('API error');
    const repos = await resp.json();
    const filtered = repos.filter(r => !r.fork).slice(0, 9);
    if (filtered.length === 0) throw new Error('No repos');
    reposContainer.innerHTML = filtered.map(buildRepoCard).join('');
  } catch {
    // Fallback: render static known repos
    const staticRepos = [
      {
        name: 'jenkins-cicd-pipeline',
        description: 'End-to-end Jenkins CI/CD pipeline with SonarQube, JFrog Artifactory, Docker, and Kubernetes deployment.',
        language: 'Shell',
        html_url: `https://github.com/${GITHUB_USER}/jenkins-cicd-pipeline`,
        stargazers_count: 0,
        forks_count: 0,
      },
    ];
    reposContainer.innerHTML = staticRepos.map(buildRepoCard).join('');
    reposContainer.insertAdjacentHTML(
      'beforeend',
      `<a class="repo-card" href="https://github.com/${GITHUB_USER}?tab=repositories" target="_blank" rel="noopener noreferrer"
          style="justify-content:center;align-items:center;min-height:100px;border-style:dashed">
        <span style="color:var(--text-muted);font-family:var(--font-mono);font-size:0.85rem">
          View all repositories on GitHub →
        </span>
      </a>`
    );
  }
}

loadRepos();

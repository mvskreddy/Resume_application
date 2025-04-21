// THEME TOGGLE
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.createElement('span');
themeIcon.textContent = '🌙'; // Initial icon for dark mode
themeToggle.appendChild(themeIcon);

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
  const next =
    document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';

  // Add fade animation
  document.body.classList.add('theme-fade');
  setTimeout(() => {
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
    document.body.classList.remove('theme-fade');
  }, 150);
});

// Initialize theme on load
const initialTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', initialTheme);
updateThemeIcon(initialTheme);

// Add theme fade class (CSS needed)
const style = document.createElement('style');
style.innerHTML = `
  .theme-fade {
    transition: background 0.3s ease, color 0.3s ease;
  }
`;
document.head.appendChild(style);

// AOS INITIALIZATION
AOS.init({
  duration: 800,
  once: true,
});

// SET SKILL BAR LEVELS
document.querySelectorAll('.skill-bar').forEach((bar) => {
  const level = bar.getAttribute('data-level') || '0%';
  bar.style.setProperty('--level', level);

  // Add hover effect to show skill level
  const tooltip = document.createElement('span');
  tooltip.textContent = level;
  tooltip.style.cssText = `
    position: absolute;
    background: #333;
    color: #fff;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 4px;
    transform: translateY(-150%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  `;
  bar.style.position = 'relative';
  bar.appendChild(tooltip);

  bar.addEventListener('mouseenter', () => {
    tooltip.style.opacity = '1';
  });
  bar.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
  });
});

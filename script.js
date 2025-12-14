fetch("includes/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });

document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });

  targets.forEach((el) => observer.observe(el));

  // Skill hover title updater
  const skillTitle = document.getElementById('skill-hover-title');
  const skillIcons = document.querySelectorAll('.skill-icons-container img');
  if (skillTitle && skillIcons.length) {
    const defaultColor = getComputedStyle(skillTitle).color;
    let hideTimer = null;

    const show = (text, color) => {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
      skillTitle.textContent = text;
      skillTitle.style.color = color;
      requestAnimationFrame(() => { skillTitle.style.opacity = '1'; });
    };

    const hide = () => {
      skillTitle.style.opacity = '0';
      hideTimer = setTimeout(() => {
        skillTitle.textContent = '';
        skillTitle.style.color = defaultColor;
        hideTimer = null;
      }, 250);
    };

    skillIcons.forEach((icon) => {
      const name = icon.alt || 'Skill';
      const color = icon.dataset.color || defaultColor;
      icon.addEventListener('mouseenter', () => show(name, color));
      icon.addEventListener('focus', () => show(name, color));
      icon.addEventListener('mouseleave', hide);
      icon.addEventListener('blur', hide);
    });
  }
});




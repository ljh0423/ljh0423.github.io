// Get the theme toggle button and body element
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Check if there's a saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme); // Apply the saved theme to the body element
  themeToggleButton.textContent = savedTheme === 'dark-theme' ? '☀️' : '🌙';
} else {
  // If no saved theme, default to light theme
  body.classList.add('light-theme');
  themeToggleButton.textContent = '🌙'; // Set the button icon to moon for dark mode
}

// Event listener for the theme toggle button
themeToggleButton.addEventListener('click', () => {
  // Toggle between light and dark themes
  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeToggleButton.textContent = '☀️'; // Change the icon to sun for light mode
    localStorage.setItem('theme', 'dark-theme'); // Save the preference in localStorage
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeToggleButton.textContent = '🌙'; // Change the icon to moon for dark mode
    localStorage.setItem('theme', 'light-theme'); // Save the preference in localStorage
  }
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetElement = document.querySelector(this.getAttribute('href'));
    const navbarHeight = document.querySelector('nav').offsetHeight;

    window.scrollTo({
      top: targetElement.offsetTop - navbarHeight, // Adjust position based on navbar height
      behavior: 'smooth'
    });
  });
});


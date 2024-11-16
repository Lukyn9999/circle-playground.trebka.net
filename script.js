const themeToggleButton = document.getElementById('theme-toggle');

// Temporarily disable transitions
document.body.classList.add('no-transition');

// Check and apply the saved theme or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
} else if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

// Remove the no-transition class after the theme is applied
window.addEventListener('load', () => {
    document.body.classList.remove('no-transition');
});

// Toggle dark mode and save the user's choice
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

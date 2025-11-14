// Dark Mode Toggle Functionality
(function() {
    // SVG Icons
    const moonIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    `;
    
    const sunIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
    `;
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Function to apply theme
    function applyTheme() {
        const body = document.body;
        if (!body) return;
        
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
    }
    
    // Create dark mode toggle button
    function createDarkModeToggle() {
        const body = document.body;
        if (!body) {
            // Retry if body doesn't exist yet
            setTimeout(createDarkModeToggle, 10);
            return;
        }
        
        // Remove existing toggle if any
        const existingToggle = document.getElementById('darkModeToggle');
        if (existingToggle) {
            existingToggle.remove();
        }
        
        const toggle = document.createElement('button');
        toggle.className = 'dark-mode-toggle';
        toggle.id = 'darkModeToggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        
        const isLightMode = body.classList.contains('light-mode');
        toggle.innerHTML = `
            <span class="toggle-icon">${isLightMode ? sunIcon : moonIcon}</span>
            <span class="toggle-text">${isLightMode ? 'Light' : 'Dark'}</span>
        `;
        
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const currentBody = document.body;
            if (!currentBody) return;
            
            currentBody.classList.toggle('light-mode');
            const nowLightMode = currentBody.classList.contains('light-mode');
            localStorage.setItem('theme', nowLightMode ? 'light' : 'dark');
            
            // Update toggle icon and text
            const icon = toggle.querySelector('.toggle-icon');
            const text = toggle.querySelector('.toggle-text');
            if (icon && text) {
                icon.innerHTML = nowLightMode ? sunIcon : moonIcon;
                text.textContent = nowLightMode ? 'Light' : 'Dark';
            }
        });
        
        body.appendChild(toggle);
    }
    
    // Apply theme immediately if body exists, otherwise wait
    function init() {
        if (document.body) {
            applyTheme();
            createDarkModeToggle();
        } else {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    applyTheme();
                    createDarkModeToggle();
                });
            } else {
                // Fallback: retry after a short delay
                setTimeout(function() {
                    applyTheme();
                    createDarkModeToggle();
                }, 10);
            }
        }
    }
    
    // Initialize
    init();
})();

// Import styles
import '../sass/main.scss';

// Import modules
import './partial/external-link-norefer';
import './partial/format-tel-link';
import './partial/protect-image';
import './partial/responsive-table';
import './partial/watermark';

import './utilities/dom';
import './utilities/fade-out';
import './utilities/helpers';
import './utilities/replace-broken-image';
import './utilities/smooth-scroll';



// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Log initialization
    console.log('Webpack Frontend Starter Kit loaded!');
    
    // Add modal trigger listener if exists
    const modalTrigger = document.querySelector('.modal-trigger');
    if (modalTrigger) {
        modalTrigger.addEventListener('click', () => {
            // Create and show modal
            const modalContent = document.createElement('div');
            modalContent.className = 'modal';
            modalContent.innerHTML = 'Modal content here';
            document.body.appendChild(modalContent);
        });
    }
    
    // Add tabs functionality if exists
    const tabsContainer = document.querySelector('.tabs');
    if (tabsContainer) {
        const tabs = tabsContainer.querySelectorAll('.tab');
        const panels = tabsContainer.querySelectorAll('.tab-panel');
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                tab.classList.add('active');
                panels[index].classList.add('active');
            });
        });
    }
});

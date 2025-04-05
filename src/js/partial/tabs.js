// Tabs component
import { getElements, delegate } from '../utilities/dom';

export class Tabs {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            activeClass: 'active',
            onChange: () => {},
            ...options
        };
        
        this.tabs = getElements('[role="tab"]', this.container);
        this.panels = getElements('[role="tabpanel"]', this.container);
        
        this._init();
    }
    
    _init() {
        // Set initial active tab
        const activeTab = this.container.querySelector(`[role="tab"].${this.options.activeClass}`) 
            || this.tabs[0];
        this._switchTab(activeTab);
        
        // Add click event listener
        delegate(this.container, 'click', '[role="tab"]', (event, tab) => {
            event.preventDefault();
            this._switchTab(tab);
        });
        
        // Add keyboard navigation
        this.container.addEventListener('keydown', (event) => {
            const target = event.target;
            if (target.getAttribute('role') === 'tab') {
                let newTab;
                
                switch (event.key) {
                    case 'ArrowLeft':
                        newTab = this._getPreviousTab();
                        break;
                    case 'ArrowRight':
                        newTab = this._getNextTab();
                        break;
                    default:
                        return;
                }
                
                if (newTab) {
                    event.preventDefault();
                    this._switchTab(newTab);
                    newTab.focus();
                }
            }
        });
    }
    
    _switchTab(tab) {
        // Remove active class from all tabs and panels
        this.tabs.forEach(t => {
            t.classList.remove(this.options.activeClass);
            t.setAttribute('aria-selected', 'false');
            t.tabIndex = -1;
        });
        
        this.panels.forEach(p => {
            p.classList.remove(this.options.activeClass);
            p.hidden = true;
        });
        
        // Add active class to selected tab and panel
        tab.classList.add(this.options.activeClass);
        tab.setAttribute('aria-selected', 'true');
        tab.tabIndex = 0;
        
        const panelId = tab.getAttribute('aria-controls');
        const panel = this.container.querySelector(`#${panelId}`);
        if (panel) {
            panel.classList.add(this.options.activeClass);
            panel.hidden = false;
        }
        
        // Call onChange callback
        this.options.onChange(tab, panel);
    }
    
    _getPreviousTab() {
        const currentTab = this.container.querySelector(`[role="tab"][aria-selected="true"]`);
        const currentIndex = Array.from(this.tabs).indexOf(currentTab);
        return this.tabs[currentIndex - 1] || this.tabs[this.tabs.length - 1];
    }
    
    _getNextTab() {
        const currentTab = this.container.querySelector(`[role="tab"][aria-selected="true"]`);
        const currentIndex = Array.from(this.tabs).indexOf(currentTab);
        return this.tabs[currentIndex + 1] || this.tabs[0];
    }
    
    destroy() {
        this.container = null;
        this.tabs = null;
        this.panels = null;
    }
}

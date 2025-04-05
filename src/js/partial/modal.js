// Modal component
import { getElement, delegate } from '../utilities/dom';

export class Modal {
    constructor(options = {}) {
        this.options = {
            closeOnEscape: true,
            closeOnOverlayClick: true,
            onOpen: () => {},
            onClose: () => {},
            ...options
        };
        
        this.modal = null;
        this.overlay = null;
        this.isOpen = false;
        
        this._handleEscapeKey = this._handleEscapeKey.bind(this);
    }
    
    create(content) {
        // Create modal element
        this.modal = document.createElement('div');
        this.modal.className = 'modal';
        this.modal.innerHTML = `
            <div class="modal__content">
                <button class="modal__close" type="button">&times;</button>
                <div class="modal__body">${content}</div>
            </div>
        `;
        
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal__overlay';
        
        // Add event listeners
        this._addEventListeners();
        
        return this;
    }
    
    open() {
        if (this.isOpen) return;
        
        // Append to body
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.modal);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add active class
        setTimeout(() => {
            this.modal.classList.add('modal--active');
            this.overlay.classList.add('modal__overlay--active');
        }, 10);
        
        this.isOpen = true;
        this.options.onOpen();
        
        return this;
    }
    
    close() {
        if (!this.isOpen) return;
        
        // Remove active class
        this.modal.classList.remove('modal--active');
        this.overlay.classList.remove('modal__overlay--active');
        
        // Remove elements after animation
        setTimeout(() => {
            document.body.removeChild(this.modal);
            document.body.removeChild(this.overlay);
            document.body.style.overflow = '';
        }, 300);
        
        this.isOpen = false;
        this.options.onClose();
        
        return this;
    }
    
    _addEventListeners() {
        // Close button click
        this.modal.querySelector('.modal__close').addEventListener('click', () => this.close());
        
        // Overlay click
        if (this.options.closeOnOverlayClick) {
            this.overlay.addEventListener('click', () => this.close());
        }
        
        // Escape key
        if (this.options.closeOnEscape) {
            document.addEventListener('keydown', this._handleEscapeKey);
        }
    }
    
    _handleEscapeKey(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
    
    destroy() {
        if (this.isOpen) {
            this.close();
        }
        
        document.removeEventListener('keydown', this._handleEscapeKey);
        this.modal = null;
        this.overlay = null;
    }
}

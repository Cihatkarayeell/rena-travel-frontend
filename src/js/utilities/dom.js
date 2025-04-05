// DOM utility functions

/**
 * Get element by selector
 * @param {string} selector - CSS selector
 * @returns {Element|null}
 */
export const getElement = (selector) => document.querySelector(selector);

/**
 * Get all elements by selector
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
export const getElements = (selector) => document.querySelectorAll(selector);

/**
 * Create element with attributes and content
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {string|Element} content - Element content
 * @returns {Element}
 */
export const createElement = (tag, attributes = {}, content = '') => {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    
    // Set content
    if (content instanceof Element) {
        element.appendChild(content);
    } else {
        element.textContent = content;
    }
    
    return element;
};

/**
 * Add event listener with delegation
 * @param {Element} element - Parent element
 * @param {string} eventType - Event type
 * @param {string} selector - CSS selector for child elements
 * @param {Function} handler - Event handler
 */
export const delegate = (element, eventType, selector, handler) => {
    element.addEventListener(eventType, (event) => {
        const target = event.target.closest(selector);
        if (target && element.contains(target)) {
            handler(event, target);
        }
    });
};

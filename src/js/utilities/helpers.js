// Helper utility functions

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function}
 */
export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit time in milliseconds
 * @returns {Function}
 */
export const throttle = (func, limit = 300) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

/**
 * Format date
 * @param {Date|string} date - Date to format
 * @param {string} format - Date format (e.g., 'dd/mm/yyyy')
 * @returns {string}
 */
export const formatDate = (date, format = 'dd/mm/yyyy') => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    return format
        .replace('dd', day)
        .replace('mm', month)
        .replace('yyyy', year);
};

/**
 * Generate random ID
 * @param {number} length - ID length
 * @returns {string}
 */
export const generateId = (length = 8) => {
    return Math.random().toString(36).substring(2, length + 2);
};

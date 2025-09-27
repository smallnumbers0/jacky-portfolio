export const domHelpers = {
  /**
   * Get a single element by ID with type safety
   */
  getElementById<T extends HTMLElement = HTMLElement>(id: string): T | null {
    return document.getElementById(id) as T | null;
  },

  /**
   * Get a single element by selector with type safety
   */
  querySelector<T extends Element = Element>(selector: string): T | null {
    return document.querySelector(selector) as T | null;
  },

  /**
   * Get multiple elements by selector with type safety
   */
  querySelectorAll<T extends Element = Element>(selector: string): T[] {
    return Array.from(document.querySelectorAll(selector)) as T[];
  },

  /**
   * Set multiple style properties on an element
   */
  setStyles(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
    Object.assign(element.style, styles);
  },

  /**
   * Toggle element visibility
   */
  toggleDisplay(element: HTMLElement, show?: boolean): void {
    if (show === undefined) {
      show = element.style.display === 'none';
    }
    element.style.display = show ? 'block' : 'none';
  },

  /**
   * Add/remove CSS classes
   */
  toggleClass(element: HTMLElement, className: string, force?: boolean): void {
    element.classList.toggle(className, force);
  },

  /**
   * Safe JSON parsing for element datasets
   */
  parseDataset<T = any>(element: HTMLElement, key: string): T | null {
    try {
      const data = element.dataset[key];
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn(`Error parsing dataset.${key}:`, error);
      return null;
    }
  },

  /**
   * Create and append element with attributes
   */
  createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    attributes?: Partial<HTMLElementTagNameMap[K]>,
    parent?: HTMLElement
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement(tagName);

    if (attributes) {
      Object.assign(element, attributes);
    }

    if (parent) {
      parent.appendChild(element);
    }

    return element;
  }
};
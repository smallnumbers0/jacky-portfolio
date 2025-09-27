export interface EventListener<T = any> {
  element: HTMLElement | Document | Window;
  event: string;
  handler: (event: T) => void;
  options?: AddEventListenerOptions;
}

export class EventManager {
  private listeners: EventListener[] = [];

  /**
   * Add event listener and track it for cleanup
   */
  addEventListener<K extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    event: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    options?: AddEventListenerOptions
  ): void;
  addEventListener<K extends keyof DocumentEventMap>(
    element: Document,
    event: K,
    handler: (event: DocumentEventMap[K]) => void,
    options?: AddEventListenerOptions
  ): void;
  addEventListener<K extends keyof WindowEventMap>(
    element: Window,
    event: K,
    handler: (event: WindowEventMap[K]) => void,
    options?: AddEventListenerOptions
  ): void;
  addEventListener(
    element: HTMLElement | Document | Window,
    event: string,
    handler: (event: any) => void,
    options?: AddEventListenerOptions
  ): void {
    element.addEventListener(event, handler, options);

    this.listeners.push({
      element,
      event,
      handler,
      options
    });
  }

  /**
   * Remove specific event listener
   */
  removeEventListener(
    element: HTMLElement | Document | Window,
    event: string,
    handler: (event: any) => void
  ): void {
    element.removeEventListener(event, handler);

    this.listeners = this.listeners.filter(
      listener => !(
        listener.element === element &&
        listener.event === event &&
        listener.handler === handler
      )
    );
  }

  /**
   * Remove all tracked event listeners
   */
  removeAllListeners(): void {
    this.listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });

    this.listeners = [];
  }

  /**
   * Get count of tracked listeners
   */
  getListenerCount(): number {
    return this.listeners.length;
  }
}
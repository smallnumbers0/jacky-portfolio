import { FilterManager } from './filter-manager';
import { SortManager, type SortOption } from './sort-manager';
import { domHelpers } from '../utils/dom-helpers';
import { EventManager } from '../utils/event-manager';

export interface PageElements {
  projectsGrid: HTMLElement;
  emptyState: HTMLElement;
  resultsSummary: HTMLElement;
  visibleCount: HTMLElement;
  clearButton: HTMLElement;
  categoryFilter?: HTMLSelectElement;
  techFilter?: HTMLSelectElement;
  searchFilter?: HTMLInputElement;
  sortFilter?: HTMLSelectElement;
}

export class ProjectsPageController {
  private filterManager!: FilterManager;
  private sortManager!: SortManager;
  private eventManager: EventManager;
  private elements: PageElements;
  private totalProjects: number;

  constructor() {
    this.eventManager = new EventManager();
    this.elements = this.getElements();
    this.totalProjects = this.elements.projectsGrid.children.length;

    this.initializeManagers();
    this.setupEventListeners();
    this.initialize();
  }

  /**
   * Clean up all event listeners
   */
  destroy(): void {
    this.eventManager.removeAllListeners();
  }

  /**
   * Get all required DOM elements
   */
  private getElements(): PageElements {
    const projectsGrid = domHelpers.getElementById('projects-grid');
    const emptyState = domHelpers.getElementById('empty-state');
    const resultsSummary = domHelpers.getElementById('results-summary');
    const visibleCount = domHelpers.getElementById('visible-count');
    const clearButton = domHelpers.getElementById('clear-filters');

    if (!projectsGrid || !emptyState || !resultsSummary || !visibleCount || !clearButton) {
      throw new Error('Required page elements not found');
    }

    return {
      projectsGrid,
      emptyState,
      resultsSummary,
      visibleCount,
      clearButton,
      categoryFilter: domHelpers.getElementById<HTMLSelectElement>('category') || undefined,
      techFilter: domHelpers.getElementById<HTMLSelectElement>('tech') || undefined,
      searchFilter: domHelpers.getElementById<HTMLInputElement>('search') || undefined,
      sortFilter: domHelpers.getElementById<HTMLSelectElement>('sort') || undefined,
    };
  }

  /**
   * Initialize filter and sort managers
   */
  private initializeManagers(): void {
    const projects = Array.from(this.elements.projectsGrid.children) as HTMLElement[];

    this.filterManager = new FilterManager(projects, (count) => {
      this.updateResultsDisplay(count);
    });

    this.sortManager = new SortManager(this.elements.projectsGrid, projects);
  }

  /**
   * Set up all event listeners
   */
  private setupEventListeners(): void {
    // Filter controls
    if (this.elements.categoryFilter) {
      this.eventManager.addEventListener(this.elements.categoryFilter, 'change', (e) => {
        this.filterManager.updateFilter('category', (e.target as HTMLSelectElement).value);
      });
    }

    if (this.elements.techFilter) {
      this.eventManager.addEventListener(this.elements.techFilter, 'change', (e) => {
        this.filterManager.updateFilter('tech', (e.target as HTMLSelectElement).value);
      });
    }

    if (this.elements.searchFilter) {
      this.eventManager.addEventListener(this.elements.searchFilter, 'input', (e) => {
        this.filterManager.updateFilter('search', (e.target as HTMLInputElement).value);
      });
    }

    // Sort controls
    if (this.elements.sortFilter) {
      this.eventManager.addEventListener(this.elements.sortFilter, 'change', (e) => {
        const sortOption = (e.target as HTMLSelectElement).value as SortOption;
        this.sortManager.sortBy(sortOption);
        this.filterManager.updateFilter('search', this.filterManager.getFilterState().search); // Re-apply filters
      });
    }

    // Clear filters button
    this.eventManager.addEventListener(this.elements.clearButton, 'click', () => {
      this.clearFilters();
    });

    // Status radio buttons
    const statusRadios = domHelpers.querySelectorAll<HTMLInputElement>('input[name="status"]');
    statusRadios.forEach(radio => {
      this.eventManager.addEventListener(radio, 'change', (e) => {
        if ((e.target as HTMLInputElement).checked) {
          this.filterManager.updateFilter('status', (e.target as HTMLInputElement).value);
        }
      });
    });
  }

  /**
   * Update the results display based on visible count
   */
  private updateResultsDisplay(visibleCount: number): void {
    this.elements.visibleCount.textContent = visibleCount.toString();

    if (visibleCount === 0) {
      domHelpers.setStyles(this.elements.resultsSummary, { display: 'none' });
      domHelpers.setStyles(this.elements.emptyState, { display: 'block' });
    } else {
      domHelpers.setStyles(this.elements.resultsSummary, { display: 'block' });
      domHelpers.setStyles(this.elements.emptyState, { display: 'none' });
    }
  }

  /**
   * Clear all filters and reset to defaults
   */
  private clearFilters(): void {
    this.filterManager.clearFilters();

    // Reset sort to featured
    if (this.elements.sortFilter) {
      this.elements.sortFilter.value = 'featured';
      this.sortManager.sortBy('featured');
    }
  }

  /**
   * Initialize the page with default state
   */
  private initialize(): void {
    // Set default sort to featured
    this.sortManager.sortBy('featured');

    // Apply initial filters (will show all projects)
    this.filterManager.clearFilters();

    console.log(`🎯 Projects page initialized with ${this.totalProjects} projects`);
  }

  /**
   * Get current filter and sort state (useful for debugging)
   */
  getState() {
    return {
      filters: this.filterManager.getFilterState(),
      totalProjects: this.totalProjects,
      visibleProjects: this.elements.visibleCount.textContent,
      eventListeners: this.eventManager.getListenerCount()
    };
  }
}
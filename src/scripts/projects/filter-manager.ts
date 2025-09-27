export interface FilterState {
  category: string;
  tech: string;
  status: string;
  search: string;
}

export interface ProjectData {
  title: string;
  oneLiner: string;
  category: string;
  tech: string[];
  status: string;
  tags?: string[];
  [key: string]: any;
}

export class FilterManager {
  private state: FilterState;
  private projects: HTMLElement[];
  private onFilterChange: (visibleCount: number) => void;

  constructor(projects: HTMLElement[], onChange: (count: number) => void) {
    this.projects = projects;
    this.onFilterChange = onChange;
    this.state = {
      category: 'all',
      tech: 'all',
      status: 'all',
      search: ''
    };
  }

  /**
   * Update a specific filter and apply all filters
   */
  updateFilter(key: keyof FilterState, value: string): void {
    this.state[key] = value;
    this.applyFilters();
  }

  /**
   * Clear all filters and reset to defaults
   */
  clearFilters(): void {
    this.state = {
      category: 'all',
      tech: 'all',
      status: 'all',
      search: ''
    };
    this.syncUIWithState();
    this.applyFilters();
  }

  /**
   * Get current filter state
   */
  getFilterState(): FilterState {
    return { ...this.state };
  }

  /**
   * Apply all current filters to projects
   */
  private applyFilters(): void {
    let visibleCount = 0;

    this.projects.forEach(project => {
      const isVisible = this.matchesAllFilters(project);
      project.style.display = isVisible ? 'block' : 'none';
      if (isVisible) visibleCount++;
    });

    this.onFilterChange(visibleCount);
  }

  /**
   * Check if a project matches all current filters
   */
  private matchesAllFilters(project: HTMLElement): boolean {
    try {
      const projectData = JSON.parse(project.dataset.project || '{}') as ProjectData;

      return this.matchesCategory(projectData) &&
             this.matchesTech(projectData) &&
             this.matchesStatus(projectData) &&
             this.matchesSearch(projectData);
    } catch (error) {
      console.warn("Error parsing project data:", error);
      return true; // Show project if data is invalid
    }
  }

  /**
   * Check if project matches category filter
   */
  private matchesCategory(data: ProjectData): boolean {
    return this.state.category === 'all' || data.category === this.state.category;
  }

  /**
   * Check if project matches tech filter
   */
  private matchesTech(data: ProjectData): boolean {
    if (this.state.tech === 'all') return true;
    return Array.isArray(data.tech) && data.tech.includes(this.state.tech);
  }

  /**
   * Check if project matches status filter
   */
  private matchesStatus(data: ProjectData): boolean {
    return this.state.status === 'all' || data.status === this.state.status;
  }

  /**
   * Check if project matches search query
   */
  private matchesSearch(data: ProjectData): boolean {
    if (!this.state.search) return true;

    const searchQuery = this.state.search.toLowerCase();
    const searchableText = [
      data.title?.toLowerCase() || '',
      data.oneLiner?.toLowerCase() || '',
      ...(data.tags?.map(tag => tag.toLowerCase()) || [])
    ].join(' ');

    return searchableText.includes(searchQuery);
  }

  /**
   * Sync UI form controls with current filter state
   */
  private syncUIWithState(): void {
    // Update category filter
    const categoryFilter = document.getElementById('category') as HTMLSelectElement;
    if (categoryFilter) categoryFilter.value = this.state.category;

    // Update tech filter
    const techFilter = document.getElementById('tech') as HTMLSelectElement;
    if (techFilter) techFilter.value = this.state.tech;

    // Update search filter
    const searchFilter = document.getElementById('search') as HTMLInputElement;
    if (searchFilter) searchFilter.value = this.state.search;

    // Update status radio buttons
    const statusRadio = document.querySelector(`input[name="status"][value="${this.state.status}"]`) as HTMLInputElement;
    if (statusRadio) statusRadio.checked = true;
  }
}
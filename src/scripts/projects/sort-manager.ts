export type SortOption = 'featured' | 'date' | 'complexity';

export interface ProjectData {
  featured?: boolean;
  date: string;
  complexity: 'light' | 'medium' | 'deep';
  [key: string]: any;
}

export class SortManager {
  private projects: HTMLElement[];
  private container: HTMLElement;

  constructor(container: HTMLElement, projects: HTMLElement[]) {
    this.container = container;
    this.projects = [...projects]; // Create a copy to avoid mutation
  }

  /**
   * Sort projects by the specified option
   */
  sortBy(option: SortOption): void {
    const sorted = [...this.projects].sort((a, b) => {
      try {
        const projectA = JSON.parse(a.dataset.project || '{}') as ProjectData;
        const projectB = JSON.parse(b.dataset.project || '{}') as ProjectData;

        return this.compareProjects(projectA, projectB, option);
      } catch (error) {
        console.warn("Error parsing project data for sorting:", error);
        return 0;
      }
    });

    // Update the container with sorted projects
    this.container.innerHTML = '';
    sorted.forEach(project => this.container.appendChild(project));

    // Update our internal array reference
    this.projects = sorted;
  }

  /**
   * Update the projects array (useful after filtering)
   */
  updateProjects(projects: HTMLElement[]): void {
    this.projects = [...projects];
  }

  /**
   * Get current projects array
   */
  getProjects(): HTMLElement[] {
    return [...this.projects];
  }

  /**
   * Compare two projects based on the sort option
   */
  private compareProjects(a: ProjectData, b: ProjectData, option: SortOption): number {
    switch (option) {
      case 'featured':
        return this.compareFeatured(a, b);

      case 'date':
        return this.compareDate(a, b);

      case 'complexity':
        return this.compareComplexity(a, b);

      default:
        return 0;
    }
  }

  /**
   * Compare by featured status, then by date
   */
  private compareFeatured(a: ProjectData, b: ProjectData): number {
    const featuredA = a.featured ? 1 : 0;
    const featuredB = b.featured ? 1 : 0;
    const featuredDiff = featuredB - featuredA;

    // If featured status is the same, sort by date
    if (featuredDiff === 0) {
      return this.compareDate(a, b);
    }

    return featuredDiff;
  }

  /**
   * Compare by date (newest first)
   */
  private compareDate(a: ProjectData, b: ProjectData): number {
    try {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    } catch (error) {
      console.warn("Error comparing dates:", error);
      return 0;
    }
  }

  /**
   * Compare by complexity (deep > medium > light)
   */
  private compareComplexity(a: ProjectData, b: ProjectData): number {
    const complexityOrder: Record<string, number> = {
      light: 1,
      medium: 2,
      deep: 3
    };

    const complexityA = complexityOrder[a.complexity] || 0;
    const complexityB = complexityOrder[b.complexity] || 0;

    return complexityB - complexityA;
  }
}
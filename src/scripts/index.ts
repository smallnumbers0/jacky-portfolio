// Utility modules
export { domHelpers } from './utils/dom-helpers';
export { EventManager } from './utils/event-manager';

// Project modules
export { FilterManager } from './projects/filter-manager';
export { SortManager } from './projects/sort-manager';
export { ProjectsPageController } from './projects/projects-page';

// Theme modules
export { ThemeManager, themeManager } from '../utils/theme-manager';

// Types
export type { FilterState, ProjectData } from './projects/filter-manager';
export type { SortOption } from './projects/sort-manager';
export type { Theme, ThemeChangeEvent } from '../utils/theme-manager';
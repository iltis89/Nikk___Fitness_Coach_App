import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DashboardWidget {
  id: string;
  type: 'stats' | 'chart' | 'list' | 'calendar' | 'quick-actions';
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  isResizable?: boolean;
  isDraggable?: boolean;
  component: string;
  config?: any;
}

interface DashboardLayoutState {
  widgets: DashboardWidget[];
  isEditMode: boolean;
  gridCols: number;
  rowHeight: number;
  setWidgets: (widgets: DashboardWidget[]) => void;
  toggleEditMode: () => void;
  updateWidget: (id: string, updates: Partial<DashboardWidget>) => void;
  addWidget: (widget: DashboardWidget) => void;
  removeWidget: (id: string) => void;
  resetLayout: () => void;
}

const defaultWidgets: DashboardWidget[] = [
  {
    id: 'stats-1',
    type: 'stats',
    title: 'Kunden Statistiken',
    x: 0,
    y: 0,
    w: 12,
    h: 2,
    component: 'StatsGrid',
    minW: 6,
    minH: 2,
  },
  {
    id: 'appointments-1',
    type: 'list',
    title: 'Heutige Termine',
    x: 0,
    y: 2,
    w: 6,
    h: 4,
    component: 'AppointmentsList',
    minW: 4,
    minH: 3,
  },
  {
    id: 'activities-1',
    type: 'list',
    title: 'Letzte Aktivitäten',
    x: 6,
    y: 2,
    w: 6,
    h: 4,
    component: 'RecentActivities',
    minW: 4,
    minH: 3,
  },
  {
    id: 'chart-1',
    type: 'chart',
    title: 'Fortschritte diese Woche',
    x: 0,
    y: 6,
    w: 8,
    h: 4,
    component: 'ProgressChart',
    minW: 4,
    minH: 3,
  },
  {
    id: 'quick-actions-1',
    type: 'quick-actions',
    title: 'Schnellaktionen',
    x: 8,
    y: 6,
    w: 4,
    h: 4,
    component: 'QuickActions',
    minW: 3,
    minH: 3,
  },
];

export const useDashboardLayout = create<DashboardLayoutState>()(
  persist(
    (set) => ({
      widgets: defaultWidgets,
      isEditMode: false,
      gridCols: 12,
      rowHeight: 60,
      
      setWidgets: (widgets) => set({ widgets }),
      
      toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
      
      updateWidget: (id, updates) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, ...updates } : w
          ),
        })),
        
      addWidget: (widget) =>
        set((state) => ({
          widgets: [...state.widgets, widget],
        })),
        
      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
        })),
        
      resetLayout: () => set({ widgets: defaultWidgets }),
    }),
    {
      name: 'dashboard-layout',
    }
  )
);
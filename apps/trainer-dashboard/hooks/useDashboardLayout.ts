import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DashboardWidget {
  id: string;
  type: 'stats' | 'chart' | 'list' | 'calendar' | 'quick-actions' | 'insights' | 'revenue';
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
  // Primary focus area - Today's appointments (left column)
  {
    id: 'appointments-1',
    type: 'list',
    title: 'Heutige Termine',
    x: 0,
    y: 0,
    w: 5,
    h: 5,
    component: 'AppointmentsList',
    minW: 4,
    minH: 4,
  },
  // Quick actions - positioned for easy access (center-top)
  {
    id: 'quick-actions-1',
    type: 'quick-actions',
    title: 'Schnellaktionen',
    x: 5,
    y: 0,
    w: 4,
    h: 3,
    component: 'QuickActions',
    minW: 3,
    minH: 2,
  },
  // Compact stats - key metrics at a glance (right-top)
  {
    id: 'stats-1',
    type: 'stats',
    title: 'Kunden Statistiken',
    x: 9,
    y: 0,
    w: 3,
    h: 3,
    component: 'StatsGrid',
    minW: 3,
    minH: 3,
  },
  // Revenue tracking - business critical (center-bottom)
  {
    id: 'revenue-1',
    type: 'revenue',
    title: 'Umsatz',
    x: 5,
    y: 3,
    w: 7,
    h: 2,
    component: 'RevenueWidget',
    minW: 4,
    minH: 2,
  },
];

export const useDashboardLayout = create<DashboardLayoutState>()(
  persist(
    (set) => ({
      widgets: defaultWidgets,
      isEditMode: false,
      gridCols: 12,
      rowHeight: 80,
      
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
import { DashboardWidgetRelationInterface } from "../../..";

export interface DashboardInterface {
  id: string;
  name: string;
  source: string;
  layout: Layout[];
  widgets: string[];
}

interface Layout {
  /**
   * A string corresponding to a widget id.
   */
  i: string;

  /**
   * X position in grid units.
   */
  x: number;

  /**
   * Y position in grid units.
   */
  y: number;

  /**
   * Width in grid units.
   */
  w: number;

  /**
   * Height in grid units.
   */
  h: number;

  /**
   * Minimum width in grid units.
   */
  minW?: number;

  /**
   * Maximum width in grid units.
   */
  maxW?: number;

  /**
   * Minimum height in grid units.
   */
  minH?: number;

  /**
   * Maximum height in grid units.
   */
  maxH?: number;

  /**
   * set by DragEvents (onDragStart, onDrag, onDragStop) and ResizeEvents (onResizeStart, onResize, onResizeStop)
   */
  moved?: boolean;

  /**
   * If true, equal to `isDraggable: false` and `isResizable: false`.
   */
  static?: boolean;

  /**
   * If false, will not be draggable. Overrides `static`.
   */
  isDraggable?: boolean;

  /**
   * If false, will not be resizable. Overrides `static`.
   */
  isResizable?: boolean;
}

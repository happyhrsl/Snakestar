// Purpose: Responsive breakpoints and orientation hooks
// Used by layout components, game HUD, and panels

// Breakpoint thresholds (matches Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,   // Mobile landscape / small tablet
  md: 768,   // Tablet portrait
  lg: 1024,  // Tablet landscape / small desktop
  xl: 1280,  // Desktop
} as const;

// Purpose: Get current breakpoint name from window width
export function getBreakpoint(width: number): string {
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "xs";
}

// Purpose: Check if viewport is mobile (below tablet)
export function isMobile(width: number): boolean {
  return width < BREAKPOINTS.md;
}

// Purpose: Check if viewport is in portrait orientation
export function isPortrait(width: number, height: number): boolean {
  return height > width;
}

// Purpose: Get game canvas size based on viewport
export function getCanvasSize(width: number, height: number): { w: number; h: number } {
  return { w, h: height };
}

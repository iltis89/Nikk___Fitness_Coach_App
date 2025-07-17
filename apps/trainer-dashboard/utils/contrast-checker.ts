/**
 * WCAG Contrast Checker für Dark Mode
 * Basierend auf WCAG 2.1 Guidelines
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Konvertiert Hex zu RGB
 */
function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Berechnet die relative Luminanz nach WCAG
 */
function getLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Berechnet das Kontrastverhältnis zwischen zwei Farben
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) {
    throw new Error('Invalid color format');
  }
  
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Prüft ob Kontrast WCAG AA Standards erfüllt
 */
export function meetsWCAGAA(ratio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Prüft ob Kontrast WCAG AAA Standards erfüllt
 */
export function meetsWCAGAAA(ratio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Dark Mode Farben für Tests
 */
export const darkModeColors = {
  // Backgrounds
  bgPrimary: '#0a0a1e',     // Dunkelblau
  bgCard: '#14192d',        // rgb(20,25,45)
  
  // Text
  textPrimary: '#f4f4f6',   // Off-white
  textSecondary: '#d1d1d6', // Light gray
  textMuted: '#9898a3',     // Muted gray
  
  // Success (Nikks Grün)
  success: '#34c759',       // Success-400
  successMuted: 'rgba(52, 199, 89, 0.7)',
  
  // Accent
  primary: '#38bdf8',       // Primary-400
  warning: '#cca300',       // Desaturated yellow
  error: '#f87171',         // Error-400
};

/**
 * Test alle wichtigen Farbkombinationen
 */
export function testDarkModeContrast() {
  const tests = [
    { bg: darkModeColors.bgPrimary, fg: darkModeColors.textPrimary, name: 'Primary Text on BG' },
    { bg: darkModeColors.bgPrimary, fg: darkModeColors.textSecondary, name: 'Secondary Text on BG' },
    { bg: darkModeColors.bgCard, fg: darkModeColors.textPrimary, name: 'Primary Text on Card' },
    { bg: darkModeColors.bgPrimary, fg: darkModeColors.success, name: 'Success on BG' },
    { bg: darkModeColors.bgPrimary, fg: darkModeColors.primary, name: 'Primary on BG' },
    { bg: darkModeColors.bgPrimary, fg: darkModeColors.warning, name: 'Warning on BG' },
    { bg: darkModeColors.bgPrimary, fg: darkModeColors.error, name: 'Error on BG' },
  ];
  
  const results = tests.map(test => {
    const ratio = getContrastRatio(test.bg, test.fg);
    return {
      ...test,
      ratio: ratio.toFixed(2),
      meetsAA: meetsWCAGAA(ratio),
      meetsAAA: meetsWCAGAAA(ratio),
    };
  });
  
  return results;
}
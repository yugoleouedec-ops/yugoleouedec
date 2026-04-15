import type { HairType } from "./types";

export const themeColors = {
  // Backgrounds
  bgPrimary: '#2C1810',
  bgSecondary: '#F5F1E8',
  bgOverlay: 'rgba(44, 24, 16, 0.85)',

  // Textes
  textPrimary: '#FFFFFF',
  textSecondary: '#E8DFC8',
  textDark: '#1A1A1A',
  textMuted: '#9CA3AF',

  // Accents
  accentOrange: '#E8742F',
  accentBeige: '#D4C5A0',
  accentGold: '#C9A66B',

  // Validations
  successGreen: '#2D5016',
  warningAmber: '#F59E0B',
  errorRed: '#DC2626',

  // Bordures
  borderLight: 'rgba(255, 255, 255, 0.1)',
  borderDark: 'rgba(0, 0, 0, 0.1)',
} as const;

export interface HairTheme {
  gradient: string;
  accentColor: string;
  accentHover: string;
  cardBg: string;
}

export const hairThemes: Record<HairType, HairTheme> = {
  lisses: {
    gradient: 'linear-gradient(135deg, #2C1810 0%, #4A2C1A 50%, #6B3E2A 100%)',
    accentColor: '#E8742F',
    accentHover: '#F5884A',
    cardBg: 'rgba(232, 116, 47, 0.1)',
  },
  ondules: {
    gradient: 'linear-gradient(135deg, #3A2617 0%, #5C3D28 50%, #7D5A3D 100%)',
    accentColor: '#C9A66B',
    accentHover: '#D4B57F',
    cardBg: 'rgba(201, 166, 107, 0.1)',
  },
  boucles: {
    gradient: 'linear-gradient(135deg, #4A1F0A 0%, #6B2F14 50%, #8C3F1E 100%)',
    accentColor: '#F59E0B',
    accentHover: '#FBBF24',
    cardBg: 'rgba(245, 158, 11, 0.1)',
  },
  crepus: {
    gradient: 'linear-gradient(135deg, #1C0F08 0%, #2E1A10 50%, #402518 100%)',
    accentColor: '#8B5A3C',
    accentHover: '#A67C5B',
    cardBg: 'rgba(139, 90, 60, 0.1)',
  },
  "semi-lisses": {
    gradient: 'linear-gradient(135deg, #3D2E1F 0%, #5A4A36 50%, #78654D 100%)',
    accentColor: '#D4C5A0',
    accentHover: '#E0D5B8',
    cardBg: 'rgba(212, 197, 160, 0.1)',
  },
};

export function getThemeForType(type: HairType | null): HairTheme {
  if (!type) return hairThemes.lisses;
  return hairThemes[type];
}

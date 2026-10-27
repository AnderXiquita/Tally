import { Platform, type TextStyle } from 'react-native';

// Familias y pesos embebidos en el APK (app.json → plugin expo-font).
// La interfaz solo usa 400 y 500; el 600 es exclusivo del logo.
type Family = 'sans' | 'mono';
type Weight = 400 | 500 | 600;

// Android registra cada familia con un nombre y elige el archivo según `fontWeight`.
// iOS identifica cada archivo por su nombre PostScript, así que ahí el peso va en el nombre.
const ANDROID_FAMILY: Record<Family, string> = { sans: 'Geist', mono: 'GeistMono' };
const IOS_POSTSCRIPT: Record<Family, Partial<Record<Weight, string>>> = {
  sans: { 400: 'Geist-Regular', 500: 'Geist-Medium', 600: 'Geist-SemiBold' },
  mono: { 400: 'GeistMono-Regular', 500: 'GeistMono-Medium' },
};

// Toda la app pide sus fuentes por aquí: cambiar de tipografía es cambiar solo este archivo.
export function fontFace(family: Family, weight: Weight): TextStyle {
  const fontWeight = String(weight) as TextStyle['fontWeight'];
  return Platform.select<TextStyle>({
    ios: { fontFamily: IOS_POSTSCRIPT[family][weight] },
    default: {
      fontFamily: ANDROID_FAMILY[family],
      fontWeight,
    },
  });
}

// Escala tipográfica (skill de diseño, sección 5). Tamaño / interlineado en dp.
export const typography = {
  display: { ...fontFace('sans', 500), fontSize: 34, lineHeight: 40 },
  title: { ...fontFace('sans', 500), fontSize: 24, lineHeight: 30 },
  heading: { ...fontFace('sans', 500), fontSize: 18, lineHeight: 24 },
  body: { ...fontFace('sans', 400), fontSize: 15, lineHeight: 22 },
  callout: { ...fontFace('sans', 400), fontSize: 13, lineHeight: 18 },

  // Mono: todo número que cambie en vivo (cada dígito ocupa el mismo ancho y no "baila").
  dataLg: { ...fontFace('mono', 500), fontSize: 28, lineHeight: 32 },
  data: { ...fontFace('mono', 400), fontSize: 13, lineHeight: 16 },

  // Etiqueta técnica: máximo una por sección. Tracking de 0.12em = 11 × 0.12.
  label: {
    ...fontFace('mono', 500),
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.32,
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;

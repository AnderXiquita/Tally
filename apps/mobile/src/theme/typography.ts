import { Platform, type TextStyle } from 'react-native';

import { LOGO } from './logo';

type Family = 'sans' | 'mono';
type Weight = 400 | 500 | 600;

const ANDROID_FAMILY: Record<Family, string> = { sans: 'Geist', mono: 'GeistMono' };
const IOS_POSTSCRIPT: Record<Family, Partial<Record<Weight, string>>> = {
  sans: { 400: 'Geist-Regular', 500: 'Geist-Medium', 600: 'Geist-SemiBold' },
  mono: { 400: 'GeistMono-Regular', 500: 'GeistMono-Medium' },
};

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

export const typography = {
  editorial: {
    ...fontFace('sans', 500),
    fontSize: 44,
    lineHeight: 38,
    letterSpacing: -1.5,
  },
  display: { ...fontFace('sans', 500), fontSize: 34, lineHeight: 40 },
  title: { ...fontFace('sans', 500), fontSize: 24, lineHeight: 30 },
  heading: { ...fontFace('sans', 500), fontSize: 18, lineHeight: 24 },
  body: { ...fontFace('sans', 400), fontSize: 15, lineHeight: 22 },
  callout: { ...fontFace('sans', 400), fontSize: 13, lineHeight: 18 },
  button: { ...fontFace('sans', 500), fontSize: 15, lineHeight: 20 },

  code: { ...fontFace('mono', 500), fontSize: 44, lineHeight: 52, letterSpacing: 2 },
  dataLg: { ...fontFace('mono', 500), fontSize: 28, lineHeight: 32 },
  data: { ...fontFace('mono', 400), fontSize: 13, lineHeight: 16 },

  logo: {
    ...fontFace('sans', LOGO.weight),
    fontSize: LOGO.fontSize,
    lineHeight: LOGO.fontSize * LOGO.lineHeight,
  },

  label: {
    ...fontFace('mono', 500),
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.32,
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;

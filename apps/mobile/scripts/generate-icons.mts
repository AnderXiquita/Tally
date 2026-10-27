// Genera el ícono y el splash de Tally (SVG fuente + PNG que usa Expo): la palabra "Tally"
// en Geist con el punto tally.
// Uso, desde apps/mobile: pnpm icons
// Después de correrlo hay que recompilar la app (el ícono y el splash son parte de la capa nativa).

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { Resvg } from '@resvg/resvg-js';
import opentype from 'opentype.js';

import { LOGO, LOGO_HEIGHT, LOGO_WIDTH } from '../src/theme/logo.ts';

// Los mismos valores que los tokens de la app (skill de diseño, sección 4).
const COLORS = {
  canvas: '#000000',
  accent: '#EDE6D6',
  live: '#D0101C',
};

const WORD = 'Tally';
const ASSETS = join(import.meta.dirname, '..', 'assets');
const FONT_FILE = join(ASSETS, 'fonts', 'Geist-SemiBold.ttf');

// Medidas en unidades de la fuente (1000 por em). La altura de mayúscula de Geist es 710.
const CAP_HEIGHT = 710;
// Ancho del tronco de la T en Geist 600: base para el tamaño del punto y su separación.
const STEM = 130;
const DOT_RADIUS = (STEM * 1.3) / 2;
const DOT_GAP = STEM * 0.35;

const SIZE = 1024;

// Ancho total de la marca (palabra + punto) en px dentro del lienzo de 1024.
const WIDTH_FULL = 760; // ícono completo (iOS y respaldo): ~74 % del lienzo
const WIDTH_ADAPTIVE = 560; // capa frontal de Android: queda dentro del círculo seguro (61 % central)

const font = opentype.loadSync(FONT_FILE);

// Splash: el mismo logo que dibuja la app (ui/logo.tsx), con las medidas de theme/logo.ts.
// Expo coloca la imagen como un cuadrado de SPLASH_DP de lado, centrado en pantalla
// (`imageWidth` del plugin expo-splash-screen en app.json: deben coincidir).
const SPLASH_DP = 200;
const SPLASH_FONT_FILE = join(ASSETS, 'fonts', 'Geist-Medium.ttf'); // LOGO.weight = 500
const splashFont = opentype.loadSync(SPLASH_FONT_FILE);

function splashLogo(): string {
  const px = SIZE / SPLASH_DP; // píxeles de la imagen por cada dp
  const f = LOGO.fontSize;
  // Caja del logo centrada en el cuadro, igual que la centra la animación en pantalla.
  const left = (SPLASH_DP - LOGO_WIDTH) / 2;
  const top = (SPLASH_DP - LOGO_HEIGHT) / 2;
  // La línea base queda a `ascender` del borde superior de la línea de texto.
  const text = splashFont.getPath(LOGO.word, left * px, (top + f * LOGO.ascender) * px, f * px);
  const r = (f * LOGO.dotSize) / 2;
  const cx = left + f * (LOGO.advance + LOGO.dotGap) + r;
  const cy = top + f * LOGO.capTop + r;
  return (
    `<path d="${text.toPathData(2)}" fill="${COLORS.accent}"/>` +
    `<circle cx="${(cx * px).toFixed(2)}" cy="${(cy * px).toFixed(2)}" r="${(r * px).toFixed(2)}" fill="${COLORS.live}"/>`
  );
}

type Colors = { text: string; dot: string };

// La palabra y el punto, centrados en el lienzo.
function mark(width: number, colors: Colors): string {
  // Línea base en y = 0; la fuente dibuja hacia arriba con y negativa.
  const text = font.getPath(WORD, 0, 0, 1000);
  const box = text.getBoundingBox();

  // El punto va arriba a la derecha de la última letra, alineado con la altura de mayúscula.
  const dotX = box.x2 + DOT_GAP + DOT_RADIUS;
  const dotY = -CAP_HEIGHT + DOT_RADIUS;
  const totalWidth = dotX + DOT_RADIUS - box.x1;
  const scale = width / totalWidth;

  // Centrado óptico: se centra la franja entre la línea base y la altura de mayúscula.
  // El rabo de la "y" cuelga por debajo, como en cualquier logo de texto.
  const offsetX = SIZE / 2 - scale * (box.x1 + totalWidth / 2);
  const offsetY = SIZE / 2 + (scale * CAP_HEIGHT) / 2;

  return (
    `<g transform="translate(${offsetX.toFixed(2)} ${offsetY.toFixed(2)}) scale(${scale.toFixed(5)})">` +
    `<path d="${text.toPathData(2)}" fill="${colors.text}"/>` +
    `<circle cx="${dotX.toFixed(2)}" cy="${dotY.toFixed(2)}" r="${DOT_RADIUS.toFixed(2)}" fill="${colors.dot}"/>` +
    `</g>`
  );
}

function svg(body: string, background?: string): string {
  const rect = background
    ? `  <rect width="${SIZE}" height="${SIZE}" fill="${background}"/>\n`
    : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">\n` +
    `${rect}  ${body}\n</svg>\n`
  );
}

function png(source: string): Buffer {
  return new Resvg(source, { fitTo: { mode: 'width', value: SIZE } }).render().asPng();
}

const brand = { text: COLORS.accent, dot: COLORS.live };
const white = { text: '#FFFFFF', dot: '#FFFFFF' };

const icon = svg(mark(WIDTH_FULL, brand), COLORS.canvas);
const foreground = svg(mark(WIDTH_ADAPTIVE, brand));
const monochrome = svg(mark(WIDTH_ADAPTIVE, white));
const background = svg('', COLORS.canvas);

const brandDir = join(ASSETS, 'brand');
const imagesDir = join(ASSETS, 'images');
mkdirSync(brandDir, { recursive: true });

writeFileSync(join(brandDir, 'icon.svg'), icon);
writeFileSync(join(brandDir, 'icon-foreground.svg'), foreground);
writeFileSync(join(brandDir, 'icon-monochrome.svg'), monochrome);

writeFileSync(join(imagesDir, 'icon.png'), png(icon));
writeFileSync(join(imagesDir, 'android-icon-foreground.png'), png(foreground));
writeFileSync(join(imagesDir, 'android-icon-monochrome.png'), png(monochrome));
writeFileSync(join(imagesDir, 'android-icon-background.png'), png(background));
// El splash muestra el logo fijo; la animación de entrada arranca desde ese mismo logo.
writeFileSync(join(brandDir, 'splash.svg'), svg(splashLogo()));
writeFileSync(join(imagesDir, 'splash-icon.png'), png(svg(splashLogo())));

console.log('Íconos generados en assets/brand y assets/images.');

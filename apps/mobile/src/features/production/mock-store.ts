import { useSyncExternalStore } from 'react';

import { generateMockCode } from './code';

// SIMULADO: estado de la transmisión del anfitrión mientras no exista el backend.
// Lo comparten las pantallas del flujo (cámara, sumar cámaras, salir al aire, control).
// Cuando exista el backend, este archivo se reemplaza: el servidor es la fuente de verdad.

export type Orientation = 'landscape' | 'portrait';
export type Quality = '720p' | '1080p';
export type Platform = 'facebook' | 'youtube' | 'twitch' | 'rtmp';

export type MockProduction = {
  name: string;
  code: string;
  orientation: Orientation;
  quality: Quality;
  platform: Platform | null;
  liveSince: number | null; // marca de tiempo al salir al aire; null = no está al aire
};

let production: MockProduction | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function createMockProduction(input: {
  name: string;
  orientation: Orientation;
  quality: Quality;
}) {
  production = { ...input, code: generateMockCode(), platform: null, liveSince: null };
  emit();
}

export function goLiveMock(platform: Platform) {
  if (!production) return;
  production = { ...production, platform, liveSince: Date.now() };
  emit();
}

export function endLiveMock() {
  if (!production) return;
  production = { ...production, liveSince: null };
  emit();
}

export function useMockProduction(): MockProduction | null {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => production,
  );
}

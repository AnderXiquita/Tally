// SIMULADO: mientras no exista el backend, el código se genera en el teléfono.
// El backend lo generará con aleatoriedad criptográfica (crypto.randomInt), como pide la skill
// de seguridad; Math.random no es seguro para códigos reales.

// Sin caracteres que se confunden al dictar o leer: 0/O, 1/I/L.
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

export function generateMockCode(): string {
  return Array.from(
    { length: 6 },
    () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)],
  ).join('');
}

// "K7M4QX" → "K7M · 4QX": dos grupos de tres, fácil de dictar por teléfono.
export function formatCode(code: string): string {
  return `${code.slice(0, 3)} · ${code.slice(3)}`;
}

// Nombre por defecto si el director no escribe uno: "Producción del 27 oct".
export function defaultProductionName(date = new Date()): string {
  const day = date.toLocaleDateString('es', { day: 'numeric', month: 'short' }).replace('.', '');
  return `Producción del ${day}`;
}

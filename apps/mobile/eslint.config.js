// Configuración de ESLint de la app móvil (formato "flat config", el que usa Expo desde el SDK 53).
const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  globalIgnores(['dist/*', 'android/*', 'ios/*', '.expo/*']),
  expoConfig,
  // Reporta como error lo que no cumple el formato de Prettier (.prettierrc en la raíz).
  prettierRecommended,
  {
    rules: {
      // Con `nodeLinker: hoisted` se puede importar un paquete que no está en package.json
      // y funciona por accidente. Esta regla lo detecta (CLAUDE.md, sección 7.6).
      'import/no-extraneous-dependencies': [
        'error',
        {
          packageDir: [__dirname],
          // Las dependencias de desarrollo solo se permiten en scripts y archivos de configuración.
          devDependencies: ['scripts/**', '*.config.js'],
        },
      ],
    },
  },
]);

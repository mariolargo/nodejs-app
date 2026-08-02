import js from '@eslint/js'
import globals from 'globals'
import pluginJest from 'eslint-plugin-jest'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist/', 'build/', 'node_modules/', '**/temp.js'],
  },
  {
    files: ['**/*.{js,mjs,cjs}', 'tests/**/*', '**/*.test.js', '**/*.spec.js'],
    plugins: { js, jest: pluginJest },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
])

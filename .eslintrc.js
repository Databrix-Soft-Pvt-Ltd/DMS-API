module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: [
    'eslint-config-prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/explicit-module-boundary-types': 1,
    '@typescript-eslint/no-unused-vars': 2,
    'no-console': 1,
    'import/order': 2,
    '@typescript-eslint/semi': [2],
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: ['src/setupTests.js', '**/*.test.js'],
      },
    ],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
        printWidth: 100,
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'always',
        proseWrap: 'always',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['warn'],
  },
};

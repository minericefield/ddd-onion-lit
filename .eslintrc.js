module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/member-ordering": "error",
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '(^_|^type$|^request$)' },
    ],
     "import/no-restricted-paths": [
      "error",
      {
        "zones": [
          {
            "target": "./src/domain",
            "from": ["./src/application, ./src/infrastructure", "./src/presentation"],
          },
          {
            "target": "./src/application",
            "from": ["./src/infrastructure", "./src/presentation"],
          },
          {
            "target": "./src/infrastructure",
            "from": ["./src/presentation"],
          },
          {
            "target": "./src/presentation",
            "from": ["./src/infrastructure"],
          },
        ]
      }
    ],
     'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", "d.ts"],
      }
    }
  },
};

const problematicFiles = [
  'src/main.ts',
];

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    // 'eslint:recommended', // too much error for now
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
    mocha: true,
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    'max-lines': [2, { max: 500, skipBlankLines: true, skipComments: true }], // 300 is default, breakdown file if it's larger
    'max-lines-per-function': ['error', { max: 150, skipBlankLines: true, skipComments: true, IIFEs: true }], // 150 is a good start?
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/camelcase': ['off', { properties: 'never', ignoreDestructuring: true }],
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-duplicate-imports': ['error', { includeExports: true }],
    '@typescript-eslint/interface-name-prefix': 'off',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
        },
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
          // NOTE: member-sorting not supported https://github.com/benmosher/eslint-plugin-import/issues/1670
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@nestjs/**',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: [],
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  overrides: [
    {
      files: [...problematicFiles],
      rules: {
        'max-lines': ['warn'],
        'max-lines-per-function': ['warn'],
      },
    },
    {
      files: ['test/**/*', 'src/**/*.spec.ts'], // allow some test to have more freedom
      rules: {
        'max-lines': ['warn', { max: 5000, skipBlankLines: true, skipComments: true }],
        'max-lines-per-function': ['warn', { max: 500, skipBlankLines: true, skipComments: true, IIFEs: true }],
      },
    },
  ],
};

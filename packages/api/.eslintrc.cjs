module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['prettier', 'standard-with-typescript'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['./.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
        project: false
      }
    }
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './*/tsconfig.json']
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false
      }
    ]
  }
}




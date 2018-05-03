module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2, {'SwitchCase': 1}],
    'linebreak-style': ['error', 'unix'],
    'no-unused-expressions': 0,
    'space-before-function-paren': 0,
    'no-console': process.env.STATS === 'dist' ? 'error' : 'off',
    'no-debugger': process.env.STATS === 'dist' ? 'error' : 'off',
  },
  globals: {
    'document': true,
    'window': true,
  },
  env: {
    browser: true, // browser global variables.
    node: true, // Node.js global variables and Node.js scoping.
  },
}

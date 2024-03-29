module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // 函数名和参数列表之间的空格
    'space-before-function-paren': ['error', {
      // 匿名函数必须要空格
      'anonymous': 'always',
      // 具名函数必须不要空格
      'named': 'never'
    }]
  }
}

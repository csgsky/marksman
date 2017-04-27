module.exports = {
  'extends': 'standard',
  'plugins': [
    'standard',
    'promise',
    'react',
    'json',
  ],
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      "experimentalObjectRestSpread": true
    }
  },
  'env': {
    'browser': true,
    'node': true,
    'commonjs': true,
    'meteor': true,
    'mongo': true,
    'jquery': true,
    'amd': true
  },
  'settings': {
    'react': {
      'pragma': 'React',  // Pragma to use, default to "React"
      'version': '15.4.2' // React version, default to the latest React stable release
    }
  },
  'rules': {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-confusing-arrow': 'off'
  }
}
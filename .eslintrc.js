module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "airbnb-base"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module",
    "project": './tsconfig.eslint.json',
    "extraFileExtensions": ['.vue']
  },
  "settings": {
    "import/extensions": ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "project": './tsconfig.json'
      },
      "node": {
        "extensions": ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  "plugins": [
    "vue",
    "@typescript-eslint",
    "import"
  ],
  "rules": {
    "no-console": "off",
    "no-shadow": "off",
    "no-unused-vars": "off",
    "linebreak-style": ["off", "error", "windows"],
    "import/no-extraneous-dependencies": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "vue/no-unused-components": "off"
  }
}

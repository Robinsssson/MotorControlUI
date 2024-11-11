// eslint.config.mjs

import { builtinModules } from 'module';

export default [
  {
    files: ["**/*.js"],  // 适用于所有 JS 文件

    languageOptions: {
      ecmaVersion: 2021,             // 指定 ECMAScript 版本
      sourceType: "module",          // 模块系统类型
      globals: {                     // 手动定义全局变量
        ...builtinModules.reduce((globals, name) => {
          globals[name] = "readonly";
          return globals;
        }, {}),
        window: "readonly",          // 浏览器环境
        document: "readonly",
        console: "readonly"
      },
    },

    rules: {
      "semi": ["error", "always"],    // 强制使用分号
      "quotes": ["error", "single"],  // 强制使用单引号
      "no-unused-vars": ["warn"],     // 警告未使用的变量
      "no-console": "off"             // 允许 console 语句
    }
  }
];

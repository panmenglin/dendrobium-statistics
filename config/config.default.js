/* eslint valid-jsdoc: "off" */

'use strict';

const DBConfig = require('./datebase');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1602563517982_3208';

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.security = {
    csrf: {
      headerName: 'x-csrf-token', // 自定义请求头
    },
  };

  // mysql 配置
  config.mysql = DBConfig();

  // add your middleware config here
  config.middleware = [ 'requestHandler',
  ];

  console.requestHandler = {
    match: '/api',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};


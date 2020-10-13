'use strict';

// /** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },

  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
};


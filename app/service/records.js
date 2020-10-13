'use strict';

const Service = require('egg').Service;

class TopicService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  // 根据 blockKey 查询统计信息
  async index(params) {
    const { blockKey } = params;

    const addNum = await this.app.mysql.query(
      'SELECT COUNT(`id`) AS "num" FROM records WHERE `blockKey` = "button" AND `type` = "add"'
    );
    const updateNum = await this.app.mysql.query(
      'SELECT COUNT(`id`) AS "num" FROM records WHERE `blockKey` = "button" AND `type` = "update"'
    );

    return {
      blockKey,
      install: addNum[0].num,
      update: updateNum[0].num,
    };

    // return {
    //   code: 200,
    //   data: {
    //     blockKey,
    //     install: addNum[0].num,
    //     update: updateNum[0].num,
    //   },
    //   msg: '执行成功！',
    //   success: true,
    // };
  }

  // 创建组件操作记录
  async create(params) {
    const result = await this.app.mysql.insert('records', {
      blockKey: params.blockKey,
      blockName: params.blockName,
      type: params.type,
      message: params.message,
      wareHouse: params.wareHouse,
    });

    if (result) {
      return true;
      // {
      //   code: 201,
      //   data: true,
      //   msg: '执行成功！',
      //   success: true,
      // };
    }

    return false;
    // {
    //   code: 500,
    //   data: false,
    //   msg: '执行失败！',
    //   success: false,
    // };
  }

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg =
        result.data && result.data.error_msg
          ? result.data.error_msg
          : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      // 远程调用返回格式错误
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }
}

module.exports = TopicService;

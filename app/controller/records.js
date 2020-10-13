'use strict';

const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const getStatistics = {
  blockKey: 'string',
};

const createRecord = {
  type: 'string',
  message: 'string',
  wareHouse: 'string',
  blockName: 'string',
  blockKey: 'string',
  other: 'string',
};

class CreateRecordController extends Controller {
  // 根据 blockKey 查询统计信息
  async index() {
    const ctx = this.ctx;

    ctx.validate(getStatistics, ctx.query);

    ctx.body = await ctx.service.records.index(ctx.query);

    ctx.status = 200;
  }

  // 创建组件操作记录
  async create() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRecord, ctx.request.body);

    // // 调用 service 创建一个 topic
    ctx.body = await ctx.service.records.create(ctx.request.body);

    ctx.status = 201;
  }
}

module.exports = CreateRecordController;

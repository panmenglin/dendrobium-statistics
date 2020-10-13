'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/records.test.js', () => {
  let ctx;

  beforeEach(() => {
    // 创建一个匿名的 context 对象，可以在 ctx 对象上调用 service 的方法
    ctx = app.mockContext();
  });

  // 查询
  describe('index()', () => {
    // it('should create failed by accesstoken error', async () => {
    //   try {
    //     await ctx.service.topics.create({
    //       accesstoken: 'hello',
    //       title: 'title',
    //       content: 'content',
    //     });
    //   } catch (err) {
    //     assert(err.status === 401);
    //     assert(err.message === '错误的accessToken');
    //     return;
    //   }
    //   throw 'should not run here';
    // });

    it('should find success', async () => {
      const result = await ctx.service.records.index({
        blockKey: 'button',
      });
      assert(result.install > 0);
    });
  });

  // 创建
  describe('create()', () => {
    it('should create success', async () => {
      const result = await ctx.service.records.create({
        type: 'update',
        message: '更新按钮',
        wareHouse: 'https://xxx',
        blockName: '按钮',
        blockKey: 'button',
        other: '其他信息',
      });
      assert(result === true);
    });
  });
});

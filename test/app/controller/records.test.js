'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/records.test.js', () => {
  // 测试请求参数错误时应用的响应
  it('should GET /api/v2/records/ 404', () => {
    app.mockCsrf();
    return app
      .httpRequest()
      .get('/api/v2/records')
      .send({})
      .expect(422)
      .expect({
        error: 'Validation Failed',
        detail: [
          {
            message: 'required',
            field: 'blockKey',
            code: 'missing_field',
          },
        ],
      });
  });

  // mock 掉 service 层，测试正常时的返回
  it('should GET /api/v2/records/ 200', () => {
    app.mockCsrf();
    app.mockService('records', 'index', {
      blockKey: 'button',
      install: 2,
      update: 1,
    });

    return app
      .httpRequest()
      .get('/api/v2/records?blockKey=button')
      .send({})
      .expect(200)
      .expect({
        code: 200,
        data: {
          blockKey: 'button',
          install: 2,
          update: 1,
        },
        msg: '执行成功！',
        success: true,
      });
  });

  // 测试请求参数错误时应用的响应
  it('should POST /api/v2/records/ 422', () => {
    app.mockCsrf();
    return app
      .httpRequest()
      .post('/api/v2/records')
      .send({})
      .expect(422)
      .expect({
        error: 'Validation Failed',
        detail: [
          {
            message: 'required',
            field: 'type',
            code: 'missing_field',
          },
          {
            message: 'required',
            field: 'message',
            code: 'missing_field',
          },
          {
            message: 'required',
            field: 'wareHouse',
            code: 'missing_field',
          },
          {
            message: 'required',
            field: 'blockName',
            code: 'missing_field',
          },
          {
            message: 'required',
            field: 'blockKey',
            code: 'missing_field',
          },
          {
            message: 'required',
            field: 'other',
            code: 'missing_field',
          },
        ],
      });
  });

  // mock 掉 service 层，测试正常时的返回
  it('should POST /api/v2/records/ 201', () => {
    app.mockCsrf();
    app.mockService('records', 'create', true);

    return app
      .httpRequest()
      .post('/api/v2/records')
      .send({
        type: 'update',
        message: '更新按钮',
        wareHouse: 'https://xxx',
        blockName: '按钮',
        blockKey: 'button',
        other: '其他信息',
      })
      .expect(201)
      .expect({
        code: 201,
        data: true,
        msg: '执行成功！',
        success: true,
      });
  });
});

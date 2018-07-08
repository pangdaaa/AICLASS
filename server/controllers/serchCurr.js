const { mysql } = require('../qcloud')
const debug = require('debug')('koa-weapp-demo')
const { message: { checkSignature } } = require('../qcloud')

/**
 * 响应 GET 请求 取用户数据 
 */
async function get(ctx, next) {

  let ctx_query = ctx.query;


  //找 正在签到的课程
  const information = await mysql('currData').where('className1', ctx_query.data).andWhere(function () {
    this.where('signState', '>', 0)
  }).orWhere('className2', ctx_query.data).andWhere(function () {
    this.where('signState', '>', 0)
  }).orWhere('className3', ctx_query.data).andWhere(function () {
    this.where('signState', '>', 0)
  }).orWhere('className4', ctx_query.data).andWhere(function () {
    this.where('signState', '>', 0)
  }).orWhere('className5', ctx_query.data).andWhere(function () {
    this.where('signState', '>', 0)
  })



  ctx.state.data = information


}


/**
 * 响应 POST 请求 存用户数据 
 */
async function post(ctx, next) {


}


module.exports = {
  post,
  get
}








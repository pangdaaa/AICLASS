const { mysql } = require('../qcloud')
const debug = require('debug')('koa-weapp-demo')
const { message: { checkSignature } } = require('../qcloud')

/**
 * 响应 GET 请求 取用户数据 
 */
async function get(ctx, next) {

  let ctx_query = ctx.query;

  // ctx.body = ctx_query

  const information = await mysql('currData').where('className1', ctx_query.data).orWhere('className2', ctx_query.data).orWhere('className3', ctx_query.data).orWhere('className4', ctx_query.data).orWhere('className5', ctx_query.data)

  

  ctx.state.data = information
  //ctx.body = information

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








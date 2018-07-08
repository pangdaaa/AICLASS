const { mysql } = require('../qcloud')
const debug = require('debug')('koa-weapp-demo')
const { message: { checkSignature } } = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function get(ctx, next) {

  let ctx_query = ctx.query;

  // ctx.body = ctx_query

  const information = await mysql('informationData').where('openid', ctx_query.data)

  ctx.state.data = information
  //ctx.body = information

}

async function post(ctx, next) {


  // // let pastData = await parsePostData(ctx);
  // // ctx.body = pastData;

  // // 检查签名，确认是微信发出的请求
  // const { signature, timestamp, nonce } = ctx.query
  // if (!checkSignature(signature, timestamp, nonce)) ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'

  // /**
  //  * 解析微信发送过来的请求体
  //  * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
  //  */
  // const body = ctx.request.body

  // let name = body.age
  // let school = body.name

  // await mysql('userRegister').insert({ school: school, name: name, stunum: '14060610', tel: '1885252152' })

  // ctx.body = 'success'
}


module.exports = {
  post,
  get
}
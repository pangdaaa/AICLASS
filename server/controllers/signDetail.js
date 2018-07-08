const { mysql } = require('../qcloud')
const debug = require('debug')('koa-weapp-demo')
const { message: { checkSignature } } = require('../qcloud')

/**
 * 响应 GET 请求 取用户数据 
 */
async function get(ctx, next) {

  let ctx_query = ctx.query;

  let currName = ctx_query.currName
  let className = ctx_query.className

  var information = currName + ' ' + className

  // //统计人数
  // let tmp = await mysql(information).count('openid')
  // let count = JSON.stringify(tmp)
  //获取学生签到信息
  const studata = await mysql(information).select('*')

  // //获取学生用户信息
  // for (var i = 0; i < studata.length; i++) {
  //   let openid = studata[i].openid
  //   const userinfo = await mysql('cSessionInfo').where('open_id', openid).select('user_info')
  // }



  //JSON.parse()  JSON.stringify()
  ctx.state.data = studata

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








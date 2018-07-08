const { mysql } = require('../qcloud')
const debug = require('debug')('koa-weapp-demo')
const { message: { checkSignature } } = require('../qcloud')

/**
 * 响应 GET 请求 取用户数据 
 */
async function get(ctx, next) {

  let ctx_query = ctx.query;
  var reqData = ''

  var openid = ctx_query.openid
  var currName = ctx_query.currName
  var className = ctx_query.className
  var frontRate = ctx_query.frontRate //bool   影响frontRateTimes
  var signState = ctx_query.signState //0.未签到 1.签到成功 2.地理位置偏移 3.偏移很大 4.三次未签到 影响unbelieve、credit
  var unbelieve = ctx_query.unbelieve // bool  影响credit


  var information = currName + ' ' + className
 
 //计算签到次数
  var tmpsignTimes = await mysql(information).where('openid', openid).select('signTimes')
  var signTimes = tmpsignTimes[0].signTimes + 1

//防止重复签到
  var tmpSignState = await mysql(information).where('openid', openid).select('signState')
  var tmpSignState_t = await mysql('currData').where('currName', currName).select('signState')

  if (tmpSignState[0].signState === 0 && (!(tmpSignState_t[0].signState === 0))){
    //更新数据
    const reqInfo = await mysql(information).where('openid', openid).update({
      signTimes: signTimes,
      signState: signState,
      updated_at: mysql.fn.now(),
    })

   reqData = await mysql(information).where('openid', openid)

  } else if (tmpSignState_t[0].signState === 0){
   reqData = 'Repeat sign'
  }


// //更新数据
//   const reqInfo = await mysql(information).where('openid', openid).update({
//     signTimes: signTimes,
//     signState: signState,
//     updated_at: mysql.fn.now(),
//   })

  // const reqData = await mysql(information).where('openid', openid)
  
  ctx.state.data = reqData
  //ctx.state.data = tmpSignState


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








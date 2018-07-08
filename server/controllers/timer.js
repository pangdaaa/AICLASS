const { mysql } = require('../qcloud')
const debug = require('debug')('koa-weapp-demo')
const { message: { checkSignature } } = require('../qcloud')


/**
 * 响应 GET 请求 取用户数据 
 */
async function get(ctx, next) {

  let ctx_query = ctx.query;

  var currName = ctx_query.currName
  
  //2018/5/16
  // const information = await mysql('currData').where('currName', currName).update({
  //   signState: 0,
  // })

//重置课程签到状态
  await mysql('currData').where('currName', currName).update({
    signState: 0,    
  })

  
  const information = await mysql('currData').where('currName', currName)
 
  // var Class = information[0].className1
  var classNameTmp = new Array();
  classNameTmp[0] = information[0].className1
  classNameTmp[1] = information[0].className2
  classNameTmp[2] = information[0].className3
  classNameTmp[3] = information[0].className4
  classNameTmp[4] = information[0].className5

  for (var i = 0; i < 5; i++) {
    if (!(classNameTmp[i] === '')){
      var currclass = currName + ' ' + classNameTmp[i]
      //重置currclass签到状态
      await mysql(currclass).select('*').update({
        signState: 0,
      })
    }
  }

 

  ctx.state.data = 'reset timer'

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

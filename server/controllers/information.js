const { mysql } = require('../qcloud')
const debug = require('debug')('koa-weapp-demo')
const { message: { checkSignature } } = require('../qcloud')

/**
 * 响应 GET 请求 取用户数据 
 */
async function get(ctx, next) {

  let ctx_query = ctx.query;

 

  const information = await mysql(ctx_query.information).where('openid', ctx_query.openid)



  ctx.state.data = information

}


/**
 * 响应 POST 请求 存用户数据 
 */
async function post(ctx, next) {


  // let pastData = await parsePostData(ctx);
  // ctx.body = pastData;

  // 检查签名，确认是微信发出的请求
  const { signature, timestamp, nonce } = ctx.query
  if (!checkSignature(signature, timestamp, nonce)) ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'

  /**
   * 解析微信发送过来的请求体
   * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
   */
  const body = ctx.request.body

  let className = body.className
  let name = body.name
  let stuNum = body.stuNum
  let phone = body.phone
  let isTeacher = body.isTeacher
  let openid = body.openid
  // let created_at = body.created_at
  // let updated_at = body.updated_at

  // await mysql('userRegister').insert({ school: 'school', name: 'name', stunum: '14060610', tel: '1885252152' }) 
  await mysql('informationData').insert({ className: className, name: name, stuNum: stuNum, phone: phone, isTeacher: isTeacher, openid: openid })

  if (isTeacher === 'false') {
    //查找对应课程 classname----->currname

    const currNames = await mysql('currData').where('className1', className).orWhere('className2', className).orWhere('className3', className).orWhere('className4', className).orWhere('className5', className).select('currName')

    //var information = currName + ' ' + className1

    for (var i = 0; i < currNames.length; i++) {
      var information = currNames[i].currName + ' ' + className
      //信息插入相关课程班级
      // await mysql(information).insert({ openid: openid, signTimes: 0, frontRateTimes: 0, signState: 0, credit: 100, unbelieve: 0, created_at: created_at, updated_at: updated_at })
      await mysql(information).insert({ openid: openid, name: name, stuNum: stuNum, signTimes: 0, frontRateTimes: 0, signState: 0, credit: 100, unbelieve: 0, created_at: mysql.fn.now(), updated_at: mysql.fn.now() })
    }

    //信息插入相关课程班级
    // await mysql('informationData').insert({ className: className, name: name, stuNum: stuNum, phone: phone, isTeacher: isTeacher, openid: openid })
  }

  ctx.body = 'success'
}


module.exports = {
  post,
  get
}








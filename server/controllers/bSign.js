const { mysql } = require('../qcloud')
const debug = require('debug')('koa-weapp-demo')
const { message: { checkSignature } } = require('../qcloud')

/**
 * 响应 GET 请求 取用户数据 
 */
async function get(ctx, next) {

  let ctx_query = ctx.query;

  var currName = ctx_query.currName
  var QR_CODE = ctx_query.QR_CODE
  var latitude = ctx_query.latitude
  var longitude = ctx_query.longitude
  var rangeLong = ctx_query.range
  var timeBucket = ctx_query.timeBucket
  //var update_time = ctx_query.update_time
  //var update_time = new.Date()

  var tmpSignTimesAll = await mysql('currData').where('currName', currName).select('signTimesAll')
  var SignTimesAll = tmpSignTimesAll[0].signTimesAll + 1

  // var tmpUpdated_at = await mysql('currData').where('currName', currName).select('update_time')
  //  var timer = timeBucket*60*1000



  const information = await mysql('currData').where('currName', currName).update({
    QR_CODE: QR_CODE,
    latitude: latitude,
    longitude: longitude,
    rangeLong: rangeLong,
    timeBucket: timeBucket,
    signState: 1,
    signTimesAll: SignTimesAll,
    update_time: mysql.fn.now(),
    // thisKeyIsSkipped: undefined
  })

  // setTimeout(function () {
  //   await mysql('currData').where('currName', currName).update({ signState: '0' })
  // }, 5000);

  //  setTimeout(function () {
  //    await mysql('currData').where('currName', currName).update({ signState: 0 })
  //  }, 5000);

  // tmpUpdated_at = tmpUpdated_at.replace("Z", " UTC")
  // var format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS Z");//注意格式化的表达式
  // var d = format.parse(tmpUpdated_at);
  //console.log('result.data.data[0].update_time', tmpdate);


  // ctx.state.data = currName + ' ' + QR_CODE + ' ' + latitude + ' ' + longitude + ' ' + rangeLong + ' ' + timeBucket
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








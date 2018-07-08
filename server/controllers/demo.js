const { mysql } = require('../qcloud')
const debug = require('debug')('koa-weapp-demo')
const { message: { checkSignature } } = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function get(ctx, next) {

  let ctx_query = ctx.query;

  // let openid = ctx_query.data;
  // let information = ''
  // if (!(openid === '')) {
  //   information = openid += '1232456' 
  // }
  // else {
  //   information = 'openid null'
  // }

  // //查找对应课程 classname----->currname
  // let className = ctx_query.data
  // let isTeacher = ctx_query.isTeacher
  // let openid = ctx_query.openid
  // //let finish = ''

  // const currNames = await mysql('currData').where('className1', className).orWhere('className2', className).orWhere('className3', className).orWhere('className4', className).orWhere('className5', className).select('currName');

  // if (isTeacher === 'false') {
  //   //查找对应课程 classname----->currname

  //   const currNames = await mysql('currData').where('className1', className).orWhere('className2', className).orWhere('className3', className).orWhere('className4', className).orWhere('className5', className).select('currName')

  //   //var information = currName + ' ' + className1

  //   for (var i = 0; i < currNames.length; i++) {
  //     var information = currNames[i].currName + ' ' + className
  //     //信息插入相关课程班级
  //    finish = await mysql(information).insert({ openid: openid})
  //   }

    // var information = currNames[0].currName + ' ' + className
    //信息插入相关课程班级
   //const finish = await mysql(information).insert({ openid: openid })
  // ctx.state.data = className
    //信息插入相关课程班级
    // await mysql('informationData').insert({ className: className, name: name, stuNum: stuNum, phone: phone, isTeacher: isTeacher, openid: openid })
  // }

 // ctx.state.data = isTeacher

  // ctx.body = ctx_query

  //const information = await mysql('informationData').where('openid', ctx_query.data)
  // const information = await mysql('currData').count({ openid: ctx_query.data })
    //const information = await mysql('currData').count( 'openid' )
  // const information = await mysql('currData').where('currName', ctx_query.data).update({
  //   QR_CODE: '2',
  //   rangeLong: '2',
  //   // timeBucket: '2',
  //   // signTimesAll: '2',
  //       // thisKeyIsSkipped: undefined
  //     })

    // knex('books')
    //   .where('published_date', '<', 2000)
    //   .update({
    //     status: 'archived',
    //     thisKeyIsSkipped: undefined
    //   })

  //创建信息表
  // const information = await mysql.schema.createTable(tablename, function (table) {
  //   table.increments();
  //   table.string('name');
  //   table.timestamps();
  // })

  //ctx.state.data = finish
  ctx.body = ctx_query

}

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

  let name = body.age
  let school = body.name

  await mysql('userRegister').insert({ school: school, name: name, stunum: '14060610', tel: '1885252152' })

  ctx.body = 'success'
}


module.exports = {
  post,
  get
}

// module.exports = ctx => {
//   // ctx.state.code = 2
//   // ctx.state.data = {
//   //   msg: 'Hello World'
//   // }


// //select
// module.exports = async ctx => {

//   const data = await mysql('userRegister').select('name')

//   ctx.state.data = data

// }

// module.exports = async ctx => {

//   const data = await mysql('userRegister').insert({ school: '123', name: '123', stunum: '14060610', tel: '1885252152' })

//   ctx.state.data = data

// }



// //insert
// module.exports = async ctx => {

//   const data = await mysql('cSessionInfo').returning('open_id').insert({ open_id: 'oilYa0YpHPt3QLloc57lt08_9Rks', uuid: '9dfb9a84-b9f5-4460-bf5e-ca8545995899', skey: 'f91feadd4504b6a164508a8b0500736b5c21f258', create_time: '2018-04-22 19:32:49', last_visit_time: '2018-04-22 19:32:49', session_key: 'RlAVmEVJfdYS3C2J0rtxhw==', user_info: 'dfas' })


//   // const data = await mysql('informationData').returning('open_id').insert({ open_id: 'oilYa0YpHPt3QLloc57lt08_822622', className: '14060610', name: '郭嘉伟', stuNum: '14060610104', phone: '18829897163', isTeacher: '1' })



//   ctx.state.data = data

// }







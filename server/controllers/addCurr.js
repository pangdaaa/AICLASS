const { mysql } = require('../qcloud')
const debug = require('debug')('koa-weapp-demo')
const { message: { checkSignature } } = require('../qcloud')

/**
 * 响应 GET 请求 取用户数据 
 */
async function get(ctx, next) {

  // const information = await mysql('informationData').where('openid')

  // ctx.state.data = isTeacher

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

  let currName = body.currName
  let className1 = body.className1
  let className2 = body.className2
  let className3 = body.className3
  let className4 = body.className4
  let className5 = body.className5
  let openid = body.openid

  //统计某字段个数
  // await mysql('currData').count({ openid: openid })

  //创建信息表
  // const information = await mysql.schema.createTable(openid, function (table) {
  //   table.increments();
  //   table.string('name');
  //   table.timestamps();
  // })

  //班级 信息表
  if (!(className1 === '')) {
    var information = currName + ' ' + className1
    await mysql.schema.createTable(information, function (table) {
      table.increments();
      table.string('openid');
      table.string('name');
      table.string('stuNum');
      table.integer('signTimes');
      table.integer('frontRateTimes');
      table.integer('signState');
      table.integer('credit');
      table.integer('unbelieve');
      table.timestamps();
    })
  }
  if (!(className2 === '')) {
    var information = currName + ' ' + className2
    await mysql.schema.createTable(information, function (table) {
      table.increments();
      table.string('openid');
      table.string('name');
      table.string('stuNum');
      table.integer('signTimes');
      table.integer('frontRateTimes');
      table.integer('signState');
      table.integer('credit');
      table.integer('unbelieve');
      table.timestamps();
    })
  }
  if (!(className3 === '')) {
    var information = currName + ' ' + className3
    await mysql.schema.createTable(information, function (table) {
      table.increments();
      table.string('openid');
      table.string('name');
      table.string('stuNum');
      table.integer('signTimes');
      table.integer('frontRateTimes');
      table.integer('signState');
      table.integer('credit');
      table.integer('unbelieve');
      table.timestamps();
    })
  }
  if (!(className4 === '')) {
    var information = currName + ' ' + className4
    await mysql.schema.createTable(information, function (table) {
      table.increments();
      table.string('openid');
      table.string('name');
      table.string('stuNum');
      table.integer('signTimes');
      table.integer('frontRateTimes');
      table.integer('signState');
      table.integer('credit');
      table.integer('unbelieve');
      table.timestamps();
    })
  }
  if (!(className5 === '')) {
    var information = currName + ' ' + className5
    await mysql.schema.createTable(information, function (table) {
      table.increments();
      table.string('openid');
      table.string('name');
      table.string('stuNum');
      table.integer('signTimes');
      table.integer('frontRateTimes');
      table.integer('signState');
      table.integer('credit');
      table.integer('unbelieve');
      table.timestamps();
      // //2018/5/15
      // table.timestamps(ture,ture);
      // table.dateTime('create_time');
      // table.dateTime('update_time');
    })
  }
  //课程信息表
  await mysql('currData').insert({ currName: currName, className1: className1, className2: className2, className3: className3, className4: className4, className5: className5, openid: openid })

  //插入学生信息到currclass 05-23
  if (!(className1 === '')) {
    var information = currName + ' ' + className1
    var studentInfo = await mysql('informationData').where('className', className1)
    if (!(studentInfo === '')) {
      for (var i = 0; i < studentInfo.length; i++) {
        await mysql(information).insert({ openid: studentInfo[i].openid, name: studentInfo[i].name, stuNum: studentInfo[i].stuNum, signTimes: 0, frontRateTimes: 0, signState: 0, credit: 100, unbelieve: 0, created_at: mysql.fn.now(), updated_at: mysql.fn.now() })
      }
    }
  }
  if (!(className2 === '')) {
    var information = currName + ' ' + className2
    var studentInfo = await mysql('informationData').where('className', className2)
    if (!(studentInfo === '')) {
      for (var i = 0; i < studentInfo.length; i++) {
        await mysql(information).insert({ openid: studentInfo[i].openid, name: studentInfo[i].name, stuNum: studentInfo[i].stuNum, signTimes: 0, frontRateTimes: 0, signState: 0, credit: 100, unbelieve: 0, created_at: mysql.fn.now(), updated_at: mysql.fn.now() })
      }
    }
  }
  if (!(className3 === '')) {
    var information = currName + ' ' + className3
    var studentInfo = await mysql('informationData').where('className', className3)
    if (!(studentInfo === '')) {
      for (var i = 0; i < studentInfo.length; i++) {
        await mysql(information).insert({ openid: studentInfo[i].openid, name: studentInfo[i].name, stuNum: studentInfo[i].stuNum, signTimes: 0, frontRateTimes: 0, signState: 0, credit: 100, unbelieve: 0, created_at: mysql.fn.now(), updated_at: mysql.fn.now() })
      }
    }
  }
  if (!(className4 === '')) {
    var information = currName + ' ' + className4
    var studentInfo = await mysql('informationData').where('className', className4)
    if (!(studentInfo === '')) {
      for (var i = 0; i < studentInfo.length; i++) {
        await mysql(information).insert({ openid: studentInfo[i].openid, name: studentInfo[i].name, stuNum: studentInfo[i].stuNum, signTimes: 0, frontRateTimes: 0, signState: 0, credit: 100, unbelieve: 0, created_at: mysql.fn.now(), updated_at: mysql.fn.now() })
      }
    }
  }
  if (!(className5 === '')) {
    var information = currName + ' ' + className5
    var studentInfo = await mysql('informationData').where('className', className5)
    if (!(studentInfo === '')) {
      for (var i = 0; i < studentInfo.length; i++) {
        await mysql(information).insert({ openid: studentInfo[i].openid, name: studentInfo[i].name, stuNum: studentInfo[i].stuNum, signTimes: 0, frontRateTimes: 0, signState: 0, credit: 100, unbelieve: 0, created_at: mysql.fn.now(), updated_at: mysql.fn.now() })
      }
    }
  }

  //ctx.body = '2 studentInfo' + JSON.stringify(studentInfo)
 // ctx.body = studentInfo[0].openid + ' ' + studentInfo[0].name + ' ' + studentInfo[0].stuNum
   ctx.body = 'success'
}


module.exports = {
  post,
  get
}








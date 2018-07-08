//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')

App({


  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)

    // //登录1
    // qcloud.login({
    //   success(result) {
    //     if (result) {
    //       util.showSuccess('登录成功!')
    //     } else {
    //       // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
    //       qcloud.request({
    //         url: config.service.requestUrl,
    //         login: true,
    //         success(result) {
    //           util.showSuccess('登录成功')
    //         },
    //         fail(error) {
    //           util.showModel('登录失败', error)
    //           console.log('request fail', error)
    //         }
    //       })
    //     }
    //   },

    //   fail(error) {
    //     util.showModel('登录失败', error)
    //     console.log('登录失败', error)
    //   }
    // })

    // // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
    
    //登录2
    util.showBusy('正在登录')
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success(result) {
        util.showSuccess('登录成功')
      },
      fail(error) {
        var msg = '首次登录，请到‘我的’页面点击爱翘logo下方文字授权'
        //util.showModel('登录失败', error)
        util.showModel('自动登录失败', msg)
        console.log('request fail0000', error)
      }
    })

    this.doRequest()
  },


  //查询是否为老师 有BUG 第一次登陆未注册时会报错 暂时不影响使用
  doRequest: function () {
    // util.showBusy('请求中...')
    var that = this
    var options = {
      url: config.service.requestUrl,
      login: true,
      success(result) {
        //查询是否为老师 
        console.log('mysqlDatawww =====', result.data.data.openId );
        if (result) {
          qcloud.request({
            url: `${config.service.host}/weapp/isTeacher`,
            data: { data: result.data.data.openId },
            login: true,
            success(result) {
              console.log('mysqlData =====', result.data);
              console.log('mysqlData =====', result.data.data[0]);
              if (!(result.data.data[0] === null)){
                console.log('123456789')
                if (result.data.data[0].isTeacher === 'true') {
                  //是老师
                  that.globalData.isTeacher = true
                } else {
                  //是学生
                  that.globalData.className = result.data.data[0].className
                }
              }
              console.log('987654321')
             
            },

            fail(error) {
              console.log('request fail111', error);
            }
          })

        }
        //   util.showSuccess('请求成功完成')
        console.log('request success1', result.data.data)
        that.globalData.requestResult = result.data.data
      },
      fail(error) {
        //  util.showModel('请求失败', error);
        var msg = '首次登录，请到‘我的’页面点击爱翘logo下方文字授权'
        util.showModel('自动登录失败', msg);
        console.log('request fail2282', error);
      }
    }
    qcloud.request(options)
  },

  globalData: {
    requestResult: null,
    isTeacher: false,
    className: null,
  },
})
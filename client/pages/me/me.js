//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    avatarUrl: '../../images/user-unlogin.png',
    nickName: '',
    openId: '',
    isTeacher: false,
    color: 'silver',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  //下拉刷新页面
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
   // this.request_curr()
  },

  onLoad: function (options) {

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              //console(res.userInfo)
            }
          })
        }
      }
    })

    var that = this
    var appInstance = getApp()
    console.log('appInstance11111', appInstance.globalData);
    //  appInstance.globalData.requestResult.openId = '123456789'
    //  appInstance.globalData.isTeacher = 'ture'
    // console.log('appInstance22222', appInstance.globalData.requestResult.openId);
    if (!(appInstance.globalData.requestResult === null)) {
      that.setData({
        avatarUrl: appInstance.globalData.requestResult.avatarUrl,
        nickName: appInstance.globalData.requestResult.nickName,
        openId: appInstance.globalData.requestResult.openId,
        isTeacher: appInstance.globalData.isTeacher,
      })
    }


    // console.log('isTeacher', this.data.isTeacher);
    if (this.data.isTeacher === true) {
      that.setData({
        color: '#5AB4B4'
      })
      //console.log('isTeacher2', this.data.color);

    }
    //console.log('isTeacher3', this.data.color);


  },

  // onReady: function () {
  //   var that = this
  //   //查询是否为老师 
  //   qcloud.request({
  //     url: `${config.service.host}/weapp/demo`,
  //     data: { data: that.data.openId },
  //     login: true,
  //     success(result) {
  //       console.log('mysqlData =====',result.data.data[0].isTeacher);
  //       if (result.data.data[0].isTeacher === 'true') {
  //         // that.setData({
  //         //  // isTeacher: true

  //         // })
  //        //appInstance.globalData.isTeacher = true

  //         console.log('appInstance');
  //       }

  //     },

  //     fail(error) {
  //       console.log('request fail', error);
  //     }
  //   })
  // },

  onPullDownRefresh: function () {
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
  doRequest: function () {
    // util.showBusy('请求中...')
    var that = this
    var options = {
      url: config.service.requestUrl,
      login: true,
      //请求用户信息
      success(result) {
       
        //查询是否为老师 
        console.log('mysqlDatawww =====', result.data.data.openId);
        if (result) {
          qcloud.request({
            url: `${config.service.host}/weapp/isTeacher`,
            data: { data: result.data.data.openId },
            login: true,
            success(result) {
              console.log('mysqlData2222 is teacher =====', result.data.data[0]);
              //  if (!(result.data.data[0] === null)){
              console.log('isTeacher 00000', result.data.data[0].isTeacher);
              wx.setStorageSync('isTeacherStor', result.data.data[0].isTeacher)
              console.log('classNameStor 00000', result.data.data[0].className);
              wx.setStorageSync('classNameStor', result.data.data[0].className)
              if (result.data.data[0].isTeacher === 'true') {
                //是老师
                // console.log('mysqlData =====', result.data.data[0].isTeacher);
                that.setData({
                  isTeacher: true,
                  color: '#5AB4B4'
                })
                // that.globalData.isTeacher = true
              } else {
                //是学生
                that.setData({
                  isTeacher: false
                })
                // that.globalData.className = result.data.data[0].className
              }
              //   }

            },

            fail(error) {
              console.log('request fail111', error);
            }
          })

        }
        //   util.showSuccess('请求成功完成')
        console.log('request success1', result.data.data)
        that.setData({
          avatarUrl: result.data.data.avatarUrl,
          nickName: result.data.data.nickName,
          isTeacher: result.data.data.isTeacher,
          openId: result.data.data.openId,
        })

        //console.log('classNameStor', result.data.data);
        // wx.setStorageSync('isTeacherStor', result.data.data.isTeacher)
        wx.setStorageSync('openIdStor', result.data.data.openId)
       
        
        // console.log('appInstance333333', result.data.data.openId);
        // appInstance.globalData.requestResult.openId = result.data.data.openId

      },
      fail(error) {
        //  util.showModel('请求失败', error);
        var msg = '首次登录，请到‘我的’页面点击爱翘logo下方文字授权'
        util.showModel('自动登录失败', msg);
        console.log('request fail2282', error);
      },
      complete: function () {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },

    }
    qcloud.request(options)
  },


  //跳转到我的课程
  currClick: function () {

    // wx.request({
    //   url: ,
    // })

    wx.navigateTo({
      url: '../curriculum/curriculum'
    });

  },

  // 跳转到我的信息
  inforClick: function () {

    // wx.request({
    //   url: ,
    // })

    wx.navigateTo({
      url: '../information/information'
    });

  },

  // 跳转到功能介绍
  inrtoClick: function () {

    // wx.request({
    //   url: ,
    // })

    wx.navigateTo({
      url: '../introduce/introduce'
    });

  },

  //获取用户信息授权
  bindGetUserInfo: function (e) {
    // console.log(e.detail.userInfo)
    wx.showToast({
      title: '下拉刷新',
      duration: 3000
    })
  },



})

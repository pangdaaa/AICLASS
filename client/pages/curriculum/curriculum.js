// pages/curriculum/curriculum.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { currname: "- - - -", date: "----.--", signRate: 0, frontRate: 0, signTimesAll: 0 },
      { currname: "- - - -", date: "----.--", signRate: 0, frontRate: 0, signTimesAll: 0 },
      { currname: "- - - -", date: "----.--", signRate: 0, frontRate: 0, signTimesAll: 0 },
      { currname: "- - - -", date: "----.--", signRate: 0, frontRate: 0, signTimesAll: 0 },
      { currname: "- - - -", date: "----.--", signRate: 0, frontRate: 0, signTimesAll: 0 },
      { currname: "- - - -", date: "----.--", signRate: 0, frontRate: 0, signTimesAll: 0 },
      { currname: "- - - -", date: "----.--", signRate: 0, frontRate: 0, signTimesAll: 0 },
      { currname: "- - - -", date: "----.--", signRate: 0, frontRate: 0, signTimesAll: 0 },
      { currname: "- - - -", date: "----.--", signRate: 0, frontRate: 0, signTimesAll: 0 },
      { currname: "- - - -", date: "----.--", signRate: 0, frontRate: 0, signTimesAll: 0 },
      { currname: "- - - -", date: "----.--", signRate: 0, frontRate: 0, signTimesAll: 0 },
      { currname: "- - - -", date: "----.--", signRate: 0, frontRate: 0, signTimesAll: 0 },
    ],
    isTeacher: false,
    openId: '',
    className: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    var appInstance = getApp()

    console.log('appInstance curr', appInstance.globalData);
    if (appInstance.globalData.requestResult === null || appInstance.globalData.className === null) {
      console.log('hehehehe openIdStor', wx.getStorageSync('openIdStor'))
      console.log('hehehehe isTeacherStor', wx.getStorageSync('isTeacherStor'))
      console.log('hehehehe classNameStor', wx.getStorageSync('classNameStor'))
      that.setData({
        openId: wx.getStorageSync('openIdStor'),
        isTeacher: wx.getStorageSync('isTeacherStor'),
        className: wx.getStorageSync('classNameStor'),
      })
    } else {
      that.setData({
        isTeacher: appInstance.globalData.isTeacher,
        openId: appInstance.globalData.requestResult.openId,
        className: appInstance.globalData.className,
      })
      //console.log('my curr isTeacher', this.data.isTeacher);
    }
    console.log('my curr isTeacher', this.data.isTeacher);

    // that.setData({
    //   isTeacher: appInstance.globalData.isTeacher,
    //   openId: appInstance.globalData.requestResult.openId,
    //   className: appInstance.globalData.className,
    // })
    // console.log('my curr isTeacher', this.data.isTeacher);

    //查询课程
    if (this.data.isTeacher === true || this.data.isTeacher === 'true') {
      util.showBusy('正在获取')
      var that = this
      //老师
      console.log('Teacher request', this.data.openId);

      //请求数据
      qcloud.request({
        url: `${config.service.host}/weapp/curriculum`,
        data: { data: this.data.openId },
        login: true,
        success(result) {
          console.log('mysqlData =====', result.data);
          // console.log('mysqlData =====', result.data.data[0].currName);

          // console.log('mysqlData =====', that.data.items[0].currname);

          // that.setData({
          //   'items[0].currname': result.data.data[0].currName
          // })
          // that.data.items[0].currname = result.data.data[0].currName

          for (var i = 0; i < result.data.data.length; i++) {
            //console.log('mysqlData =====',i);
            that.data.items[i].currname = result.data.data[i].currName
            that.data.items[i].date = (JSON.stringify(result.data.data[i].create_time)).substring(1, 11)
            that.data.items[i].signTimesAll = result.data.data[i].signTimesAll
          }
          that.setData({
            items: that.data.items
          })
          util.showSuccess('获取成功')

        },
        fail(error) {
          console.log('request fail', error);
        }
      })

    } else if (this.data.isTeacher === false || this.data.isTeacher === 'false'){
      //学生
      util.showBusy('正在获取')
      console.log('Student request', this.data.className);

      //请求数据
      qcloud.request({
        url: `${config.service.host}/weapp/curriculum1`,
        data: { data: this.data.className },
        login: true,
        success(result) {
          // console.log('mysqlData =====', result.data.data[0]);
          for (var i = 0; i < result.data.data.length; i++) {
            //console.log('mysqlData =====',i);
            console.log('mysqlData =====', result.data.data[i]);
            that.data.items[i].currname = result.data.data[i].currName
            that.data.items[i].date = (JSON.stringify(result.data.data[i].create_time)).substring(1, 11)
            that.data.items[i].signTimesAll = result.data.data[i].signTimesAll
          }
          that.setData({
            items: that.data.items
          })
          util.showSuccess('获取成功')
        },
        fail(error) {
          console.log('request fail', error);
        }
      })

    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },



  tapclick: function (options) {

    // wx.request({
    //   url: ,
    // })

    let currname = options.currentTarget.dataset.currname
    wx.setStorageSync('currname', currname)

    let signTimesAll = options.currentTarget.dataset.signtimesall
    wx.setStorageSync('signTimesAll', signTimesAll)

    console.log('currname =====', options.currentTarget);
    console.log('currname =====', wx.getStorageSync('currname'));
    console.log('signTimesAll =====', wx.getStorageSync('signTimesAll'));
    wx.navigateTo({
      // url: '../stat/stat',

      url: '../currDetail/currDetail'
    });

  },

  tapclick_addCurr: function () {

    // wx.request({
    //   url: ,
    // })

    wx.navigateTo({
      url: '../addCurr/addCurr'
    });

  },


})
// pages/fSign/fSign.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'scaleToFill',
    src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519738876391&di=f43fc4d1aab207b9c8832ad22cc6d4d4&imgtype=0&src=http%3A%2F%2Fimg2.myhsw.cn%2F2015-07-08%2F02x55k7d.jpg',
    signResult: '完成',//签到结果
    latitude_S: 0,//学生定位精度
    longitude_S: 0,//学生定位纬度
    signTime: '-',//签到时间
    signTimes: 0, //签到次数
    signTimesAll: 0,//总签到次数
    signRate_S: 0,//学生到课率
    frontRate_S: 0,//学生前作率
    credit: 100,//信用分  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取经纬度信息
    //console.log('currname sign', wx.getStorageSync('currname'));
    that.setData({
      //currName: wx.getStorageSync('currname'),
      latitude_S: wx.getStorageSync('longitude'),
      longitude_S: wx.getStorageSync('latitude'),
      signTimesAll: wx.getStorageSync('signTimesAll'),
      signTimes: wx.getStorageSync('signTimes'),
      signTime: wx.getStorageSync('signTime'),
    })

    that.setData({
      signRate_S: ((that.data.signTimes / that.data.signTimesAll) * 100).toFixed(0)
    })


   
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
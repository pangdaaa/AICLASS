// pages/signDetail/signDetail.js

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    className: "- - - - -",
    peopleNumAll_Class: 0,
    // stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0,
    items: [
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },
      { stuName: "- - -", stuNum: "- - - - -", signTimes: 0, signTimesAll: 0, signRate_S: 0, frontRate_S: 0, color: '#888', },

    ],
    currName: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    //获取班级信息
    console.log('className sign', wx.getStorageSync('className'));
    console.log('currname sign', wx.getStorageSync('currname'));
    console.log('signTimesAll sign ====== ', wx.getStorageSync('signTimesAll'));
    that.setData({
      className: wx.getStorageSync('className'),
      currName: wx.getStorageSync('currname'),
      signTimesAll: wx.getStorageSync('signTimesAll'),
    })
    this.request_stuInfo()
  },

  //刷新学生列表
  tapclick_refresh: function () {
    this.request_stuInfo()
  },

  /**
   * 获取学生信息
   */
  request_stuInfo: function () {
    var that = this
    util.showBusy('正在刷新')
    wx.request({
      url: `${config.service.host}/weapp/signDetail`,

      data: {
        className: that.data.className,
        currName: that.data.currName
      },

      login: true,
      success(result) {
        util.showSuccess('刷新成功')
        // console.log(result.data);
        // console.log(result.data.data.length);
        var stuInfo = result.data.data
        // console.log('stuInfo[0]',stuInfo);
        // console.log(stuInfo[0].name);
        if (result.data.data.length === 0) {
          util.showSuccess('暂无学生')
        }


        for (var i = 0; i < result.data.data.length; i++) {
          console.log('stuInfo[' + i + ']', stuInfo[i]);
          that.data.items[i].stuName = stuInfo[i].name
          that.data.items[i].stuNum = stuInfo[i].stuNum
          that.data.items[i].signTimes = stuInfo[i].signTimes
          that.data.items[i].signTimesAll = wx.getStorageSync('signTimesAll')
          if (wx.getStorageSync('signTimesAll') === 0) {
            that.data.items[i].signRate_S = 0
          } else {
            that.data.items[i].signRate_S = (((stuInfo[i].signTimes) / (wx.getStorageSync('signTimesAll'))) * 100).toFixed(0)
          }

          if (stuInfo[i].signState === 1) {
            that.data.items[i].color = '50D0FE'
          } else if (stuInfo[i].signState === 2) {
            that.data.items[i].color = 'FED650'
          } else if (stuInfo[i].signState === 3)  {
            that.data.items[i].color = '#FF7F50'
          }

          // that.data.items[i].signRate_S = stuInfo[i].signRate_S
          // that.data.items[i].frontRate_S = stuInfo[i].frontRate_S
        }
        that.setData({
          peopleNumAll_Class: result.data.data.length,
          items: that.data.items
        })


        //console.log('87654321',JSON.parse(result.data));
      },
      fail(error) {
        util.showModel('获取失败', error);
        console.log('request fail', error);
      },
      //complete: function(res) {},
    })
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

  },

})
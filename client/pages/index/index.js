// pages/index/index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
Page({
  data: {
    scale: 18,
    latitude: 0,
    longitude: 0,
    latitude_t: 0,
    longitude_t: 0,
    className: "- - - - - -",//班级
    // signRate_Curr: 0,//班级到课率
    currName: "- - - -",//课程名
    classRoom: "- - -",//教室
    //signTime_B: "--:--",//发起签到时间
    signTime_E: "--",//签到时间时限
    // teacherName: "- - -",//教师名
    stuNum: "- - - - - - - - - -",//学生学号
    signRate_S: 0,//学生到课率
    frontRate_S: 0,//学生前作率
    credit: 100,//信用分  
    isTeacher: false,
    openid: '',
    rangeLong: 0,
    QR_CODE: '',
    QR_CODE_t: '',
    frontRate: false,//是否前座  frontRateTimes
    signState: 0,   //signState
    unbelieve: false,
    information: '',
    signTimesAll: 0,
  },

  //下拉刷新页面
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.doRequest()
  },
  // 页面加载
  onLoad: function (options) {

    this.doRequest()

    // 获取并设置当前位置经纬度
    wx.getLocation({
      type: "gcj02",
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          circles: [{
            longitude: res.longitude,
            latitude: res.latitude,
            color: "#7cb5ec88",
            fillColor: "#7cb5ec88",
            radius: 0,
            strokeWidth: 1
          }]
        })

        wx.setStorageSync('longitude', res.longitude)
        wx.setStorageSync('latitude', res.latitude)
      }
    });

    // 3.设置地图控件的位置及大小，通过设备宽高定位
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          controls: [{
            id: 1,
            iconPath: '/images/aq_location.png',
            position: {
              left: 10,
              top: res.windowWidth / 3 + 30,
              width: 25,
              height: 25
            },
            clickable: true
          }]
        })
      }
    });

    // //请求课程数据
    // if (this.data.isTeacher === false) {
    //   var that = this
    //   //学生
    //   console.log('Teacher request', this.data.className);

    //   //请求课程数据
    //   qcloud.request({
    //     url: `${config.service.host}/weapp/serchCurr`,
    //     data: { data: this.data.className },
    //     login: true,
    //     success(result) {
    //       console.log('找到课程数据 =====', result.data);

    //       //  that.setData({

    //       // })


    //     },
    //     fail(error) {
    //       console.log('request fail', error);
    //     }
    //   })

    // }


  },
  // 页面显示
  onShow: function () {
    // 1.创建地图上下文，移动当前位置到地图中心
    this.mapCtx = wx.createMapContext("Map");
    this.movetoPosition()
  },
  // 地图控件点击事件
  bindcontroltap: function (e) {
    // 判断点击的是哪个控件 e.controlId代表控件的id，在页面加载时的第3步设置的id
    switch (e.controlId) {
      // 点击定位控件
      case 1: this.movetoPosition();
        break;
      default: break;
    }
  },

  // 定位函数，移动位置到地图中心
  movetoPosition: function () {
    this.mapCtx.moveToLocation();
  },

  // tapclick: function () {
  //   wx.scanCode({
  //     onlyFromCamera: true,
  //     success: (res) => {
  //       wx.showLoading({
  //         title: '正在签到',
  //         mask: true
  //       })

  //       // wx.request({
  //       //   url: ,
  //       // })



  //       // 请求密码成功隐藏等待框
  //       wx.hideLoading();
  //       // 携带密码和车号跳转到密码页
  //       wx.navigateTo({
  //         url: '../fSign/fSign',
  //         success: function (res) {
  //           wx.showToast({
  //             title: '签到成功',
  //             duration: 1000
  //           })
  //         }
  //       })

  //       console.log(res)
  //     }
  //   })

  // },

  //查询是否为老师 有BUG 第一次登陆未注册时会报错 暂时不影响使用
  doRequest: function () {
    // util.showBusy('请求中...')
    var that = this
    var options = {
      url: config.service.requestUrl,
      login: true,
      success(result) {
        //查询是否为老师 
        console.log('globalData openId', result.data.data.openId);
        that.setData({
          openid: result.data.data.openId
        })
        if (result) {
          qcloud.request({
            url: `${config.service.host}/weapp/isTeacher`,
            data: { data: result.data.data.openId },
            login: true,
            success(result) {
              console.log('globalData isTeacher', result.data.data[0].isTeacher);
              if (result.data.data[0].isTeacher === 'true') {
                //是老师
                // that.globalData.isTeacher = true
                console.log('globalData isTeacher', result.data.data[0].isTeacher);
                that.setData({
                  isTeacher: result.data.data[0].isTeacher
                })

              } else {
                //是学生
                // that.globalData.className = result.data.data[0].className
                console.log('globalData className', result.data.data[0].className);
                that.setData({
                  className: result.data.data[0].className
                })
                console.log('globalData className ======= ', that.data.className);
                //请求课程数据
                if (that.data.isTeacher === false) {
                  // var that = this
                  //学生
                  console.log('Teacher request', that.data.className);

                  //请求课程数据
                  qcloud.request({
                    url: `${config.service.host}/weapp/serchCurr`,
                    data: { data: that.data.className },
                    login: true,
                    success(result) {
                      console.log('找到课程数据 =====', result.data.data[0]);
                      //判断课程是否为空
                      if (result.data.data.length === 0) {
                        wx.showToast({
                          title: '暂无上课信息',
                          duration: 3000
                        })
                      }
                      else {
                        that.setData({
                          currName: result.data.data[0].currName,
                          // signTime_B: result.data.data[0].create_time,
                          signTime_E: result.data.data[0].timeBucket,
                          latitude_t: result.data.data[0].latitude,
                          longitude_t: result.data.data[0].longitude,
                          classRoom: (result.data.data[0].QR_CODE).substring(5, 11),
                          //openid_t: result.data.data[0].openid,
                          rangeLong: result.data.data[0].rangeLong,
                          QR_CODE_t: result.data.data[0].QR_CODE,
                          signTimesAll: result.data.data[0].signTimesAll,
                        })
                        //存储课程总签到次数
                        wx.setStorageSync('signTimesAll', result.data.data[0].signTimesAll)

                        //拼课程班级表表名
                        var information = that.data.currName + ' ' + that.data.className
                        that.setData({
                          information: information,
                        })
                        //console.log('information 1738', that.data.information);
                        //请求课程班级表里的个人信息
                        qcloud.request({
                          url: `${config.service.host}/weapp/information`,
                          data: {
                            information: that.data.information,
                            openid: that.data.openid,
                          },
                          login: true,
                          success(result) {
                            console.log('找到课程数据 =====', result.data.data[0]);
                            that.setData({
                              stuNum: result.data.data[0].stuNum,
                              signTimes: result.data.data[0].signTimes

                            })


                            if (that.data.signTimesAll === 0) {
                              that.setData({
                                signRate_S: 0,//学生到课率
                              })
                            } else {
                              that.setData({
                                signRate_S: ((that.data.signTimes / that.data.signTimesAll) * 100).toFixed(0)
                              })
                            }

                          },
                          fail(error) {
                            console.log('request fail', error);
                          },

                        })


                      }



                    },
                    fail(error) {
                      console.log('request fail', error);
                    }
                  })

                }
              }
            },

            fail(error) {
              console.log('request fail', error);
            }
          })

        }
        //   util.showSuccess('请求成功完成')
        console.log('request success1', result.data.data)
        // that.globalData.requestResult = result.data.data
      },
      fail(error) {
        //  util.showModel('请求失败', error);
        console.log('request fail', error);
      },
      complete: function () {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    }
    qcloud.request(options)
  },

  tapclick: function () {
    var that = this

    //判断是有有课
    if (that.data.currName === "- - - -" || that.data.stuNum === "- - - - - - - - - -") {
      wx.showToast({
        title: '暂无上课信息',
        duration: 3000
      })
    } else {
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          wx.showLoading({
            title: '正在签到',
            mask: true
          })


          // // 请求密码成功隐藏等待框
          // wx.hideLoading();
          // // 携带密码和车号跳转到密码页
          // wx.navigateTo({
          //   url: '../fSign/fSign',
          //   success: function (res) {
          //     wx.showToast({
          //       title: '签到成功',
          //       duration: 1000
          //     })
          //   }
          // })

          console.log(res)

          this.setData({
            QR_CODE: res.result
          })

          //二维码位置信息比对
          if (this.data.QR_CODE.length === 15) {
            console.log('res.result.length')

            if ((that.data.QR_CODE).substring(5, 11) === (that.data.QR_CODE_t).substring(5, 11)) {
              //经纬度信息比对
              var fromll = (that.data.latitude_t) + ',' + (that.data.longitude_t)
              var toll = (that.data.latitude) + ',' + (that.data.longitude)
              qcloud.request({
                url: `https://apis.map.qq.com/ws/distance/v1/?parameters`,
                data: {
                  mode: 'walking',
                  from: fromll,
                  to: toll,
                  key: 'UVSBZ-7MJWU-SQ5VV-2RMCC-BDJNK-G2FVK',
                },
                login: true,
                success(result) {
                  //教师与学生GPS距离
                  console.log('request result gps', result.data.result.elements[0].distance);
                  if (result.data.result.elements[0].distance <= (that.data.rangeLong) * 2.5) {
                    console.log('rangeLong---------', (that.data.rangeLong) * 2.5);
                    that.setData({
                      signState: 1   // 正常签到
                    })
                    console.log('signState---------', that.data.signState);
                    that.request_sign()
                  } else if (result.data.result.elements[0].distance > (that.data.rangeLong) * 5.0) {
                    console.log('rangeLong---------', '>',(that.data.rangeLong) * 5.0);
                    that.setData({
                      signState: 3  // 距离非长远
                    })
                    console.log('signState---------', that.data.signState);
                    that.request_sign()
                  }else{
                    console.log('rangeLong---------', (that.data.rangeLong) * 2.5, '-',(that.data.rangeLong) * 5.0);
                    that.setData({
                      signState: 2  // 距离较远
                    })
                    console.log('signState---------', that.data.signState);
                    that.request_sign()
                  }

                },
                fail(error) {
                  console.log('request fail', error);
                },

              })


              // this.request_sign()

            } else {
              wx.showToast({
                title: '地点错误',
                duration: 1000
              })
            }



          } else {
            wx.showToast({
              title: '无效码',
              duration: 1000
            })
          }
        }
      })
    }


  },

  //发起签到请求
  request_sign: function () {
    var that = this

    qcloud.request({
      url: `${config.service.host}/weapp/fSign`,
      data: {
        openid: that.data.openid,
        currName: that.data.currName,
        className: that.data.className,
        frontRate: that.data.frontRate,//是否前座  frontRateTimes
        signState: that.data.signState,   //signState
        unbelieve: that.data.unbelieve,//不正常签到 credit 
      },
      login: true,
      success(result) {
        console.log('result =====', result.data);
        //console.log('result =====', result.data.data[0]);
        if ((result.data.data === 'Repeat sign') || (result.data.data === '')){
          wx.showToast({
            title: '此次已签到',
            duration: 3000
          })
        } else if (!(result.data.data === '')){
          wx.setStorageSync('signTimes', result.data.data[0].signTimes)
          wx.setStorageSync('signTime', result.data.data[0].updated_at)

          // 请求成功隐藏等待框
          wx.hideLoading();
          // 转到签到完成页
          wx.navigateTo({
            url: '../fSign/fSign',
            success: function (res) {
              wx.showToast({
                title: '签到成功',
                duration: 1000
              })
            }
          })
        }

        // (((result.data.data[0].signTime) / ((that.data.signTimesAll) + 1)) * 100).toFixed(0)


        // wx.setStorageSync('signTimes', result.data.data[0].signTimes)
        // wx.setStorageSync('signTime', result.data.data[0].updated_at)



        // // 请求成功隐藏等待框
        // wx.hideLoading();
        // // 转到签到完成页
        // wx.navigateTo({
        //   url: '../fSign/fSign',
        //   success: function (res) {
        //     wx.showToast({
        //       title: '签到成功',
        //       duration: 1000
        //     })
        //   }
        // })
      },
      fail(error) {
        console.log('request fail', error);
      }
    })




  },

})

# 基于微信小程序签到系统DEMO

本签到系统通过扫描对应地点的二维码获取详细位置信息，并根据获取到的GPS定位信息辅助判断是否为虚假签到，最终完成上课签到。本系统采用C/S结构，由微信小程序客户端和腾讯云服务端组成。客户端使用微信团队开发的MINA逻辑框架；云服务端使用腾讯云开发的wafer-2后端开发框架；服务端与mysql数据库交互使用knex.js连接。本系统建立的学生考勤管理机制，为教师及时反馈学生到课率，极大地改善老师的点名的效率。
通过实验测试，该微信签到系统能够同时进行多课程、多班级的签到，具有无须下载、不分手机系统、使用简单等特点，具有一定的实际应用价值和后续研究价值。

本系统采用腾讯云 CVM（云服务器）CentOS 7.3 64位系统。腾讯云小程序解决方案是腾讯云专为微信小程序用户提供的解决方案，使用户能够一键自动完成域名注册解析以及云端资源分配初始化，快速搭建具备云端能力的专属小程序底层能力。

本系统腾讯云服务项目结构如下：
koa-weapp-server
├── README.md
├── app.js
├── controllers
│   ├── addcurr.js  //添加课程
│   ├── bSign.js	//开始签到
│   ├── curriculum.js  //课程提交
│   ├── curriculum1.js  //课程查询
│   ├── fSign.js  //学生完成签到
│   ├── information.js  //用户信息提交获取
│   ├── isTeacher.js  //判断教师
│   ├── login.js  //用户登录
│   ├── serchCurr.js  //查找课程
│   ├── signDetail.js  //签到信息查询
│   ├── stat.js  //签到
│   ├── timer.js  //计时器
│   ├── message.js  //消息通知，属预留模块
│   └── user.js  //用户信息获取
├── middlewares  
│   └── response.js  //服务端中间件，负责响应请求
├── config.js  //配置文件
├── package.json
├── process.json
├── nodemon.json
├── qcloud.js
└── routes
    └── index.js  //路由


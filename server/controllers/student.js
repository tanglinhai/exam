const Student = require('../model/student');
const Paper   = require('../model/papers');
const Operation = require('../model/operation');
const utils = require('../utils/utils');
const crypto = require('crypto');
const moment = require('moment');
var iconv = require('iconv-lite');
let mdHash = function(data){
  const hash = crypto.createHash('md5');
  return hash.update(data).digest('hex');
}



var desParams = [{
        alg: 'des-ecb',
        autoPad: true,
        key: '01234567',
        plaintext: '1234567812345678',
        iv: null
    },{
        alg: 'des-cbc',
        autoPad: true,
        key: '82036888',
        plaintext: 'M1100000146',
        iv: '82036888'
    },{
        alg: 'des-ede3',    //3des-ecb
        autoPad: true,
        key: '0123456789abcd0123456789',
        plaintext: '1234567812345678',
        iv: null
    },{
        alg: 'des-ede3-cbc',    //3des-cbc  
        autoPad: true,
        key: '0123456789abcd0123456789',
        plaintext: '1234567812345678',
        iv: '12345678'
    }
]


function getDESDataKey(txt){
  var param = desParams[1];
  param.plaintext = txt;
  return utils.encrypt(param);
}
function getDecrypt(txt){
  var param = desParams[1];
  param.plaintext = txt;
  return utils.decrypt(param);
}


// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var student = new Student({
//     userId: 12001, // 学号
//     userName: '张三', // 用户名
//     passWord: '123321', // 密码
//     grade: 3, // 年级 1~6 分别代表一年级到六年级
//     class: 3, // 班级
//     exams:[{ // 参加的考试
//       _paper:Schema.Types.ObjectId("5a40a4ef485a584d44764ff1"),
//       score:100,
//       date: new Date(),
//       answers: []
//     }]
// })

// exports.init = student.save((err,doc) => {
//   console.log(err);
// });
//注册
exports.register = function (req,res) {
    let type = req.body.type;
    let userInfo = req.body.userInfo;
    let userIdCopy = userInfo.userId;
    if(type == 'url'){
      if(!userInfo.userId){
        res.json({
          status: '400001',
          msg:'你没有专家ID！'
        })
        return;
      }
      try{
        userInfo.userId = getDecrypt(userInfo.userId);
      }catch(e){
        res.json({
          status: '400001',
          msg:'你的专家ID是无效的！'
        })
        return;
      }
      userInfo.userName = '评标专家_'+new Date().getTime()+'_'+Math.floor(Math.random()*1000);
      userInfo.passWord = mdHash(userInfo.userId + '365trade_pingbiaoxitong');
      userInfo.grade = '--';
      userInfo.class = '--';
    }else
      userInfo.passWord = mdHash(userInfo.passWord);
    Student.findOne({userId: userInfo.userId},(err,doc) => {
      if(err) {
          res.json({
            status:'1',
            msg:err.message
          })
        } else {
          if(doc) {
            res.json({
              status:'2',
              msg: '用户已存在',
              userName: doc.userName,
              userId: userIdCopy
            })
            } else {
              userInfo.exams = [];
              Student.create(userInfo,(err1,doc1) => {
                if(err1) {
                  res.json({
                    status:'1',
                    msg: err1.message
                  })
                  }else {
                    if(doc1) {
                      res.json({
                        status: '0',
                        msg: 'sucess',
                        userName: doc1.userName,
                        userId: userIdCopy
                      })
                      } else {
                        res.json({
                          status:'1',
                          msg:'注册失败'
                        })
                      }
                  }
              })
            }
        }
    })
  };
// 登录
exports.signup = function(req, res) {
  var type = req.body.type;
  var userId;
  var param;
  if(type == 'url'){
    if(!req.body.userId){
      res.json({
        status: '400001',
        msg:'没有传专家ID'
      })
      return;
    }
    try{
      userId = getDecrypt(req.body.userId);
    }catch(e){
      res.json({
        status: '400001',
        msg:'没有传专家ID'
      })
      return;
    }
    param = {
      userName: req.body.userName,
      userId: userId
    }
  }else{
    param = {
      userName: req.body.userName,
      passWord: mdHash(req.body.userPwd)
    }
  }
  
  Student.findOne(param, (err,doc)=>{
    //the second parameter of the callback (in this case user) is set to null.
    //It's not an error, so err is also null.
    if (err) {
      res.json({
        status:'1',
        msg: err.message
      })
    } else {
      if (doc) {
        req.session.userName = doc.userName
        req.session.passWord = doc.passWord
        res.json({
          status: '0',
          msg:'success',
          result:{
            userName: doc.userName,
            userId: doc.userId,
            grade: doc.grade,
            class: doc.class
          }
        })
      } else {
        res.json({
          status: '2',
          msg:'没有该用户'
        })
      }
    }
  })
};
// 登出
exports.signout = function (req, res) {
  req.session.userName = ''
  req.session.passWord = ''
  res.json({
    status:'0',
    msg:'',
    result:'退出成功'
  })
};

// 获取个人信息
exports.getInfo = function (req, res) {
  let userName = req.query.userName,
      userId   = req.query.userId;
  Student.findOne({'userName':userName,'userId':userId},(err, doc) => {
    if (err) {
      res.json({
        status:'1',
        msg: err.message
      })
    } else if (doc) {
      res.json({
        status: '0',
        msg:'success',
        result:{
          userName: doc.userName,
          userId: doc.userId,
          grade: doc.grade,
          class: doc.class
        }
      })
    } else {
      res.json({
        status: '2',
        msg:'没有该用户'
      })
    }
  })
};
// 修改用户信息
exports.updateStudent = function (req, res) {
  let userName = req.session.userName;
  let userInfo = req.body.userInfo;
  userInfo.passWord = mdHash(userInfo.passWord);
  Student.update({'userName':userName},userInfo,(err,doc)=>{
    if(err) {
      res.json({
        status:'1',
        msg:err.message
      })
    }else {
      if(doc){
        res.json({
          status:'0',
          msg:'success'
        })
      } else {
        res.json({
          status:'1',
          msg:'没有找到该用户'
        })
      }
    }
  })
};


// 获取所有试卷的考试
exports.getAllPagers = async function (req,res) {
  let  pageSize = parseInt(req.query.pageSize) || 20;
  let  pageNumber = parseInt(req.query.pageNumber) || 1;
  let  skip = (pageNumber-1)*pageSize; // 跳过几条
  const query1 = Paper.find();
  const query2 = Paper.find();
  const total = await query1.count().exec();
  const data = await query2.skip(skip).limit(pageSize).exec();
  res.json({
    status: '0',
    result: data,
    total: total,
    msg: 'success'
  })
};

// 获取考试记录
exports.getExamLogs = function (req, res){
  let userName =req.session.userName;
  let name = req.query.name;
    // 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数
  let  pageSize = parseInt(req.query.pageSize);
  let  pageNumber = parseInt(req.query.pageNumber);
  let  skip = (pageNumber-1)*pageSize; // 跳过几条
  let  reg = new RegExp(name,'i'); // 在nodejs中，必须要使用RegExp，来构建正则表达式对象。
  Student.findOne({"userName":userName},{"exams":{$slice:[skip,pageSize]}}).populate({path:'exams._paper',match:{name: reg}})
    .exec((err,doc) => {
      if (err) {
        res.json({
          status:'1',
          msg: err.message
        })
      } else {
        if (doc) {
          res.json({
            status: '0',
            msg:'success',
            result:doc,
            count: doc.exams.length?doc.exams.length:0
          })
        } else {
          res.json({
            status: '2',
            msg:'没有该试卷'
          })
        }
      }
    })
};



exports.generateAccount = function (req, res){
  if(!req.query.id){
    res.json({
      status: '400001',
      msg:'没有传专家ID'
    })
    return;
  }
  let userid;

  try{
    userid = getDecrypt(req.query.id);
  }catch(e){
    res.json({
      status: '400001',
      msg:'没有传专家ID'
    })
    return;
  }

  let userInfo = {
    userId: userid,
    userName: '评标专家_'+new Date().getTime()+'_'+Math.floor(Math.random()*1000),
    passWord: mdHash(userid + '365trade_pingbiaoxitong')
  };
  Student.findOne({userId: userid},(err,doc) => {
    if(err) {
        res.json({
          status:'500000',
          msg:err.message
        })
      } else {
        if(doc) {
          res.json({
            status:'500003',
            msg: '用户已存在'
          })
          } else {
            userInfo.exams = [];
            Student.create(userInfo,(err1,doc1) => {
              if(err1) {
                res.json({
                  status:'500001',
                  msg: err1.message
                })
                }else {
                  if(doc1) {
                    res.json({
                      status: '200000',
                      msg: 'sucess'
                    })
                    } else {
                      res.json({
                        status:'500002',
                        msg:'注册失败'
                      })
                    }
                }
            })
          }
      }
  })
}

// 获取考试记录
exports.getExamLogsByUserId = function (req, res){
  //console.log('======================:'+getDESDataKey('专家第0000000000001号'))
  if(!req.query.id){
    res.json({
      status: '400001',
      msg:'没有传专家ID'
    })
    return;
  }
  let userid;

  try{
    userid = getDecrypt(req.query.id);
  }catch(e){
    res.json({
      status: '400001',
      msg:'没有传专家ID'
    })
    return;
  }
    // 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数
  let  pageSize = parseInt(req.query.pageSize) || 1000000;
  let  pageNumber = parseInt(req.query.pageNumber) || 1;
  let  skip = (pageNumber-1)*pageSize; // 跳过几条
  Student.findOne({"userId":userid},{"exams":{$slice:[skip,pageSize]}}).populate({path:'exams._paper'})
    .exec((err,doc) => {
      if (err) {
        res.json({
          status:'1',
          msg: err.message
        })
      } else {
        if (doc) {
          var result = [];
          if(doc.exams)
          for(var i=0;i<doc.exams.length;i++){
            var exam = doc.exams[i];
            result.push({
              assessment_code:exam._id,
              starttime: exam.startTime.toLocaleString(),
              endtime: exam.date.toLocaleString(),
              content: exam.desc,
              through: exam._paper ? (exam.score == exam._paper.totalPoints ? 1 : 0) : (exam.score > 80 ? 1 : 0)
            });
          }
          res.json({
            status: '0',
            msg:'success',
            result:result
          })
        } else {
          res.json({
            status: '2',
            msg:'没有该专家或者该专家还没有成绩'
          })
        }
      }
    })
};

function toUnicodeFun(data) {
  if(!data) return '';
  if (data == '' || typeof data == 'undefined') return '请输入汉字';
  var str = '';
  for (var i = 0; i < data.length; i++) {
    str += '\\u' + data.charCodeAt(i).toString(16);
  }
  return str;
}


// 获取考试信息
exports.getExams = function (req,res) {
  let userName =req.session.userName;
  let name = req.query.name;
    // 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数
  let  pageSize = parseInt(req.query.pageSize);
  let  pageNumber = parseInt(req.query.pageNumber);
  let skip = (pageNumber-1)*pageSize; // 跳过几条
  let reg = new RegExp('.*'+name.replace(/(\.|\*|\+|\?|\[|\]|\^|\-|\$|\\|\||\(|\)|\&|\#|\<|\>)/g, '\\$1')+'.*','i'); // 在nodejs中，必须要使用RegExp，来构建正则表达式对象。
  Student.findOne({"userName":userName},(err,doc)=>{
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if(doc) {
        Paper.find({startTime:{$exists:true},name:reg}).skip(skip).limit(pageSize).populate({path:'_questions'}).exec((err1,doc1)=>{
          if(err1) {
            res.json({
              status: '1',
              msg: err1.message
            })
          } else {
            if(doc1){
              let nowTime = new Date();
              let result = [];
              // 查找还在考试时间内的考试
              doc1.forEach(item => {
                if(item.no_time_limit || ((nowTime - new Date(item.startTime))/(1000*60) < item.time)){
                  result.push(item);
                }
              })
              res.json({
                status: '0',
                result: result,
                total: result.length,
                msg: 'success'
              })
            } else {
              res.json({
                status: '1',
                msg: '没有可以参加的考试'
              })
            }
          }
        })
      } else {
        res.json({
          status:'1',
          msg:'请登录'
        })
      }
    }
  })
};
// 获取试卷内容
exports.getExamInfo = function (req,res) {
  let userName = req.session.userName;
  let id = req.query.id;
  Student.findOne({"userName":userName},(err,doc)=>{
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
      } else {
        if(doc) {
          Paper.findOne({'_id':id}).populate({path: '_questions', populate: {path: '_operation'}}).exec((err1,doc1) => {
            if (err1) {
                res.json({
                    status:'1',
                    msg: err.message
                })
              } else {
                if (doc1) {
                    res.json({
                        status: '0',
                        msg:'success',
                        result:doc1
                    })
                  } else {
                    res.json({
                        status: '2',
                        msg:'没有该试卷'
                    })
                  }
              }
            })
          }
      }
  })
};

// 提交考试
exports.submitExam = function (req, res) {
  let userName = req.session.userName;
  let id = req.body.id;
  let score = req.body.score;
  let startTime = req.body.startTime;
  let answers = req.body.answers;
  let pbyj = req.body.pbyj;
  Student.findOne({"userName":userName},(err,doc)=>{
    if(err) {
        res.json({
          status: '1',
          msg: err.message
        })
      } else {
        if(doc) {
          if(id === ''|| score === ''){
            res.json({
              status: '2',
              msg: '参数错误'
            })
            return
          }
          doc.exams.push({
            _paper:id,
            date: new Date(),
            isSure: !answers.length > 0,
            score:score,
            answers: answers,
            startTime: startTime,
            desc: pbyj
          })
          Student.updateOne({_id:doc._id}, doc, function(err){
            if(err){
              console.log(err);
            }else{
              console.log('--------------------save student success----------------------');
            }
          });
          Paper.findOne({'_id':id},(err1,doc1) => {
            if(err1) {
              res.json({
                status:'1',
                msg: err1.message
              })
            } else{
              if(doc1) {
                doc1.examnum += 1;
                Paper.updateOne({_id:doc1._id}, doc1, function(err){
                  if(err){
                    console.log(err);
                  }else{
                    console.log('--------------------save Paper success----------------------');
                  }
                });
                res.json({
                  status: '0',
                  msg: 'success'
                })
              } else {
                res.json({
                  status: '1',
                  msg: '没有找到该试卷'
                })
              }
            }
          })
          
        } else {
          res.json({
            status: '1',
            msg: '没找到当前用户!'
          })
        }
      }
  })
}


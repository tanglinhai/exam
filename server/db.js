var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dbUrl = 'mongodb://127.0.0.1:27017/examSystem';
var db = mongoose.connect(dbUrl, { useMongoClient: true });


db.then(
  () => { 
  	/** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
  	console.log('数据库链接成功!');
  },
  err => { 
	  /** handle initial connection error */ 
	  console.log('数据库链接失败：'+ error);
	}
);

module.exports = db;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TeacherSchema = new Schema({
  userId: String, // 教师工号
  userName: String, // 用户名
  passWord: String, // 密码
  age: String, // 教师年龄
  _papers:[{ type: Schema.Types.ObjectId, ref: 'Paper' }]
})
module.exports = mongoose.model('Teacher', TeacherSchema);

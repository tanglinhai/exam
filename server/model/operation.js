var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OperationSchema = new Schema({
  name: String, // 操作题名称
  type: String
})
module.exports = mongoose.model('Operation', OperationSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OperationSchema = new Schema({
  name: String, // 操作题名称
})
module.exports = mongoose.model('Operation', OperationSchema);

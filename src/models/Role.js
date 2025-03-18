const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
  resource: String,
  actions: [String]
});

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  permissions: [PermissionSchema]
});

module.exports = mongoose.model('Role', RoleSchema);

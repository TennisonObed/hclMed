const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const roleSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['doctor', 'nurse', 'technician'],
      required: true,
    },
    permissions: [{
      type: String,
      required: true,
    }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role; 
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const staffSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    staffCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    }],
    staffIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
    }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
staffSchema.plugin(toJSON);
staffSchema.plugin(paginate);

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff; 
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const allotmentSchema = mongoose.Schema(
  {
    shiftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shift',
      required: true,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
allotmentSchema.plugin(toJSON);
allotmentSchema.plugin(paginate);

const Allotment = mongoose.model('Allotment', allotmentSchema);

module.exports = Allotment; 
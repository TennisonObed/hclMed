const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const shiftSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    type: {
      type: String,
      enum: ['morning', 'afternoon', 'night'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
shiftSchema.plugin(toJSON);
shiftSchema.plugin(paginate);

const Shift = mongoose.model('Shift', shiftSchema);

module.exports = Shift; 
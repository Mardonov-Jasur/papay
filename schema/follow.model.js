const mongoose = require("mongoose");
const { order_status_enums } = require("../lib/config");
const Schema = mongoose.Schema;

const followSchema = new mongoose.Schema(
  {
    follow_id: { type: Schema.Types.ObjectId, required: true },
    subscribe_id: { type: Schema.Types.ObjectId, required: true }
  },
  { timestamps: true }
);

followSchema.index({ follow_id: 1, subscribe_id: 1 }, {unique: true })

module.exports = mongoose.model("Follow", followSchema);

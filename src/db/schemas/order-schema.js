import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }),
      required: true
    },
    total_cnt: {
      type: Number,
      required: true
    },
    total_price: {
      type: Number,
      required: true
    },
    delivered: {
      type : Date,
      default: Date.now,
      required: true
    },
    paid: {
      type: Date,
      default: null,
      required: true
    },
    deleted_at: {
      type: Date,
      default: null,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export { OrderSchema };
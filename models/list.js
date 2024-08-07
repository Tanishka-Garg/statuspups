import { Schema, model, models } from 'mongoose';

const ResponseCodeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for authentication
  },
  name: {
    type: String,
    required: [true, 'List name is required.'],
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  responseCodes: [{
    code: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
      required: true,
    },
  }],
});

const ResponseCodeList = models.ResponseCodeList || model('ResponseCodeList', ResponseCodeSchema);

export default ResponseCodeList;

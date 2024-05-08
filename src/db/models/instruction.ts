import { model, Schema, Document, Types, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface QuestionInstruction extends Document {
  id: Types.ObjectId | null | undefined;
  name: string;
  details: {
    studentDetails: string[];
    generalInstructions: {
      title: string;
      instructions: string[];
    };
  };
  isActive: boolean | null | undefined;
  createdBy: Types.ObjectId | null | undefined;
  updatedBy: Types.ObjectId | null | undefined;
}

const QuestionInstruction: Schema = new Schema(
  {
    name: { type: String, required: true },
    details: {
      studentDetails: [{ type: String }],
      generalInstructions: { title: { type: String }, instructions: [{ type: String }] },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

QuestionInstruction.plugin(mongoosePaginate);

const QuestionInstructions = model<QuestionInstruction, PaginateModel<QuestionInstruction>>(
  'QuestionInstruction',
  QuestionInstruction,
  'QuestionInstruction',
);
export default QuestionInstructions;

import { model, Schema, Document, Types, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

type Example = {
  show: boolean | null | undefined;
};

type QuestionDetails = {
  image: string | null | undefined;
};

type AnswerDetails = {
  review: string | null | undefined;
  remember: string | null | undefined;
  solve: string | null | undefined;
};

type OptionDetails = {
  text: string | null | undefined;
};

interface Question extends Document {
  id: Types.ObjectId | null | undefined;
  categoryId: Types.ObjectId | null | undefined;
  videoId: Types.ObjectId | null | undefined;
  question: string | null | undefined;
  type: string | null | undefined;
  tags: Types.ObjectId[] | null | undefined;
  chapterId: Types.ObjectId | null | undefined;
  questionDetails: QuestionDetails;
  isImageOption: boolean | null | undefined;
  options: string[] | null | undefined;
  imageOptions: string[] | null | undefined;
  answer: string | null | undefined;
  example: Example;
  answerDetails: AnswerDetails;
  optionDetails: OptionDetails;
  difficulty: string | null | undefined;
  marks: number | null | undefined;
  subject: string | null | undefined;
  grades: Types.ObjectId[] | null | undefined;
  isActive: boolean | null | undefined;
  createdBy: Types.ObjectId | null | undefined;
  updatedBy: Types.ObjectId | null | undefined;
}

const QuestionSchema: Schema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId },
    videoId: { type: Schema.Types.ObjectId },
    question: { type: String },
    type: { type: String },
    questionDetails: { type: Object },
    options: [{ type: String }],
    isImageOption: { type: Boolean, default: false },
    imageOptions: [{ type: String }],
    answer: { type: String },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }],
    chapterId: { type: Schema.Types.ObjectId },
    example: {
      show: { type: Boolean },
    },
    answerDetails: {
      review: { type: String, default: '' },
      remember: { type: String, default: '' },
      solve: { type: String, default: '' },
    },
    optionDetails: {
      text: { type: String, default: '' },
    },
    difficulty: { type: String },
    marks: { type: Number },
    subject: { type: String },
    grades: [{ type: Schema.Types.ObjectId }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

QuestionSchema.plugin(mongoosePaginate);

const Question = model<Question, PaginateModel<Question>>('Question', QuestionSchema, 'Question');
export default Question;

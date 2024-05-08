import { model, Schema, Document, Types, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface QuestionForQuestionPaper {
  questionId: Types.ObjectId;
  questionSpace: number;
  optionSpace: number[] | null | undefined;
}

interface QuestionPaper extends Document {
  id: Types.ObjectId | null | undefined;
  campusId: Types.ObjectId[] | null | undefined;
  templateId: Types.ObjectId | null | undefined;
  batchId: Types.ObjectId[] | null | undefined;
  instructionId: Types.ObjectId | null | undefined;
  category: string | null | undefined;
  title: string | null | undefined;
  tags: Types.ObjectId[] | null | undefined;
  description: string | null | undefined;
  examDate: string | null | undefined;
  examDuration: string | null | undefined;
  totalMarks: number | null | undefined;
  subject: string | null | undefined;
  grade: Types.ObjectId | null | undefined;
  questionDetails: QuestionForQuestionPaper[] | null | undefined;
  pdfUrl: string | null | undefined;
  isActive: boolean | null | undefined;
  createdAt: Date | null | undefined;
  updatedAt: Date | null | undefined;
}

const QuestionForQuestionPaperSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
  questionSpace: { type: Number, required: true },
  optionSpace: [{ type: Number }],
});

const QuestionPaperSchema = new Schema(
  {
    campusId: [{ type: Types.ObjectId }],
    batchId: [{ type: Types.ObjectId }],
    instructionId: { type: Types.ObjectId, ref: 'QuestionInstruction' },
    templateId: { type: Types.ObjectId, ref: 'QuestionTemplate' },
    category: { type: String },
    title: { type: String },
    description: { type: String },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }],
    examDate: { type: String },
    examDuration: { type: String },
    totalMarks: { type: Number },
    subject: { type: String },
    grade: { type: Types.ObjectId },
    questionDetails: [QuestionForQuestionPaperSchema],
    pdfUrl: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

QuestionPaperSchema.plugin(mongoosePaginate);

const QuestionPaper = model<QuestionPaper, PaginateModel<QuestionPaper>>(
  'QuestionPaper',
  QuestionPaperSchema,
  'QuestionPaper',
);
export default QuestionPaper;

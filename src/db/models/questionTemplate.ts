import { model, Schema, Document, Types, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface QuestionTemplate extends Document {
  id: Types.ObjectId | null | undefined;
  title: string;
  description: string;
  headerImage: string;
  footerImage: string;
  isActive: boolean | null | undefined;
  createdBy: Types.ObjectId | null | undefined;
  updatedBy: Types.ObjectId | null | undefined;
};

const QuestionTemplateSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    headerImage: { type: String, required: true },
    footerImage: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

QuestionTemplateSchema.plugin(mongoosePaginate);

const QuestionTemplates = model<QuestionTemplate, PaginateModel<QuestionTemplate>>(
  'QuestionTemplate',
  QuestionTemplateSchema,
  'QuestionTemplate',
);
export default QuestionTemplates;

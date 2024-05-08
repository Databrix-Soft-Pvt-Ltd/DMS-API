import { model, Schema, Document, Types, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface Tags extends Document {
  id: Types.ObjectId | null | undefined;
  name: string;
  description: string;
  isActive: boolean | null | undefined;
  createdBy: Types.ObjectId | null | undefined;
  updatedBy: Types.ObjectId | null | undefined;
}

const TagsSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

TagsSchema.plugin(mongoosePaginate);

const Tags = model<Tags, PaginateModel<Tags>>('Tags', TagsSchema, 'Tags');
export default Tags;

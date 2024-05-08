import { Question, QuestionPaper } from '../../../db/models';
import { uploadFile } from '../../../utils/s3';

import {
  Id,
  QuestionInput,
  QuestionInputWithId,
  QuestionPaperDataInput,
  QuestionPaperInputWithId,
} from './types';

const questionMutations = {
  createQuestion: async (_: undefined, { question }: QuestionInput): Promise<Question> => {
    return await new Question(question).save();
  },
  editQuestion: async (
    _: undefined,
    { id, question }: QuestionInputWithId,
  ): Promise<Question | null> => {
    return await Question.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...question },
      },
      { new: true },
    );
  },
  uploadQuestion: async (_: undefined, { userId, file }: { userId: any; file: any }) => {
    return uploadFile(file, userId, 'question-details');
  },
  deleteQuestion: async (_: undefined, { id }: Id) => Question.findOneAndDelete({ _id: id }),

  createQuestionPaper: async (
    _: undefined,
    { questionPaper, pdf }: QuestionPaperDataInput,
  ): Promise<QuestionPaper> => {
    const uploadedUrl = await uploadFile(pdf, null, 'question-paper');
    questionPaper.pdfUrl = uploadedUrl;
    return await new QuestionPaper(questionPaper).save();
  },
  editQuestionPaper: async (
    _: undefined,
    { id, questionPaper, pdf }: QuestionPaperInputWithId,
  ): Promise<QuestionPaper | null> => {
    if (pdf !== null) {
      const uploadedUrl = await uploadFile(pdf, null, 'question-paper');
      questionPaper.pdfUrl = uploadedUrl;
    }
    return await QuestionPaper.findOneAndUpdate(
      { _id: id },
      { $set: { ...questionPaper } },
      { new: true },
    );
  },
  deleteQuestionPaper: async (_: undefined, { id }: Id) =>
    QuestionPaper.findOneAndDelete({ _id: id }),
};

export default questionMutations;

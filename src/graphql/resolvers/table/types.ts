import { Types } from 'mongoose';

export interface Id {
  id: Types.ObjectId;
}

export interface QuestionList {
  questions: Question[];
  page: Page;
}
export interface QuestionList1 {
  ID: number;
  Name: string;
  parentId: number;
  IsParent: boolean;
  IsChild: boolean;
}

export interface Page {
  limit: number;
  page: number;
  totalCount: number;
}

export interface QuestionDataInput {
  question: Question;
}

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

export type Table = {
  ID: string,
  first_name: string,
  email_id: string,
  password: string,
  is_active: boolean
}

export type Question = {
  id: Types.ObjectId | null | undefined;
  categoryId: Types.ObjectId | null | undefined;
  videoId: Types.ObjectId | null | undefined;
  question: string | null | undefined;
  tags: Types.ObjectId[] | null | undefined;
  chapterId: Types.ObjectId | null | undefined;
  type: string | null | undefined;
  questionDetails: QuestionDetails;
  isImageOption: boolean | null | undefined;
  options: string[] | null | undefined;
  imageOptions: string[] | null | undefined;
  imageOptionsForEdit?: string[];
  deletedOption?: number[];
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
};

export type QuestionForQuestionPaper = {
  questionId: Types.ObjectId;
  questionSpace: number;
  optionSpace: number[] | null | undefined;
};

export type QuestionPaper = {
  id: Types.ObjectId | null | undefined;
  campusId: Types.ObjectId[] | null | undefined;
  batchId: Types.ObjectId[] | null | undefined;
  templateId: Types.ObjectId | null | undefined;
  instructionId: Types.ObjectId | null | undefined;
  category: string | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  tags: Types.ObjectId[] | null | undefined;
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
};
export interface QuestionPaperDataInput {
  questionPaper: QuestionPaper;
  pdf: unknown;
}

export interface TableInput {
  table: Table;
}
export interface QuestionPaperList {
  questionPapers: QuestionPaper[];
  page: Page;
}

// export interface QuestionInputWithId extends QuestionInput {
//   id: Types.ObjectId;
// }
export interface QuestionPaperInputWithId extends QuestionPaperDataInput {
  id: Types.ObjectId;
}

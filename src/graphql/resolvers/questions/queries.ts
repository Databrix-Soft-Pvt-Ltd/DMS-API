import { Page, Question, QuestionPaper } from '../../../db/models';
import { parseFilter } from '../../../utils/query-utils';
import { Id, QuestionList, QuestionList1, QuestionPaperList } from './types';
import { dbConnection } from '../../../db';
type MssqlError = import('msnodesqlv8/types').Error;

const questionQueries = {
  GetAllUsers: async (_: undefined,{id, name}: { id: string; name: string },
  ): Promise<QuestionList1[] | any> => {
    const result = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC SP_Get_CheckList1 ?,?', [id, name], (err: MssqlError | undefined, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    
    return result;

  },
  getQuestion: async (_: undefined, { id }: Id): Promise<unknown> => {
    const question = await Question.findById(id);

    return question;
  },
  getAllQuestionPapers: async (
    _: undefined,
    {
      searchParam = '',
      limit,
      page,
      filter,
    }: { searchParam?: string; limit?: number; page?: number; filter?: unknown },
  ): Promise<QuestionPaperList> => {
    const parsedFilter = parseFilter(filter);
    if (limit !== undefined && page !== undefined) {
      const questionPagination = await QuestionPaper.paginate(
        {
          $and: [
            {
              $or: [
                { title: { $regex: searchParam, $options: 'i' } },
                { category: { $regex: searchParam, $options: 'i' } },
                { subject: { $regex: searchParam, $options: 'i' } },
              ],
            },
            parsedFilter,
          ],
        },
        { limit, page, sort: { createdAt: -1 } },
      );
      return {
        questionPapers: questionPagination.docs,
        page: new Page({
          limit: questionPagination.limit,
          page: questionPagination.page || 1,
          totalCount: questionPagination.totalDocs || 0,
        }),
      };
    }

    const questionPapers = await QuestionPaper.find({
      isActive: true,
    }).sort({ createdAt: -1 });

    return {
      questionPapers,
      page: new Page({
        limit: questionPapers.length,
        page: 1,
        totalCount: questionPapers.length,
      }),
    };
  },
  getQuestionPaper: async (_: undefined, { id }: Id): Promise<unknown> => {
    const questionPaper = await QuestionPaper.findById(id)
      .populate('instructionId')
      .populate('templateId')
      .populate('questionDetails.questionId');
    return questionPaper;
  },
};

export default questionQueries;

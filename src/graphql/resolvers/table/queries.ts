import { Page, Question, QuestionPaper } from '../../../db/models';
import { parseFilter } from '../../../utils/query-utils';
import { Id, QuestionList, QuestionList1, QuestionPaperList } from './types';
import { dbConnection } from '../../../db'
type MssqlError = import('msnodesqlv8/types').Error;

const questionQueries = {
  GetAllTable: async (_: undefined,{id}: { id: string },
  ): Promise<QuestionList1[] | any> => {
    const result = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetAllUser', [], (err: MssqlError | undefined, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    
    return result;

  },
};

export default questionQueries;

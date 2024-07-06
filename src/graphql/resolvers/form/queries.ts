import { dbConnection } from '../../../db';
import { AllFormParam, AllForms, GetAllForms } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const formQueries = {
  getAllForms: async (_: undefined, record: AllFormParam): Promise<GetAllForms> => {
    const result: AllForms[] = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC GetForms ?,?,?,?,?,?,?,?',
        [
            record.templateId || 0,
            record.isActive || false,
            record.page || 0,
            record.size || 0,
            record.searchColumns || '',
            record.searchParam || '',
            record.orderAsc || '',
            record.orderDesc || '',
        ],
        (err: MssqlError | undefined, res: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        },
      );
    });

    const res = result.length > 0
    ? {
        allForms: result,
        page: {
          page: record?.page || null,
          size: record?.size || null,
          totalCount: result[0].totalCount || 0,
        },
      }
    : {
        allForms: result,
        page: { page: 0, size: 0, totalCount: 0 },
      };

    return res
  },
};

export default formQueries;

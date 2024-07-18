import { dbConnection } from '../../../db';
import { AllFormParam, AllForms, GetAllForms } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const formQueries = {
  getAllForms: async (_: undefined, record: AllFormParam): Promise<GetAllForms> => {

    const { templateId, isActive, page, size, searchColumns, searchParam, orderAsc, orderDesc } = record
    if(!templateId && !isActive && !page && !size && !searchColumns && !searchParam && !orderAsc && !orderDesc){
      return {
        allForms: [],
        page: {
          page: null,
          size: null,
          totalCount: null
        }
      }
    }
    const result: AllForms[] = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC GetForms ?,?,?,?,?,?,?,?',
        [
            templateId || 0,
            isActive || false,
            page || 0,
            size || 0,
            searchColumns || '',
            searchParam || '',
            orderAsc || '',
            orderDesc || '',
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

import { dbConnection } from '../../../db';
import { AllCabinetParam, AllCabinets, cabinetMaster, GetAllCabinets } from './types';

const queries = {
  getCabinet: async (_: undefined, { id }: any): Promise<cabinetMaster[]> => {
    const result: any = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetCabinetMaster ?', [id], (err, rows: any) => {
        if (err) reject(err);

        // console.log(rows)
        resolve(rows);
      });
    });

    return result;
  },

  getAllCabinets: async (_: undefined, record: AllCabinetParam): Promise<GetAllCabinets> => {
    const result: AllCabinets[] = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC GetCabinets ?,?,?,?,?,?,?,?',
        [
          record.cabinetId || 0,
          record.isActive || false,
          record.page || 0,
          record.size || 0,
          record.searchColumns || '',
          record.searchParam || '',
          record.orderAsc || '',
          record.orderDesc || '',
        ],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            if (rows && rows.length > 0) {
              resolve(rows);
            } else {
              reject(new Error('No rows returned from the stored procedure.'));
            }
          }
        },
      );
    });

    return result.length > 0
      ? {
          allCabinet: result,
          page: {
            page: record?.page || null,
            size: record?.size || null,
            totalCount: result[0].totalCount || 0,
          },
        }
      : { 
            allCabinet: result, 
            page: { page: 0, size: 0, totalCount: 0 } 
        };
  },
};

export default queries;

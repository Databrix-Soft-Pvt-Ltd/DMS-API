import { dbConnection } from '../../../db';
import {
  AllFolderParam,
  AllFolders,
  folderMaster,
  folderMasterWithCabinet,
  GetAllFolders,
} from './types';

const queries = {
  getFolder: async (_: undefined, { id }: { id: number }): Promise<folderMaster[]> => {
    const result: any = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetFolderMaster ?', [id], (err, rows: any) => {
        if (err) reject(err);

        // console.log(rows)
        resolve(rows);
      });
    });

    return result;
  },
  getFoldersInCabinet: async (
    _: undefined,
    { cabinetId }: { cabinetId: number },
  ): Promise<folderMaster[]> => {
    const result: any = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetFoldersInCabinet ?', [cabinetId], (err, rows: any) => {
        if (err) reject(err);

        // console.log(rows)
        resolve(rows);
      });
    });

    return result;
  },

  getFolderWithCabinet: async (
    _: undefined,
    { id }: { id: number },
  ): Promise<folderMasterWithCabinet[]> => {
    const result: any = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetFolderMasterWithCabinet ?', [id], (err, rows: any) => {
        if (err) reject(err);

        // console.log(rows)
        resolve(rows);
      });
    });

    return result;
  },

  getAllFolders: async (_: undefined, record: AllFolderParam): Promise<GetAllFolders> => {
    const result: AllFolders[] = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC GetFolders ?,?,?,?,?,?,?,?',
        [
          record.folderId || 0,
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
            // console.log('rows length', rows?.length);
            // console.log('row', rows && rows[0])
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
          allFolder: result,
          page: {
            page: record?.page || null,
            size: record?.size || null,
            totalCount: result[0].totalCount || 0,
          },
        }
      : {
          allFolder: result,
          page: { page: 0, size: 0, totalCount: 0 },
        };
  },
};

export default queries;

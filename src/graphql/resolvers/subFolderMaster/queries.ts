import { dbConnection } from '../../../db';
import {
  subFolderMaster,
  subFolderMasterWithFolderAndCabinet,
  AllSubFolderParam,
  GetAllSubFolders,
  AllSubFolders,
} from './types';

const queries = {
  getSubFolder: async (_: undefined, { id }: { id: number }): Promise<subFolderMaster[]> => {
    const result: any = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetSubFolderMaster ?', [id], (err, rows: any) => {
        if (err) reject(err);

        // console.log(rows);
        resolve(rows);
      });
    });

    return result;
  },

  getRouteOfSubFolder: async (
    _: undefined,
    { id }: { id: number | null },
  ): Promise<{ nameRoute: string; idRoute: string }> => {
    if (!id) return { nameRoute: '', idRoute: '' };
    const result: { nameRoute: string; idRoute: string } = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetRouteOfSubFolder ?', [id], (err, rows: any) => {
        if (err) reject(err);
        resolve(rows[0]);
      });
    });

    return result;
  },

  getSubFolderWithFolderAndCabinet: async (
    _: undefined,
    { id }: { id: number },
  ): Promise<subFolderMasterWithFolderAndCabinet[]> => {
    const result: any = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC GetSubFolderMasterWithFolderAndCabinet ?',
        [id],
        (err, rows: any) => {
          if (err) reject(err);

          // console.log(rows);
          resolve(rows);
        },
      );
    });

    return result;
  },
  getAllSubFolders: async (_: undefined, record: AllSubFolderParam): Promise<GetAllSubFolders> => {
    const result: AllSubFolders[] = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC GetSubFolders ?,?,?,?,?,?,?,?',
        [
          record.subFolderId || 0,
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
          allSubFolder: result,
          page: {
            page: record?.page || null,
            size: record?.size || null,
            totalCount: result[0].totalCount || 0,
          },
        }
      : {
          allSubFolder: result,
          page: { page: 0, size: 0, totalCount: 0 },
        };
  },

  getSubFoldersInFolder: async (
    _: undefined,
    { folderId }: { folderId: number },
  ): Promise<subFolderMaster[]> => {
    const result: subFolderMaster[] = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetSubFoldersInFolder ?', [folderId], (err, rows: any) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
    return result;
  },
};

export default queries;

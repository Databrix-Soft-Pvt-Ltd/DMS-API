import { dbConnection } from '../../../db';
import { FileMaster } from './types';

const queries = {
  getFilesInSubFolder: async (
    _: undefined,
    { subFolderId }: { subFolderId: number },
  ): Promise<FileMaster[]> => {
    const result: FileMaster[] = await new Promise((resolve, reject) => {
      dbConnection.query('GetFilesInSubFolder ?', [subFolderId], (err, rows: any) => {
        if (err) reject(err);
        resolve(rows);
      });
    });

    return result;
  },

  getRouteOfFile: async (
    _: undefined,
    { id }: { id: number | null },
  ): Promise<{ nameRoute: string; idRoute: string }> => {
    if (!id) return { nameRoute: '', idRoute: '' };
    const result: { nameRoute: string; idRoute: string } = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetRouteOfFile ?', [id], (err, rows: any) => {
        if (err) reject(err);
        resolve(rows[0]);
      });
    });

    return result;
  },
};

export default queries;

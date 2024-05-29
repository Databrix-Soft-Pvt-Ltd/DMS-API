import { addFolderMaster, editFolderMaster } from './types';
import { dbConnection } from '../../../db';

const mutations = {
  addFolder: async (
    _: undefined,
    { add_folder_master }: { add_folder_master: addFolderMaster },
  ): Promise<{ error: string | null; message: string | null }> => {
    const { folder, cabinetId } = add_folder_master;

    const result: string = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC AddFolderMaster ?, ?, ?;',
        [folder, cabinetId, ''],
        (err, rows: any) => {
          if (err) reject(err);

          // console.log('Add Folder Rows', rows)
          resolve(rows[0].outputMessage);
        },
      );
    });

    if (result === 'Folder Added Successfully') {
      return { error: null, message: result };
    } else {
      return { error: result, message: result };
    }
  },

  editFolder: async (
    _: undefined,
    { edit_folder_master }: { edit_folder_master: editFolderMaster },
  ): Promise<{ error: string | null; message: string | null }> => {
    const { id, folder, cabinetId } = edit_folder_master;

    const result: string = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC EditFolderMaster ?, ?, ?, ?;', [id, folder, cabinetId, ''], (err, rows: any) => {
        if (err) reject(err);

        // console.log(rows)
        resolve(rows[0]?.outputMessage);
      });
    });

    if (result === 'Folder Edited Successfully') {
      return { error: null, message: result };
    } else {
      return { error: result, message: result };
    }
  },

  deleteFolder: async (
    _: undefined,
    { id }: { id: number },
  ): Promise<{ error: string | null; message: string | null }> => {
    const result: string = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC DeleteFolderMaster ?, ?;', [id, ''], (err, rows: any) => {
        if (err) reject(err);

        // console.log(rows)
        resolve(rows[0].outputMessage);
      });
    });

    if(result === 'Folder Deleted Successfully'){
        return { error: null, message: result }
    } else {
        return { error: result, message: result }
    }
  },
};

export default mutations;

import { addSubFolderMaster, editSubFolderMaster } from './types';
import { dbConnection } from '../../../db';

const mutations = {
  addSubFolder: async (
    _: undefined,
    { add_sub_folder_master }: { add_sub_folder_master: addSubFolderMaster },
  ): Promise<{ error: string | null; message: string | null }> => {
    const { sub_folder, folder_id } = add_sub_folder_master;

    const result: string = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC AddSubFolderMaster ?, ?, ?;',
        [sub_folder, folder_id, ''],
        (err, rows: any) => {
          if (err) reject(err);

          // console.log('Add Folder Rows', rows)
          resolve(rows[0].outputMessage);
        },
      );
    });

    if (result === 'Sub Folder Added Successfully') {
      return { error: null, message: result };
    } else {
      return { error: result, message: result };
    }
  },

  editSubFolder: async (
    _: undefined,
    { edit_sub_folder_master }: { edit_sub_folder_master: editSubFolderMaster },
  ): Promise<{ error: string | null; message: string | null }> => {
    const { id, sub_folder, folder_id } = edit_sub_folder_master;

    const result: string = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC EditSubFolderMaster ?, ?, ?, ?;', [id, sub_folder, folder_id, ''], (err, rows: any) => {
        if (err) reject(err);

        // console.log(rows)
        resolve(rows[0]?.outputMessage);
      });
    });

    if (result === 'Sub Folder Edited Successfully') {
      return { error: null, message: result };
    } else {
      return { error: result, message: result };
    }
  },

  deleteSubFolder: async (
    _: undefined,
    { id }: { id: number },
  ): Promise<{ error: string | null; message: string | null }> => {
    const result: string = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC DeleteSubFolderMaster ?, ?;', [id, ''], (err, rows: any) => {
        if (err) reject(err);

        // console.log(rows)
        resolve(rows[0].outputMessage);
      });
    });

    if(result === 'Sub Folder Deleted Successfully'){
        return { error: null, message: result }
    } else {
        return { error: result, message: result }
    }
  },
};

export default mutations;

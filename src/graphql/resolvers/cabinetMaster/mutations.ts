import { addCabinetMaster, editCabinetMaster } from './types';
import { dbConnection } from '../../../db';

const mutations = {
  addCabinet: async (
    _: undefined,
    { add_cabinet_master }: { add_cabinet_master: addCabinetMaster },
  ): Promise<{ error: string | null; message: string | null }> => {
    const { cabinet } = add_cabinet_master;

    const result: string = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC AddCabinetMaster ?, ?;', [cabinet, ''], (err, rows: any) => {
        if (err) reject(err);
        else {
          // console.log(rows)
          resolve(rows[0]?.outputMessage);
        }
      });
    });

    if (result === 'Cabinet Added Successfully') {
      return { error: null, message: result };
    } else {
      return { error: result, message: result };
    }
  },

  editCabinet: async (
    _: undefined,
    { edit_cabinet_master }: { edit_cabinet_master: editCabinetMaster },
  ): Promise<{ error: string | null; message: string | null }> => {
    const { id, cabinet } = edit_cabinet_master;

    const result: string = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC EditCabinetMaster ?, ?, ?;', [id, cabinet, ''], (err, rows: any) => {
        if (err) reject(err);

        // console.log(rows)
        resolve(rows[0].outputMessage);
      });
    });

    if (result === 'Cabinet Updated Successfully') {
      return { error: null, message: result };
    } else {
      return { error: result, message: result };
    }
  },

  deleteCabinet: async (
    _: undefined,
    { id }: { id: number },
  ): Promise<{ error: string | null; message: string | null }> => {
    const result: string = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC DeleteCabinetMaster ?, ?;', [id, ''], (err, rows: any) => {
        if (err) reject(err);

        // console.log(rows)
        resolve(rows[0].outputMessage);
      });
    });

    if (result === 'Cabinet Deleted Successfully') {
      return { error: null, message: result };
    } else {
      return { error: result, message: result };
    }
  },

  changeActiveStatusOfCabinet: async (
    _: undefined,
    { id, isActive }: { id: number; isActive: boolean },
  ): Promise<{ error: string | null; message: string }> => {
    const result: string = await new Promise((resolve, reject) => {
      dbConnection.query(
        'ChangeActiveStatusOfCabinet @id=?, @isActive=?, @outputMessage=?',
        [id, isActive, ''],
        (err, rows: any) => {
          if (err) {
            reject(err);
          }

          resolve(rows[0].outputMessage);
        },
      );
    });

    if (result === 'Status Changed Successfully') {
      return { error: null, message: result };
    } else {
      return { error: result, message: result };
    }
  },
};

export default mutations;

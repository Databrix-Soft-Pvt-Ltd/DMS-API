import { Question, QuestionPaper } from '../../../db/models';
import { uploadFile } from '../../../utils/s3';
import { dbConnection } from '../../../db'
type MssqlError = import('msnodesqlv8/types').Error;

import {
  Id,
  // QuestionInput,
  // QuestionInputWithId,
  TableInput,
  QuestionPaperDataInput,
  QuestionPaperInputWithId,
} from './types';

const questionMutations = {
  createTable: async (_: undefined, { table }: TableInput): Promise<String> => {
    const result = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC CreateTable ?,?,?,?', [table.first_name, table.email_id, table.password, table.is_active], (err: MssqlError | undefined, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    console.log(result)
    return "Record Saved Successfully";
  },

};

export default questionMutations;

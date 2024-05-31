import { dbConnection } from '../../../db';
import { user } from './types';

const queries = {
  getAllUsers: async (_: undefined, { userId }: { userId: number }): Promise<user[]> => {
    const result: user[] = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetAllUsers ?', [userId], (err, res: any) => {
        if(err) reject(err)
        else resolve(res)
      });
    });

    return result;
  },
};

export default queries;

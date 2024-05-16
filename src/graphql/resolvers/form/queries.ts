
import { dbConnection } from '../../../db';
import { getAllForms } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const formQueries = {
    getAllForms: async (_: undefined, { template_id }: { template_id: number }): Promise<getAllForms[]> => {

        const result: getAllForms[] = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC GetAllForms ?', [template_id], (err: MssqlError | undefined, res: any) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
        return result
    }
}

export default formQueries
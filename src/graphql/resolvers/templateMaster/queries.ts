
import { dbConnection } from '../../../db'
import { get_all_templates } from './types'

const templateQueries = {
    getAllTemplates: async (_: undefined, { id, is_active }: { id: number, is_active: boolean }): Promise<get_all_templates[]> => {
        
        const result: get_all_templates[] = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC GetTemplates ?', [id], (err, rows) => {
                if (err) {
                    reject(err); // Handle error more specifically if possible
                } else {
                    if (rows && rows.length > 0) {
                        resolve(rows);
                    } else {
                        reject(new Error("No rows returned from the stored procedure."));
                    }
                }
            });
        });
        return result;
    }
}

export default templateQueries
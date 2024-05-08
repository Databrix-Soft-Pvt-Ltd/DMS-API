
import { dbConnection } from '../../../db'
import { get_roles } from './types'

const roleQueries = {
    getAllRoles: async (_: undefined, { role_id, is_active }: { role_id: number, is_active: boolean }): Promise<get_roles[]> => {

        const result: get_roles[] = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC GetRoles ?', [role_id], (err, rows) => {
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

export default roleQueries
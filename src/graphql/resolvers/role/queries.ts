
import { dbConnection } from '../../../db'
import { get_roles } from './types'

const roleQueries = {
    getAllRoles: async (_: undefined, { role_id }: { role_id: number }): Promise<get_roles[]> => {

        const result: get_roles[] = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC GetRoles ?', [role_id], (err, rows) => {
                if (err) {
                    reject(err); // Handle error more specifically if possible
                } else {
                    if (rows) {
                        resolve(rows);
                    } else {
                        reject(new Error("No rows returned from the stored procedure."));
                    }
                }
            });
        });

        result.forEach((item, index) => {
            result[index].created_date = new Date(item.created_date).toISOString()
        })

        return result;
    }
}

export default roleQueries
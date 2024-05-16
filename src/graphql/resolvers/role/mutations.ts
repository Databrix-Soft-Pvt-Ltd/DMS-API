
import { dbConnection } from '../../../db';
import { add_role, edit_role } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const roleMutations = {
    addRole: async (_: undefined, { add_role }: { add_role: add_role }): Promise<string> => {

        console.log('addRole', add_role)
        const { role_name, description, created_by } = add_role

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddRole ?, ?, ?, ?', [role_name, description, created_by, ''], (err, rows) => {
                if (err) {
                    reject(err); // Handle error more specifically if possible
                } else {
                    console.log(rows)
                    // Check if there are any rows returned
                    if (rows && rows.length > 0) {
                        const message = rows[0].outputMessage; // Extract the output parameter value
                        resolve({ success: true, message });
                    } else {
                        reject(new Error("No rows returned from the stored procedure."));
                    }
                }
            });
        });

        console.log(result);
        return result.message;
    },

    editRole: async (_: undefined, { id, edit_role }: { id: number, edit_role: edit_role }): Promise<string> => {
        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC EditRole ?, ?, ?, ?', [edit_role.role_name, edit_role.description, id ,''], (err, rows) => {
                if (err) {
                    reject(err); // Handle error more specifically if possible
                } else {
                    // Check if there are any rows returned
                    if (rows && rows.length > 0) {
                        const message = rows[0].outputMessage; // Extract the output parameter value
                        resolve({ success: true, message });
                    } else {
                        reject(new Error("No rows returned from the stored procedure."));
                    }
                }
            });
        });

        console.log(result);
        return result.message;
    },

    deleteRole: async (_: undefined, { id } : { id: number }): Promise<string> => {
        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC DeleteRole ?, ?', [id, ''], (err, rows) => {
                if (err) {
                    reject(err); // Handle error more specifically if possible
                } else {
                    // Check if there are any rows returned
                    if (rows && rows.length > 0) {
                        const message = rows[0].outputMessage; // Extract the output parameter value
                        resolve({ success: true, message });
                    } else {
                        reject(new Error("No rows returned from the stored procedure."));
                    }
                }
            });
        });

        console.log(result);
        return result.message;
    }
};

export default roleMutations;
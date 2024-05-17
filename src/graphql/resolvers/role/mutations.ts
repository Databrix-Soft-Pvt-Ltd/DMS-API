
import { dbConnection } from '../../../db';
import { add_role, edit_role } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const roleMutations = {
    addRole: async (_: undefined, { add_role }: { add_role: add_role }): Promise<{ error: string | null, message: string | null }> => {

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
                        resolve(message);
                    } else {
                        reject(new Error("No rows returned from the stored procedure."));
                    }
                }
            });
        });
        
        if(result === 'Role Added Successfully'){
            return { error: null, message: result }
        } else {
            return { error: result, message: result }
        }
    },

    editRole: async (_: undefined, { id, edit_role }: { id: number, edit_role: edit_role }): Promise<{ error: string | null, message: string | null }> => {
        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC EditRole ?, ?, ?, ?', [edit_role.role_name, edit_role.description, id ,''], (err, rows) => {
                if (err) {
                    reject(err); // Handle error more specifically if possible
                } else {
                    // Check if there are any rows returned
                    if (rows && rows.length > 0) {
                        const message = rows[0].outputMessage; // Extract the output parameter value
                        resolve(message);
                    } else {
                        reject(new Error("No rows returned from the stored procedure."));
                    }
                }
            });
        });
        
        if(result === 'Role Update Successfully'){
            return { error: null, message: result }
        } else {
            return { error: result, message: result }
        }
    },

    deleteRole: async (_: undefined, { id } : { id: number }): Promise<{ error: string | null, message: string | null }> => {
        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC DeleteRole ?, ?', [id, ''], (err, rows) => {
                if (err) {
                    reject(err); // Handle error more specifically if possible
                } else {
                    // Check if there are any rows returned
                    if (rows && rows.length > 0) {
                        const message = rows[0].outputMessage; // Extract the output parameter value
                        resolve(message);
                    } else {
                        reject(new Error("No rows returned from the stored procedure."));
                    }
                }
            });
        });
        
        if(result === 'Role Deleted Successfully'){
            return { error: null, message: result }
        } else {
            return { error: result, message: result }
        }
    }
};

export default roleMutations;
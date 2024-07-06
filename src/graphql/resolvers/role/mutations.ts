
import { dbConnection } from '../../../db';
import { addRole, editRole } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const roleMutations = {
    addRole: async (_: undefined, { addRole }: { addRole: addRole }): Promise<{ error: string | null, message: string | null }> => {
        const { roleName, description, createdBy } = addRole

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddRole ?, ?, ?, ?', [roleName, description, createdBy, ''], (err, rows) => {
                if (err) {
                    reject(err); // Handle error more specifically if possible
                } else {
                    // console.log(rows)
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

    editRole: async (_: undefined, { id, editRole }: { id: number, editRole: editRole }): Promise<{ error: string | null, message: string | null }> => {
        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC EditRole ?, ?, ?, ?, ?', [editRole.roleName || '', editRole.description || '', id || 0, editRole.isActive ? 1 : 0,''], (err, rows) => {
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
        
        if(result === 'Role Updated Successfully'){
            return { error: null, message: result }
            
        } else if (result === 'Role Status Changed Successfully')
            return { error: null, message: result } 
        else {
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
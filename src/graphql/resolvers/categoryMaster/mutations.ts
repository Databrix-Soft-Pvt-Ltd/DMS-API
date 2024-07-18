
import { dbConnection } from '../../../db';
import { addCategory } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const categoryMutations = {
    addCategory: async (_: undefined, { addCategory }: { addCategory: addCategory }): Promise<{ error: string | null, message: string }> => {

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddCategoryMaster ?, ?, ?', [addCategory.name, addCategory.description, ''], (err, rows) => {
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

        if(result === 'Category Added Successfully'){
            return { error: null, message: result }
        }
        else {
            return { error: result, message: result}
        }
    },

    editCategory: async (_: undefined, { id, editCategory }: { id: number, editCategory: addCategory }): Promise<{ error: string | null, message: string }> => {

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC EditCategoryMaster ?, ?, ?, ?, ?', [editCategory?.name || '', id, editCategory?.description || '', editCategory?.isActive==true ? 1 : 0, ''], (err, rows) => {
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
        // console.log(result)
        if(result === 'Category Updated Successfully'){
            return { error: null, message: result }
        } else {
            return { error: result, message: result }
        }
    },

    deleteCategory: async (_: undefined, { id } : { id: number }): Promise<{ error: string | null, message: string }> => {
        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC DeleteCategoryMaster ?, ?', [id, ''], (err, rows) => {
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

        if(result === 'Category Master Deleted Successfully'){
            return { error: null, message: result }
        } else {
            return { error: result, message: result }
        }
    },
};

export default categoryMutations;
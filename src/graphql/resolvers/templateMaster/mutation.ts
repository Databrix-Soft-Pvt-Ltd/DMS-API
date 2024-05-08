
import { dbConnection } from '../../../db';
import { add_template_master, edit_template_master } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const templateMutations = {
    addTemplate: async (_: undefined, { add_template }: { add_template: add_template_master }): Promise<string> => {

        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddTemplateMaster ?, ?, ?', [add_template.name, add_template.page_id, ''], (err, rows) => {
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

    editTemplate: async (_: undefined, { id, edit_template }: { id: number, edit_template: add_template_master }): Promise<string> => {
        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC EditTemplateMaster ?, ?, ?, ?', [edit_template.name, edit_template.page_id, id ,''], (err, rows) => {
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

    deleteTemplate: async (_: undefined, { id } : { id: number }): Promise<string> => {
        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC DeleteTemplateMaster ?, ?', [id, ''], (err, rows) => {
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

export default templateMutations;
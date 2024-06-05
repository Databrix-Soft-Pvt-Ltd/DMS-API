
import { dbConnection } from '../../../db';
import { AddRequiredFields, addTemplate } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const templateMutations = {
    addTemplate: async (_: undefined, { addTemplate }: { addTemplate: addTemplate }): Promise<{ error: string | null, message: string }> => {

        console.log('add template', addTemplate)
        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddTemplateMaster ?, ?, ?, ?', [addTemplate.name, addTemplate.pageId, addTemplate.description, ''], (err, rows) => {
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

        if(result === 'Templated Added Successfully'){
            return { error: null, message: result }
        }
        else {
            return { error: result, message: result}
        }
    },

    editTemplate: async (_: undefined, { id, editTemplate }: { id: number, editTemplate: addTemplate }): Promise<{ error: string | null, message: string }> => {
        console.log(id,editTemplate)
        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC EditTemplateMaster ?, ?, ?, ?, ?, ?', [editTemplate?.name || '', editTemplate?.pageId || 0, id, editTemplate?.description || '', editTemplate?.isActive==true ? 1 : 0, ''], (err, rows) => {
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
        console.log(result)
        if(result === 'Template Updated Successfully'){
            return { error: null, message: result }
        } else {
            return { error: result, message: result }
        }
    },

    deleteTemplate: async (_: undefined, { id } : { id: number }): Promise<{ error: string | null, message: string }> => {
        const result: any = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC DeleteTemplateMaster ?, ?', [id, ''], (err, rows) => {
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

        if(result === 'Template Master Deleted Successfully'){
            return { error: null, message: result }
        } else {
            return { error: result, message: result }
        }
    },

    addRequiredFields: async (_: undefined, { AddRequiredFields }: { AddRequiredFields: AddRequiredFields }): Promise<{ error: string | null, message: string }> => {
        
        const { pageId, requiredFields } = AddRequiredFields
        console.log('pageId, requiredFields', pageId, requiredFields)
        const result: string = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddRequiredFields ?, ?, ?', [pageId, requiredFields, ''], (err, rows: any) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows[0]?.outputMessage)
                }
            })
        })

        if(result === 'Required Fields Added Successfully'){
            return { error: null, message: result }
        } else {
            return { error: result, message: result }
        }
    }
};

export default templateMutations;
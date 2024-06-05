
import { dbConnection } from '../../../db';
import { formMaster } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const formQueries = {
    addForm: async (_: undefined, { addForm }: { addForm: formMaster }): Promise<string> => {
        const promises = addForm.formDetails.map(async (formDetail) => {
            const { databaseName, fieldName, dataType, maxLength } = formDetail;
            try {
                const rowss = await new Promise((resolve, reject) => {
                    dbConnection.query('EXEC AddAndEditForm ?, ?, ?, ?, ?, ?', [databaseName, fieldName, dataType, maxLength, addForm.templateId, ''], (err, rows: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows);
                        }
                    });
                });
            } catch (error) {
                console.error(error);
                throw error;
            }
        });
        try {
            const results = await Promise.all(promises);
        } catch (error) {
            console.error('Error processing form details:', error);
        }

        return "Record Added Successfully"
    },
    
    deleteForm: async (_: undefined, { formId }: { formId: number }): Promise<string> => {

        // console.log('form id', formId) #Solved

        const result: string = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC DeleteForm ?,?', [formId, ''], (err, result: any) => {
                if(err){
                    reject(err)
                } else {
                    resolve(result[0].outputMessage)
                }
            })
        })
        return result
    }
}

export default formQueries
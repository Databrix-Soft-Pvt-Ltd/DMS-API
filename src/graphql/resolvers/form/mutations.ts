
import { dbConnection } from '../../../db';
import { formMaster } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const formQueries = {
    addForm: async (_: undefined, { add_forms }: { add_forms: formMaster }): Promise<string> => {
        console.log(add_forms)
        const promises = add_forms.form_details.map(async (formDetail) => {
            const { database_name, field_name, datatype, max_length } = formDetail;
            try {
                // console.log(1)
                const rowss = await new Promise((resolve, reject) => {
                    dbConnection.query('EXEC AddAndEditForm ?, ?, ?, ?, ?, ?', [database_name, field_name, datatype, max_length, add_forms.template_id, ''], (err, rows: any) => {
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
            // console.log('results', results); // Array of results for each form detail
        } catch (error) {
            console.error('Error processing form details:', error);
        }
        

        return "Record Added Successfully"
    },
    
    deleteForm: async (_: undefined, { form_id }: { form_id: number }): Promise<string> => {

        // console.log('form id', form_id) #Solved

        const result: string = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC DeleteForm ?,?', [form_id, ''], (err, result: any) => {
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
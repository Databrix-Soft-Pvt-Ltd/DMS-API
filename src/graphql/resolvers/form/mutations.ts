import { dbConnection } from '../../../db';
import { formDetails, formMaster, editFormMaster, editFormDetails } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const formMutations = {
  addForm: async (
    _: undefined,
    { addForm }: { addForm: formMaster },
  ): Promise<{ error: string | null; message: string }> => {
    const { templateId } = addForm;

    const clearToAddForm: 1 | 2 | 3 | 4 = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC TemplateHasForms ?, ?', [templateId, ''], (err, rows: any) => {
        if (err) resolve(1);
        else if (rows.length > 0) {
          if (rows[0]?.outputMessage === 'Template Already Has Forms') resolve(2);
          else resolve(3);
        } else resolve(4);
      });
    });

    if (clearToAddForm === 1) return { error: 'Database Error', message: 'Database Error' };
    else if (clearToAddForm === 2)
      return { error: 'Template Already Has Forms', message: 'Template Already Has Forms' };
    else if (clearToAddForm === 4)
      return { error: 'No Output From Database', message: 'No Output From Database' };
    else {
      const failedToAddLogs: formDetails[] = [];

      addForm.formDetails.map(async (each) => {
        const result: string = await new Promise((resolve, reject) => {
          dbConnection.query(
            `EXEC AddFormMaster 
            @databaseName=?,
            @fieldName=?,
            @dataType=?,
            @maxLength=?,
            @templateId=?,
            @outputMessage=?`,
            [each.databaseName, each.fieldName, each.dataType, each.maxLength, templateId, ''],
            (err, rows: any) => {
              if (err) {
                failedToAddLogs.push(each);
                resolve('Database Error, Failed To Add');
              } else if (rows[0]?.outputMessage === 'Form Added Successfully') {
                resolve('Form Added Successfully');
              } else {
                failedToAddLogs.push(each);
                resolve('No Output From Database');
              }
            },
          );
        });

        console.log(result);
      });

      if (failedToAddLogs.length > 0) {
        return { error: JSON.stringify(failedToAddLogs), message: 'Failed To Add Few Forms' };
      } else {
        return { error: null, message: 'All Forms Successfully Added' };
      }
    }
  },

  editForm: async (
    _: undefined,
    { editForm }: { editForm: editFormMaster },
  ): Promise<{ error: string | null; message: string }> => {
    // console.log('edit form ', editForm)
    const { templateId, formDetails } = editForm;

    const forms: editFormDetails[] = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetForms @templateId=?', [templateId], (err, rows: any) => {
        if (err) reject(err);
        else {
          resolve(rows);
        }
      });
    });

    const editFormIds = formDetails?.map((each) => each.id);
    const allFormIds = forms?.map((each) => each.id);
    const deleteFormIds = allFormIds.filter((x) => !editFormIds.includes(x));

    const deleteResult: string = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC DeleteMultipleFormUsingTemplateId ?, ?, ?',
        [templateId, deleteFormIds.join(','), ''],
        (err, rows: any) => {
          if (err) {
            console.log('errorrr', err)
            reject(err)
          }
          else resolve(rows[0]?.outputMessage);
        },
      );
    });

    if (deleteResult !== 'Successfully Deleted All Forms' && deleteResult !== 'No Forms to Delete') {
      return { error: 'Cannot Delete', message: 'Cannot Delete' };
    }

    const failedToEditLogs: editFormDetails[] = formDetails.filter(async (each: editFormDetails) => {
      const result: string = await new Promise((resolve, reject) => {
        dbConnection.query('EXEC EditFormMaster ?,?,?,?,?,?,?',
          [each.id, each.databaseName, each.fieldName, each.dataType, each.maxLength, templateId, ''],
          (err, rows: any) => {
            if (err) {
              console.log('pushing each', each)
              console.log(err)
              resolve('Database Error, Failed To Edit');
              return true;
            } else if (rows[0]?.outputMessage === 'Form Edited Successfully' || rows[0]?.outputMessage === 'Form Added Successfully') {
              resolve('Form Edited Successfully');
              return false;
            } else {
              resolve('No Output From Database');
              return true;
            }
          }
        )
      })
    })

    if (failedToEditLogs.length > 0) {
      return { error: JSON.stringify(failedToEditLogs), message: 'Failed To Edit Few Forms' };
    } else {
      return { error: null, message: 'All Forms Successfully Edited' };
    }
  },

  deleteForm: async (
    _: undefined,
    { formId }: { formId: number },
  ): Promise<{ error: string | null; message: string }> => {
    const result: string = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC DeleteFormMaster ?,?', [formId, ''], (err, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].outputMessage);
        }
      });
    });

    if (result === 'Form Deleted Successfully') {
      return { error: null, message: result };
    } else return { error: result, message: result };
  },
  changeActiveStatusOfForm: async (
    _: undefined,
    { id, isActive }: { id: number; isActive: boolean },
  ): Promise<{ error: string | null; message: string }> => {
    const result: string = await new Promise((resolve, reject) => {
      dbConnection.query(
        'ChangeActiveStatusOfForm @id=?, @isActive=?, @outputMessage=?',
        [id, isActive, ''],
        (err, rows: any) => {
          if (err) {
            reject(err);
          }

          resolve(rows[0].outputMessage);
        },
      );
    });

    if (result === 'Status Changed Successfully') {
      return { error: null, message: result };
    } else {
      return { error: result, message: result };
    }
  },
};

export default formMutations;

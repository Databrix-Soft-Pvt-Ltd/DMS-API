import { RequiredField } from 'aws-sdk/clients/connectcases';
import { dbConnection } from '../../../db';
import { AllTemplateParam, AllTemplates, GetAllTemplates, RequiredFields } from './types';

const templateQueries = {
  getAllTemplates: async (_: undefined, record: AllTemplateParam): Promise<GetAllTemplates> => {

    const result: AllTemplates[] = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC GetTemplates ?,?,?,?,?,?,?,?',
        [
          record.templateId || 0,
          record.isActive || false,
          record.page || 0,
          record.size || 0,
          record.searchColumns || '',
          record.searchParam || '',
          record.orderAsc || '',
          record.orderDesc || '',
        ],
        (err, rows) => {
          if (err) {
            reject(err); // Handle error more specifically if possible
          } else {
            if (rows && rows.length > 0) {
              resolve(rows);
            } else {
              reject(new Error('No rows returned from the stored procedure.'));
            }
          }
        },
      );
    });

    return result.length > 0
      ? {
          allTemplate: result,
          page: {
            page: record?.page || null,
            size: record?.size || null,
            totalCount: result[0].totalCount || 0,
          },
        }
      : { 
            allTemplate: result, 
            page: { page: 0, size: 0, totalCount: 0 } 
        };
  },

  getActiveTemplates: async (_: undefined): Promise<any> => {
    const result: any[] = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetActiveTemplates', [], (err, rows) => {
        if (err) {
          reject(err); // Handle error more specifically if possible
        } else {
          if (rows && rows.length > 0) {
            resolve(rows);
          } else {
            reject(new Error('No rows returned from the stored procedure.'));
          }
        }
      });
    });

    result.forEach((item, index) => {
      result[index].createdDate = new Date(item.createdDate).toISOString();
    });

    return result;
  },
  getRequiredFields: async (_: undefined, { pageId }: { pageId: number }): Promise<RequiredFields[]> => {

    console.log('required fields asked', pageId)
    const result: RequiredFields[] = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetRequiredFields @pageId=?', [pageId], (err, rows: any) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
    console.log('result of required fields', result)

    return result
  }
};

export default templateQueries;

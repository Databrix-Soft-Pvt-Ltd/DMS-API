import { RequiredField } from 'aws-sdk/clients/connectcases';
import { dbConnection } from '../../../db';
import { AllCategoryParam, AllCategorys, AllCategorysWithTotalCount, GetAllCategorys } from './types';

const categoryQueries = {
  getAllCategorys: async (_: undefined, record: AllCategoryParam): Promise<GetAllCategorys> => {
    // console.log('get all categorys', record)

    const result: AllCategorysWithTotalCount[] = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC GetCategorys ?,?,?,?,?,?,?,?',
        [
          record.categoryId || 0,
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
            if (rows) {
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
          allCategorys: result,
          page: {
            page: record?.page || null,
            size: record?.size || null,
            totalCount: result[0].totalCount || 0,
          },
        }
      : {
          allCategorys: result,
          page: { page: 0, size: 0, totalCount: 0 },
        };
  },

  // getAllFreshCategorys: async(_: undefined): Promise<AllCategorys[]> => {
  //   const result: AllCategorys[] = await new Promise((resolve, reject) => {
  //     dbConnection.query('EXEC GetAllFreshCategorys', [], (err, rows) => {
  //       if (err) {
  //         reject(err); // Handle error more specifically if possible
  //       } else {
  //         if (rows && rows.length > 0) {
  //           resolve(rows);
  //         } else {
  //           reject(new Error('No rows returned from the stored procedure.'));
  //         }
  //       }
  //     });
  //   });

  //   result.forEach((item, index) => {
  //     result[index].createdDate = new Date(item.createdDate).toISOString();
  //   });

  //   return result;
  // },
  // getAllFilledCategorys: async(_: undefined): Promise<AllCategorys[]> => {
  //   const result: AllCategorys[] = await new Promise((resolve, reject) => {
  //     dbConnection.query('EXEC GetAllFilledCategorys', [], (err, rows) => {
  //       if (err) {
  //         reject(err); // Handle error more specifically if possible
  //       } else {
  //         if (rows && rows.length > 0) {
  //           resolve(rows);
  //         } else {
  //           reject(new Error('No rows returned from the stored procedure.'));
  //         }
  //       }
  //     });
  //   });

  //   result.forEach((item, index) => {
  //     result[index].createdDate = new Date(item.createdDate).toISOString();
  //   });

  //   return result;
  // },

  // getActiveCategorys: async (_: undefined): Promise<AllCategorys[]> => {
  //   const result: AllCategorys[] = await new Promise((resolve, reject) => {
  //     dbConnection.query('EXEC GetActiveCategorys', [], (err, rows) => {
  //       if (err) {
  //         reject(err); // Handle error more specifically if possible
  //       } else {
  //         if (rows && rows.length > 0) {
  //           resolve(rows);
  //         } else {
  //           reject(new Error('No rows returned from the stored procedure.'));
  //         }
  //       }
  //     });
  //   });

  //   result.forEach((item, index) => {
  //     result[index].createdDate = new Date(item.createdDate).toISOString();
  //   });

  //   return result;
  // },
  // getRequiredFieldsByPageId: async (
  //   _: undefined,
  //   { pageId }: { pageId: number },
  // ): Promise<RequiredFields[]> => {
  //   // console.log('required fields asked', pageId)
  //   const result: RequiredFields[] = await new Promise((resolve, reject) => {
  //     dbConnection.query('EXEC GetRequiredFieldsByPageId @pageId=?', [pageId], (err, rows: any) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(rows);
  //       }
  //     });
  //   });

  //   return result;
  // },
  // getRequiredFieldsByCategoryId: async (
  //   _: undefined,
  //   { categoryId }: { categoryId: number },
  // ): Promise<RequiredFields[]> => {
  //   // console.log('required fields asked', pageId)
  //   const result: RequiredFields[] = await new Promise((resolve, reject) => {
  //     dbConnection.query('EXEC GetRequiredFieldsByCategoryId @categoryId=?', [categoryId], (err, rows: any) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(rows);
  //       }
  //     });
  //   });

  //   return result;
  // },
};

export default categoryQueries;

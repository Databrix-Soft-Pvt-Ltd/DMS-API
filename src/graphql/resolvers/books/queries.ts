
import { dbConnection } from '../../../db';
import { BookInfo } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const booksQueries = {
    getBookInfo: async (_: undefined, { id }: { id: undefined }): Promise<BookInfo[]> => {
        const result: BookInfo[] = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC BookInfo', [], (err: MssqlError | undefined, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })

        return result;
    }
};

export default booksQueries;
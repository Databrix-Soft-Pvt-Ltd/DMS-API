
import { dbConnection } from '../../../db';
import { AddBookAndAuthor } from './types';
type MssqlError = import('msnodesqlv8/types').Error;

const booksMutations = {
    createBook: async (_: undefined, { book }: { book: AddBookAndAuthor }): Promise<string> => {

        const result = await new Promise((resolve, reject) => {
            dbConnection.query('EXEC AddBookAndAuthor ?,?', [book.book_name, book.author_name], (err: MssqlError | undefined, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        console.log(result)
        return "Record Saved Successfully";
    }
};

export default booksMutations;
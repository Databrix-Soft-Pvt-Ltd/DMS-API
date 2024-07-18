import { dbConnection } from '../../../db';
type MssqlError = import('msnodesqlv8/types').Error;

const dumpUploadMutations = {
  dumpUpload: async (
    _: undefined,
    { templateId, data }: { templateId: number; data: string },
  ): Promise<string> => {
    var result: string[] = [];

    const promises = data.split('\n').map(async (each: string, i: number) => {
      result.push(
        await new Promise((resolve, reject) => {
          dbConnection.query(
            'EXEC DumpUpload @templateId=?, @data=?, @outputMessage=?',
            [templateId, each, ''],
            (err, rows: any) => {
              if (err) reject(err);
              else if (rows?.length && rows?.length > 0) {
                console.log(rows);
                if (rows[0].outputMessage === 'ref1 Is Not Unique') {
                  console.log('each', each);
                  resolve(each);
                } else if (rows[0].outputMessage === 'Successfully Uploaded Data') {
                  resolve('');
                } else {
                  resolve(each);
                }
              }
            },
          );
        }),
      );
    });
    console.log(5);

    await Promise.all(promises);

    return result.filter(Boolean).join('\n');
  },
};

export default dumpUploadMutations;

import sql from 'msnodesqlv8';
import { Connection, } from 'msnodesqlv8/types';

// ODBC connection string for SQL Server
const connectionString = process.env.SSMS_CREDENCIAL || '';

export let dbConnection: Connection; // This will store the database connection instance

type MssqlError = import('msnodesqlv8/types').Error;

export const initializeConnection = (callback: (err: MssqlError | null) => void) => {
  sql.open(connectionString, (err: MssqlError, conn: Connection) => {
    if (err) {
      console.error('Connection Error:', err);
      callback(err);
    } else {
      dbConnection = conn;
      callback(null);
    }
  });
};

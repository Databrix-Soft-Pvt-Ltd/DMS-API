import app from './app';
import { port } from './config/enviornment';
import { initializeConnection } from './db'; // Change the import statement
type MssqlError = import('msnodesqlv8/types').Error;
console.log('>> Reporting Service');

const init = async () => {
  try {
    await initializeConnection((err: MssqlError | null) => {
      if (err) {
        console.error('Error initializing database connection:', err);
      } else {
        console.log('Database connection initialized successfully');
      }
    });
    await new Promise((resolve: any) => app.listen({ port }, resolve));
    console.log(`🚀  GraphQL server running at port: ${port}`);
  } catch (e) {
    console.log('Not able to run GraphQL server', e);
  }
};

init();

import * as dotenv from 'dotenv';

dotenv.config();

import server from './server';

server.listen().then(({ url }) => {
  console.log(`🚀 Server listening at ${url}`);
});

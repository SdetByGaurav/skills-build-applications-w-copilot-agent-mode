import express from 'express';
import routes from './routes';
import { connectDatabase } from './config/database';
import { getPort } from './config';

const app = express();
const port = getPort();

app.use(express.json());
app.use(routes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });

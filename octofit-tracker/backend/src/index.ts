import express from 'express';
import routes from './routes';
import { connectDatabase } from './database';

const app = express();
const port = process.env.PORT || 8000;

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

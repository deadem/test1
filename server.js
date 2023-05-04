import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

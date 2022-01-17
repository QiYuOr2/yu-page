import * as Express from 'express';

const app = Express();

app.get('/', (req, res) => {
  res.send('12');
});

app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});

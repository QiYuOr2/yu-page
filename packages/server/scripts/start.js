const { app } = require('../dist/app');

const port = process.env.ENV === 'prod' ? 3090 : 63643;
app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});

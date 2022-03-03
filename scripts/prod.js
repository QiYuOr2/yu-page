const { app } = require('../dist/server/app');

app.listen(3090, () => {
  console.log(`running at http://localhost:3090`);
});

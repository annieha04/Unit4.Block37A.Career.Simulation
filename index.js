const pg = require('pg')
const express = require('express')
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/block37a_career_simulation')
const app = express()

const init = async () => {

  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`listening on port ${port}`));
};
init()
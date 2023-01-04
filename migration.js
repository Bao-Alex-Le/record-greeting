const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./cloudFiles.sqlite');

db.serialize(() => {

  db.run('DROP TABLE IF EXISTS CloudFiles');
  db.run(
    `CREATE TABLE CloudFiles (
      callSid TEXT PRIMARY KEY NOT NULL,
      mp3Link TEXT NOT NULL
    )`
  );
});

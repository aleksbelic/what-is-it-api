const sqlite3 = require('sqlite3');
import path from 'path';

export default async function handler(req, res) {
  let allAbbrWithMeaning = {};
  const db = new sqlite3.Database(
    path.join(process.cwd(), '/data/abbr-list.db'),
    err => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  db.all(
    'SELECT abbr.name, meaning.text from abbr INNER JOIN abbr_meaning ON abbr_meaning.abbr_id = abbr.id INNER JOIN meaning on abbr_meaning.meaning_id = meaning.id ORDER BY abbr.name',
    [],
    (err, abbrs) => {
      if (err) {
        throw err;
      }
      abbrs.forEach(abbr => {
        if (allAbbrWithMeaning[abbr.name] === undefined) {
          allAbbrWithMeaning[abbr.name] = [abbr.text];
        } else {
          allAbbrWithMeaning[abbr.name].push(abbr.text);
        }
      });
      res.status(200).json(allAbbrWithMeaning);
    }
  );

  db.close(err => {
    if (err) {
      console.error(err.message);
    }
  });
}
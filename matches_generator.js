const sql = require("mysql2");
const csv = require("csv-parser");
const fs = require("fs");

const connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "very_strong_password",
  database: "db",
});

fs.createReadStream("./src/data/matches.csv")
  .pipe(csv())
  .on("data", (row) => {
    const columnNames = [
      "id",
      "season",
      "city",
      "date",
      "team1",
      "team2",
      "toss_winner",
      "toss_decision",
      "result",
      "dl_applied",
      "winner",
      "win_by_runs",
      "win_by_wickets",
      "player_of_match",
      "venue",
      "umpire1",
      "umpire2",
      "umpire3",
    ];

    const values = [
      row.id,
      row.season,
      row.city,
      row.date,
      row.team1,
      row.team2,
      row.toss_winner,
      row.toss_decision,
      row.result,
      row.dl_applied,
      row.winner,
      row.win_by_runs,
      row.win_by_wickets,
      row.player_of_match,
      row.venue,
      row.umpire1,
      row.umpire2,
      row.umpire3,
    ];

    const columns = columnNames.join(", "); // Join column names with comma
    const placeholders = Array(values.length).fill("?").join(", "); // Create placeholders for values

    const sql = ` INSERT INTO MATCHE(${columns}) VALUES(${placeholders});`;

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error inserting row:", error);
      } else {
        console.log("Inserted row:", results);
      }
    });
  })
  .on("end", () => {
    connection.end();
  });

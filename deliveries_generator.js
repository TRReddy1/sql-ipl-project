const mysql = require("mysql2");
const csv = require("csv-parser");
const fs = require("fs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "very_strong_password",
  database: "db",
});

fs.createReadStream("./src/data/deliveries.csv")
  .pipe(csv())
  .on("data", (row) => {
    const columnNames = [
      "match_id",
      "inning",
      "batting_team",
      "bowling_team",
      "overs",
      "ball",
      "batsman",
      "non_striker",
      "bowler",
      "is_super_over",
      "wide_runs",
      "bye_runs",
      "legbye_runs",
      "noball_runs",
      "penalty_runs",
      "batsman_runs",
      "extra_runs",
      "total_runs",
      "player_dismissed",
      "dismissal_kind",
      "fielder",
    ];
    const values = [
      row.match_id,
      row.inning,
      row.batting_team,
      row.bowling_team,
      row.over,
      row.ball,
      row.batsman,
      row.non_striker,
      row.bowler,
      row.is_super_over,
      row.wide_runs,
      row.bye_runs,
      row.legbye_runs,
      row.noball_runs,
      row.penalty_runs,
      row.batsman_runs,
      row.extra_runs,
      row.total_runs,
      row.player_dismissed,
      row.dismissal_kind,
      row.fielder,
    ];

    const columns = columnNames.join(", ");
    const placeholders = Array(values.length).fill("?").join(", ");

    const sql = `INSERT INTO DELIVERIES(${columns}) VALUES(${placeholders});`;

    connection.query(sql, values, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log("inserted row :", res);
      }
    });
  })
  .on("end", () => {
    connection.end();
  });

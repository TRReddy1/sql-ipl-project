SELECT 
    batting_team, SUM(extra_runs)
FROM
    MATCHE
        JOIN
    DELIVERIES ON MATCHE.id = DELIVERIES.match_id
WHERE
    (season = 2016 && extra_runs > 0)
GROUP BY batting_team;
SELECT 
    bowler,
    round((SUM(total_runs) / (SUM(CASE
        WHEN wide_runs = 0 AND noball_runs = 0 THEN 1
        ELSE 0
    END) / 6)),2) as economy
FROM
    DELIVERIES
        JOIN
    MATCHE ON DELIVERIES.match_id = MATCHE.id
WHERE
    is_super_over != 0
GROUP BY bowler limit 1;
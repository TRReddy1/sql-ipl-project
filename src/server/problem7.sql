SELECT 
    season,
    batsman,
    ROUND((SUM(total_runs - extra_runs) / SUM(CASE
                WHEN wide_runs = 0 AND noball_runs = 0 THEN 1
                ELSE 0
            END))*100,
            2) AS strike
FROM
    DELIVERIES
        JOIN
    MATCHE ON MATCHE.ID = DELIVERIES.match_id group by season,batsman;
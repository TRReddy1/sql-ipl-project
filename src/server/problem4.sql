SELECT 
    bowler, round((SUM(total_runs) / (sum(CASE
											when noball_runs =0 and wide_runs =0	
                                             then 1
                                             else  0
											end) / 6)),2) AS economy
FROM
    MATCHE
        JOIN
    DELIVERIES ON MATCHE.id = DELIVERIES.match_id
WHERE
    (season = 2015)
GROUP BY bowler
ORDER BY economy
LIMIT 10;
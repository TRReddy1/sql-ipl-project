SELECT 
    player_dismissed AS batsmen,
    bowler,
    COUNT(player_dismissed) AS count
FROM
    DELIVERIES
        JOIN
    MATCHE ON DELIVERIES.match_id = MATCHE.id
WHERE
    player_dismissed NOT LIKE ''
GROUP BY player_dismissed , bowler
ORDER BY count DESC
LIMIT 1;
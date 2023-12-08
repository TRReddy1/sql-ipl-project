SELECT 
    toss_winner, COUNT(toss_winner)
FROM
    MATCHE
WHERE
    toss_winner = winner
GROUP BY toss_winner;
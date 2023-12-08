SELECT 
    season, winner, COUNT(winner)
FROM
    MATCHE
WHERE
    winner NOT LIKE ''
GROUP BY season , winner
ORDER BY season;
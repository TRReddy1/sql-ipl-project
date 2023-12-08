    
    SELECT m.season, m.player_of_match, m.max_award
FROM (
    SELECT max.season, MAX(max.max_award) as max_award
    FROM (
        SELECT pom.season, pom.player_of_match, MAX(pom.award) as max_award
        FROM (
            SELECT season, player_of_match, COUNT(player_of_match) as award
            FROM MATCHE
            GROUP BY season, player_of_match
        ) as pom
        GROUP BY pom.season, pom.player_of_match
    ) as max
    GROUP BY max.season
) as max_season
JOIN (
    SELECT pom.season, pom.player_of_match, MAX(pom.award) as max_award
    FROM (
        SELECT season, player_of_match, COUNT(player_of_match) as award
        FROM MATCHE
        GROUP BY season, player_of_match
    ) as pom
    GROUP BY pom.season, pom.player_of_match
) as m ON max_season.season = m.season AND max_season.max_award = m.max_award order by m.season limit 10;





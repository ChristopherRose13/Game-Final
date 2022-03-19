SELECT highscores.id, highscores.score, users.username, games.name, modes.name
FROM highscores
INNER JOIN users ON highscores.user_id = users.id
INNER JOIN games ON highscores.game_id = games.id
INNER JOIN modes ON highscores.mode_id = modes.id
ORDER BY highscores.score DESC
LIMIT 10;

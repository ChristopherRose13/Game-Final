As usual npm install and npm run build to build the project.

if missing something, maybe the morgan, pg, dotenv that missing in the npm install.


# first step 
check in the .env your user and password if is the same of your previous project
we are using the same database to skip the database creation

# second step

awake the postgresql server

* sudo service postgresql start

# third step

create tables and insert data seeds

* npm run db:reset

# last step

* npm start

enjoy!!

entries point to the queries:
* get/post
localhost:8080/api/highscores






[]: # Language: markdown
[]: # Path: READMETEAM.md
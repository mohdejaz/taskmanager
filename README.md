# taskmanager
Simple app to help you track your daily tasks. You can group your tasks into buckets. If you are not sure that you will work on tasks, move them to backlog.

## Setup
After you clone this project, follow the below steps ...

1. Make sure you've java 11 installed on your machine. This app uses H2 database to store tasks
2. Navigate to **bin** folder & start h2.bat or h2.sh as per your OS. You may need to chmod h2.sh shell script
3. Default database is stored in **data** folder and db name is **tasks**
4. If database is not up-to-date, then execute sqls in **scripts/db.sql**
5. There should be atleast 1 user (**user id 1**) and 1 group (named **Unknown**)
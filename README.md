# validity-email-parser-app
## How to Run App
1. Clone repository
`git clone git@github.com:redninja2/validity-email-parser-app.git`
`cd validity-email-parser-app`
2. Build and run app using docker-compose
`docker-compose --env-file .env -f .\docker-compose.yml up`
3. Once the app is up, go to your browser and browse to `http://localhost`
4. Go to the "Upload" link and upload a .tar.gz archive file. This will upload the archived .msg files into the database.
5. Return to the "Messages" page to see the parsed emails. 

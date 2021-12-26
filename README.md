# validity-email-parser-app
## How to Run App
1. Open a CLI instance (Terminal / PowerShell / Command Prompt) and clone the repository: `git clone git@github.com:redninja2/validity-email-parser-app.git`
2. Change console directory to new folder: `cd validity-email-parser-app`
3. Build and run app using docker-compose `docker-compose --env-file .env up`
   - This could take some time, as it requires the postgres, nginx, node, and python3 images.
4. Once the app is up, go to your browser and browse to `http://localhost`
5. Go to the "Upload" link and upload a .tar.gz archive file. This will upload the archived .msg files into the database.
6. Return to the "Messages" page to see the parsed emails.
7. When done testing the app, return to the CLI and press CTRL + C to quit the container.

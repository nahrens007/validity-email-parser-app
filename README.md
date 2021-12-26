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

## Information
This app is built in 3 components:
- Database (referred to as "db" in docker-compose file)
  - Uses the `postgres` image; is only accessible via the "backend" Docker network.
- API (referred to as "api" in docker-compose file)
  - Uses the `python:3` image; is only accessible via the "backend" and "frontend" Docker network.
  - Built using Flask
  - Majority of logic done in /api/project/__init__.py file
- Frontend web interface (referred to as "web" in docker-compose file)
  - Uses `node:17.3.0-alpine` and `nginx:stable-alpine` images; the first to build the React app, the second to deploy.
  - Built using React
  - Uses nginx to handle routing to the 'api' container (since the React app running on your local browser does not have access to the 'api' container directly, requests to the API need to be routed back through the 'web' container, which is on the 'frontend' network and thus has access to 'api')

# Kupi Podari Day

## Project Description

An app for managing wishlists and contributing towards gifts for others.

In this app, each registered user can share the gift they would like to receive and specify the amount they are willing to spend on a gift for another user.

## See It In Action

Frontend: [podari.ivanjsx.com](https://podari.ivanjsx.com)

Backend: [api.podari.ivanjsx.com](https://api.podari.ivanjsx.com)

## My Role In It

I was responsible for **backend (API) development** and **deployment of both frontend and backend**.

The history of this repository focuses primarily on the deployment process, though it contains the full source code of the app.

The history of backend development can be found in a [separate repository](https://github.com/ivanjsx/kupipodariday-api-nestjs). You are welcome to check it out.

Frontend development was completed by another team member and provided to me in a [repository that I forked](https://github.com/yandex-praktikum/kupipodariday-frontend) and used as a submodule in this project.

## Technologies Used

- I used **Nginx** (as a reverse proxy server) to route requests to the correct service.
- I also set up **SSL certificates** using Let's Encrypt to secure the connection.
- Frontend and backend are hosted on **separate subdomains**.
- Both frontend and backend images were built using a **multi-stage Docker build** approach.
- Backend is served by the **pm2-runtime** process manager inside a Docker container.
- Frontend is served by **Nginx** (as a web server) inside a Docker container.
- A separate Docker container is used for the **PostgreSQL** database.
- Containers are orchestrated via **Docker Compose**.

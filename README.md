# Kupi Podari Day (Купи Подари Дай)

## Project Description

App for managing wishlists and contributing towards gifts for others.

In this app, each registered user can share what gift they would like to receive, as well as specify the amount they are willing to spend on a gift for another user.

## See It In Action

Frontend: [kpd.study.ivanjsx.com](https://kpd.study.ivanjsx.com)

Backend: [api.kpd.study.ivanjsx.com](https://api.kpd.study.ivanjsx.com)

## My Role In It

I was responsible for **backend (API) development** and **deployment of both frontend and backend**.

The history of this repository is solely dedicated to the deployment process, although it contains the full source code of the app.

The history of backend development can be found in a [separate repository](https://github.com/ivanjsx/kupipodariday-api-nestjs), you are welcome to check it out.

Frontend development was done by another team member and provided to me in a [repository that I forked](https://github.com/yandex-praktikum/kupipodariday-frontend) and used as a submodule in this one.

## Technologies Used

- I used **Nginx** (as a reverse proxy server) to route requests to the correct service.
- I also set up **SSL certificates** using Let's Encrypt to secure the connection.
- Frontend and backend are hosted on **separate subdomains**.
- Both frontend and backend images were built using **multi-stage Docker build** technique.
- Backend is served by **pm2-runtime** process manager inside a Docker container.
- Frontend is served by **Nginx** (as a web server) inside a Docker container.
- There is a separate Docker container for **PostgreSQL** database.
- Containers are orchestrated via **Docker Compose**.

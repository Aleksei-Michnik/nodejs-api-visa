# Node.js API Visa

A dockerized playground setup with a simplified simulation of handling transactions with Visa API. 

For Visa API, there is a mock, as the real API is available only for banks and other relevant organisations.

## Stack
- Docker
- Node.js
- NestJS
- MongoDB
- Vite+React

## Starting locally

* Clone repository
* Copy `.env.example` to the new `.env`, update port variables with suffix `_HOST` if those ports are already in use in your system.
  ```shell
  ~/nodejs-api-visa$ cp .env.example .env
  ```
* Build and start the docker container
  ```shell
  ~/nodejs-api-visa$ docker compose up --build -d
  ```
* Ensure all the containers are running and healthy, using the Docker UI on Desktop or the terminal. Example:
  ```shell
  ~/nodejs-api-visa$ docker ps
  CONTAINER ID   IMAGE                              COMMAND                  CREATED       STATUS                 PORTS                               NAMES
  5d280e226540   nodejs-api-visa-frontend           "docker-entrypoint.s…"   3 days ago    Up 3 days              0.0.0.0:5173->5173/tcp              frontend
  70d314907ce4   nodejs-api-visa-visa-payment-api   "docker-entrypoint.s…"   3 days ago    Up 3 days              0.0.0.0:3002->3002/tcp              visa-payment-api
  c0187971528c   mongo:latest                       "docker-entrypoint.s…"   3 days ago    Up 3 days (healthy)    0.0.0.0:27017->27017/tcp            mongo
  1506833af713   nodejs-api-visa-mock-visa-api      "docker-entrypoint.s…"   3 days ago    Up 3 days              0.0.0.0:3001->3001/tcp              mock-visa-api
  ```

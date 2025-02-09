# Node.js API Visa

A dockerized playground setup with a simplified simulation of handling transactions with Visa API.

Built on top of [boilerplate-docker-nestjs-react-vite-dev](https://github.com/Aleksei-Michnik/boilerplate-docker-nestjs-react-vite-dev).

For Visa API, there is a mock, as the real API is available only for banks and other relevant organisations.

## Features

* Add payment via payment form
  * Payment is verified via Mock Visa API
  * Payment data is enriched with verification status and added to the Mongo `payments` collection
  * Payments list in frontend gets updated by a WebSocket
  * Form data is validated via DTO
* Spawn payments
  * Generate pre-defined number of mock payments (default 1000) where all the payment data is random
  * Leverage/reuse all the functionality related to payments addition from the form
  * Uses https://randomuser.com API to generate random card holder names, with special measures to prevent the API abuse and failures handling (caching, retries policy)
  * Due to the previous items, adds payments not immediately but with the process visualisation in frontend

## Stack
- Docker
- Node.js
- NestJS
- MongoDB
- Vite, React, Tailwind CSS

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

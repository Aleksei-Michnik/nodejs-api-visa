FROM node:22-alpine

ARG VISA_PAYMENT_API_PORT
ENV VISA_PAYMENT_API_PORT=${VISA_PAYMENT_API_PORT}

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE ${VISA_PAYMENT_API_PORT}

CMD ["npm", "run", "start:dev"]

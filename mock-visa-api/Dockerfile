FROM node:22-alpine

ARG MOCK_VISA_API_PORT
ENV MOCK_VISA_API_PORT=${MOCK_VISA_API_PORT}

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE ${MOCK_VISA_API_PORT}

CMD ["node", "src/app.js"]

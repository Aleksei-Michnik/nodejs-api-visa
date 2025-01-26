FROM node:22-alpine

ARG VITE_PORT
ENV VITE_PORT=${VITE_PORT}

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE ${VITE_PORT}

CMD ["npm", "run", "dev", "--", "--host"]

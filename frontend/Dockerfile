FROM node:alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i

COPY ./src ./src
COPY ./public ./public

EXPOSE 3000
CMD ["npm", "run", "build"]
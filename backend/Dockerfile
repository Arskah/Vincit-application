FROM node:alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i

COPY . ./

EXPOSE 8000
CMD ["npm", "start"]
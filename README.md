# Vincit-application

React app with node backend. Communication to backend is implemented with websocket for duplex communication.

## Game rules
Every 100 click wins. Categories are

```js
const BIG_REWARD = {
  reward: 'Jackpot!',
};
const MED_REWARD = {
  reward: 'Huge win! Congratz!',
};
const SMALL_REWARD = {
  reward: 'You won!',
};
```

## Local usage

Install docker-compose and run

```bash
docker-compose up
```

OR

run frontend and backend apps independently

```bash
cd frontend
npm start
```

```bash
cd backend
npm start
```

Note that backend requires 'redis' to be running.

## TODO

- Authentication and login with JSON Web token
- PostgreSQL server for saving winners and users
  - Allows player usernames

## Hosted App

App found in Google Cloud at http://35.228.254.127:3000/
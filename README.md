# Lyon Available Rooms

A web application to help Zenika Lyonnais·es to books rooms for a meeting. 

It displays all rooms available and allow to quickly booked them with a single click.
It also displays the duration before it become vacant again and when it will be occupied.

## Local start

Simply run

```
pnpm install
```

Then, create a `.env` file at the root of the project and provide the correct env variable
```
VITE_REDIRECT_URI=http://localhost:5173
VITE_CLIENT_ID=<the-oauth2-client-id>
```
You can find the client id in GCP

and then start in dev mode

```
pnpm dev
```

## Deployment

The app is deployed on Github Pages automatically on push on main with Github Actions.

It uses Google Cloud for communicating with the calendars. The GCP project is `available-rooms` and contains:
- Credentials API, for oauth consent
- Google calendar API


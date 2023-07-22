## Full Stack Next.js 13 Residence rental application App Router: React, Tailwind, Prisma, MongoDB, NextAuth.

<p align="center"><img src="https://github.com/daniel10027/MaResie/blob/main/image.jpeg"></p>

### Features:

- Tailwind design
- Tailwind animations and effects
- Full responsiveness
- Credential authentication
- Google authentication
- Github authentication
- Image upload using Cloudinary CDN
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Calendars with react-date-range
- Page loading state
- Page empty state
- Booking / Reservation system
- Guest reservation cancellation
- Owner reservation cancellation
- Creation and deletion of properties
- Pricing calculation
- Advanced search algorithm by category, date range, map location, number of guests, rooms and bathrooms
  - For example we will filter out properties that have a reservation in your desired date range to travel
- Favorites system
- Shareable URL filters
  - Lets say you select a category, location and date range, you will be able to share URL with a logged out friend in another browser and they will see the same results
- How to write POST and DELETE routes in route handlers (app/api)
- How to fetch data in server react components by directly accessing database (WITHOUT API! like Magic!)
- How to handle files like error.tsx and loading.tsx which are new Next 13 templating files to unify loading and error handling
- How to handle relations between Server and Child components!
- Prerequisites
- Node version 14.x

### Cloning the repository

```bash
    git clone https://github.com/daniel10027/MaResie.git
```
### Install packages
```bash
npm i
```
### Setup .env file

```bash
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
```
### Setup Prisma
```bash
npx prisma db push
```
### Start the app
```bash
npm run dev
```

## Enjoy !

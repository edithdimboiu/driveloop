# Driveloop App

The Driveloop app is designed for users who want to rent and manage a wide range of cars, including electric, hybrid, and traditional vehicles. The platform allows users to view car details, check availability, and manage rentals for various purposes like urban or long-distance trips.

## Features

- Login and register users
- Add and update cars of all types (electric, hybrid, traditional)
- Rent cars of all types for all purposes
- View detailed information about each car (make, model, year, description, etc.)
- Check car availability based on user preferences
- Upload and update car images to Cloudinary

## User Interaction

- Users can create a new account, and afterwards login to access rentals data
- Users can add, update, or delete cars from the app.
- Users can rent, cancel rentals, or rent again the same car.
- Each vehicle includes details such as location, price per hour, minimum/maximum rental duration, and additional features (e.g., backup camera, heated seats, Bluetooth).
- The app automatically updates the availability and status of cars in real-time.

## Data and Accuracy

- All vehicle data is stored in a MongoDB database.
- The app uses the Cloudinary API to manage and store car images.

## Technologies/Frameworks/Libraries

- Next.js
- MongoDB (via Mongoose)
- Cloudinary
- JavaScript
- Node.js

## Installation and Setup

Follow these steps to get the project up and running on your local machine:

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)

### Install dependencies

`npm install`
or
`yarn install`

### Run application

`npm run dev`
or
`yarn dev`

The app should now be running on http://localhost:3000.

###Demo
If you want to try the app without registering, you can use the following demo credentials:

        Username: user
        Password: password

Simply log in with these credentials to access the application.

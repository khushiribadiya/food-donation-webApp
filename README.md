# Food Donation Management System

A web application which is useful for management of food donation and collection activities.  
LIVE: https://food-donation-webapp-1.onrender.com

<img src="assets\images\dashboard.png" width="70%">

## Table of Contents

- [Installation and setup](#installation-and-setup)
- [Features](#features)
- [Technologies used](#technologies-used)
- [npm packages used](#npm-packages-used)
- [Prerequisites](#prerequisites)
- [Useful Links](#useful-links)
- [Contact](#contact)

## Installation and Setup

1. Install all the dependencies
   ```sh
   npm install
   ```
2. Create a file named ".env" and enter the following credentials:
   ```js
   MONGO_URI = yourmongouri;
   ```
3. Run the web application
   ```sh
   npm start
   ```
4. Open http://localhost:3000
5. You need to first signup and then login to run the application.

## Features

- The system supports three types of users: **Admins**, **Donors**, and **Agents**.
- **Admins** manage all operations, approve or reject donations, and assign agents.
- **Donors** are the main users who submit food donation requests.
- **Agents** are responsible for collecting food from donors' locations.
- All users must create an account and log in to access the system.
- Each user has a personalized dashboard showing relevant summaries.
- Includes secure user authentication: signup, login, and logout.

### Donor Features

- Submit food donation requests with essential details.
- Track the status of each donation (pending, accepted, or rejected).
- View ongoing (incomplete) donations.
- Access a history of all past donations.
- Edit and update donor profile information.

### Admin Features

- Review and manage all donation requests from donors.
- Approve or reject donations based on the provided details.
- Assign available agents to approved donation requests.
- Monitor all pending and completed donations.
- View and manage registered agents.
- Update and manage their own admin profile.

### Agent Features

- Receive tasks from admins to collect donations from donor locations.
- Confirm and mark donations as collected after pickup.
- Review their collection history.
- Update and manage their agent profile.

## Technologies Used

- **HTML** – Structure of the web pages
- **CSS** – Styling and layout
- **Bootstrap** – Responsive design framework
- **JavaScript** – Client-side scripting
- **Node.js** – Backend runtime environment
- **Express.js** – Web framework for Node.js
- **MongoDB** – NoSQL database for storing data
- **EJS** – Templating engine for rendering dynamic HTML

## npm Packages Used

- **express** – Fast, minimal Node.js web framework
- **ejs** – Embedded JavaScript templating engine
- **express-ejs-layouts** – Layout support for EJS templates
- **mongoose** – MongoDB object modeling tool
- **express-session** – Session management for Express
- **bcryptjs** – Password hashing library
- **passport** – Authentication middleware
- **passport-local** – Local username/password login strategy
- **connect-flash** – Flash messages for notifications
- **method-override** – Support for PUT & DELETE methods in forms
- **dotenv** – Loads environment variables from `.env` file


## Prerequisites

Before running this application, make sure you have the following installed:

- ✅ **Node.js** – Required to run the server  
  [Download Node.js](https://nodejs.org/)

- ✅ **MongoDB Database** – You can use either local MongoDB or MongoDB Atlas  
  [Set up MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

- ✅ **Code Editor** – Recommended: Visual Studio Code  
  [Download VS Code](https://code.visualstudio.com/)


## Contact

- Email: khushiribadiya68@gmail.com & kajalpanday854@gmail.com
- Linkedin: https://www.linkedin.com/in/khushi-ribadiya-b8ba892a0/  &  https://www.linkedin.com/in/kajal-pandey-3014732ba/

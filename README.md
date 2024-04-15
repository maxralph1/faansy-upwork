# Faansy Social Media/Content Creation Application

Guide to (usage and description of) the Faansy application.

**Table of Contents**

1. [What Faansy Is](#what-is-faaansy)
2. [Features of the Application](#features-of-the-application)
3. [Technical Features of the Application](#technical-features-of-the-application)
4. [Technologies Utilized in Crafting Faansy](#technologies-utilized-in-crafting-faansy)
      1. [Server-side](#server-side)
      2. [Client-side](#client-side)
5. [API Documentation](#api-documentation)
6. [Database Structure](#database-structure)
7. [How to Install and Run the Faansy Application Locally On Your Device](#how-to-install-and-run-the-faansy-application-locally-on-your-device)
      1. [Requirements](#requirements)
      2. [Installation Procedure](#installation-procedure)
         1. [Server-side Terminal](#server-side-terminal)
         2. [Client-side Terminal](#client-side-terminal)
8. [Footnotes !important](#footnotes-important)

## What Is Faansy?

Faansy is a social media / content creation application, where content creators can create content / share their thoughts ranging from texts to pictures and videos of moments. (gif image showing working application comes here)

## Features of the application

1. There are 4 roles: generic user, creator, admin and superadmin. These roles have different levels of authorization.
2. All user roles can register and add images (profile picture and background picture) to their profile.
3. Users can opt to become creators only after approval by the superadmin/admin.
4. Only creators (and admin and superadmin) can create posts.
5. Admin can attend to users queries from their level of authorization.
6. Superadmin have a higher authorization with more capabilities than the admin role.

[Here is a link to some of the main features of the application in full](https://www.faansy.com/features)&nbsp;<img src="./external-link.png" width=17.5 />

## Technical Features of the Application

1. Authentication
2. Authorization (multiple roles)
3. Mailing/Notifications
4. Access tokens
5. Soft-delete function so that data is never really lost (all deleted data can be retrieved/re-activated)
6. Laravel Pint for code uniformity and consistency
7. Accessors
8. Scopes
9. API Resources for custom JSON responses
10. Observers
11. Custom Middleware
12. Eager-loading
13. Customized Exception Handlers (a security step for masking the actual model names on the server from API consumers on the client)
14. All incoming requests are validated multiple times on both client side and server-side.
15. API requests rate-limiting to prevent attacks like, DoS (Denial of Service).
16. Other security measures in place to prevent attacks.
17. Multiple error handlers (for both planned and unplanned errors) to catch all errors properly.

Plus much more...

## Technologies Utilized in Crafting Faansy

Faansy is crafted in the following programming languages/frameworks and technologies:

### **Server-side:**

1. **Laravel (PHP)** on the server-side.
      1. **Laravel Tests** (for writing comprehensive tests for the application)
2. **MYSQL** (for database).
3. **Scribe** for local API documentation.
4. **Postman** for online API documentation.

### **Client-side:**

1. **React.JS (JavaScript)** library on the client-side.
2. **Bootstrap5** for styling.
3. Vanilla **CSS3** for custom styling.

## API Documentation

Here are links to the API documentation. You may wish to view the online version if you do not want to install and run the application locally on your device:

Online version: https://documenter.getpostman.com/view/13239911/2s946bCabf

Offline version: http://localhost/docs

("localhost" here stands for your local development environment port. Laravel by default runs on localhost:8000. So you would typically view the docs on http://localhost:8000/docs unless you decided to run on a port you set by yourself)

## Database Structure

![](./faansy_database_schema.png)

## How to Install and Run the Faansy Application Locally On Your Device

### Requirements:

1. You must have PHP installed on your device. Visit the [official PHP website](https://www.php.net/) and follow the steps for download and installation.

2. After installing PHP, download and install a text editor (e.g. [VS Code](https://code.visualstudio.com/Download)) if you do not have one.

### Installation procedure:

Then go to your terminal and follow these steps:

1. From your terminal, cd (change directory) into your favorite directory (folder) where you would like to have the application files

```
cd C:\Users\maxim\Desktop>
```

Here I changed directory into my personal Desktop space/folder on my Windows Computer. And then;

2. Clone this repository from here on Github using either of the 2 commands on your terminal:

```
git clone https://github.com/maxralph1/faansy-upwork.git
```

or

```
git clone git@github.com:maxralph1/faansy-upwork.git
```

3. And to end this section, CD into the newly installed "faansy-upwork" application file with the following commands.

```
cd faansy-upwork
```

At this point, you must have 2 terminals running side-by-side (server-side (to run the server side code) and client-side (to consume the server-side API)).

#### Server-side Terminal

1. On the first terminal, change directory into the server file

```
cd server
```

2. From here, use the command below to install all dependencies I utilized in this application as can be seen from my 'server/composer.json' file

```
composer install
```

3. Spin up the server with the command:

```
php artisan serve
```

Your server traditionally starts on port 8000 (http://localhost:8000), if you have nothing currently running this port.

4. Go to the 'server/.env' file which you must have gotten from modifying the 'server/env.example' file and make sure the database name is what you want it to be.

5. You should already have a MySQL database installed and running. Create a database instance with same name as that for the database above. I use XAMPP (you can [get XAMPP here](https://www.apachefriends.org/download.html)). It makes it easier for me.

6. Go back to your server terminal and run the command to migrate and seed your database:

```
php artisan migrate --seed
```

#### Client-side Terminal

1. On the second terminal, change directory into the server file

```
cd client
```

2. Use the command below to install all dependencies I utilized in this application as can be seen from my 'client/package.json' file

```
yarn
```

3. Spin up the client-side (front-end) to consume the back-end API using the following command:

```
yarn dev
```

Your application should be up on http://localhost:5173/ if you have nothing previously running on the port. Check your terminal to confirm the actual port.

## Footnotes !important

This application is still in the beta-phase; even though it is production-ready.

We will continue to gradually update this project.

Finally, contributions/suggestions on how to improve this project are welcome.

# gorjeta-na-conta

This project aims to snitch on restaurants who charge a tip on the bill.

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
* Node.js
* npm
* MongoDB

## Installing
#### Clone the repository:
```sh
git clone https://github.com/yourusername/gorjeta-na-conta.git
cd gorjeta-na-conta
```

#### Install the necessary packages.  
In the root directory:
```sh
npm install
```

In the server directory:
```sh
cd server
npm install
```


## Setting Up MongoDB
Install MongoDB: Visit [MongoDB's official documentation](https://docs.mongodb.com/manual/installation/) for installation steps based on your operating system.  
Install MongoDB Compass for a GUI that provides a visual interface.


#### Importing Data Using MongoDB Compass:
##### Open MongoDB Compass and Connect:  
Launch MongoDB Compass and connect to the MongoDB instance.

##### Select Your Database (restaurantsDB):
If the database doesn't already exist, you can create it by clicking on "CREATE DATABASE" button.

##### Select Your Collection (restaurants):
If the collection doesn't already exist, create it.

##### Import Data:

On the top menu, you'll see an option named "Collection".  
Click on it and then select "Import Data". This will open an import dialog.

* Select Input File: Choose the JSON file you want to import (db-data/restaurantsDB.restaurants.json).
* Select Input File Type: Choose JSON.
* Import: Click on the "Import" button.

##### If you submit more data, export your database to share the new data

##### Verify Data Import:
Check if the list shows the imported data.  
Look inside the server folder files for clues.

## Running the project

#### Start the Backend:
Navigate to the server directory and run (node):
```sh
node index.js
```
The server should start on a specified port, currently 3002.

#### Start the Frontend 
##### Compile and Hot-Reload for Development:
In the root directory, run:
```sh
npm run dev
```

##### Compile and Minify for Production
In the root directory, run:
```sh
npm run build
```

## Files necessary for the project to run but not included in the repository
.env
.db_dump

The frontend application should now be running, typically here: http://127.0.0.1:5173/

Access the Application:  
Open your browser and navigate to http://127.0.0.1:5173/ or http://localhost:5173/

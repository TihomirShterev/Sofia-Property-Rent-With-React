# Sofia-Property-Rent-With-React

My project is a renting platform. It's goal is to be user-friendlier, more reliable, more affordable and to provide better and more services that already existing platforms of the same kind. 

Run 'npm install' and then 'npm start' in the 'rest-api' folder to get the server ready. MongoDB is used. Listening on port: 3001.

Run 'npm install' and then 'npm start' in the 'front-end' folder to build the app. Listening on port: 3000.


# Base API URL

```https://localhost:3001/api```


# Front-End Endpoints:

.get / - get home page

.post /user/register - register new user
.get /user/profile/:userId - get user info (accessible only by logged in user)
.get /user/logout - logout current user (accessible only by logged in user)
.post /user/login - login user

.get /item - list all offers
.post /item/create - create a new offer (accessible only by logged in user)
.get /item/details/:itemId - get offer details (accessible only by logged in user)
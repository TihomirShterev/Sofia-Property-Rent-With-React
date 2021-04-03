# Sofia-Property-Rent-With-React

My project is a renting platform. Its goal is to be user-friendlier, more reliable, more affordable and to provide better and more services than already existing platforms of the same kind. 

Run 'npm install' and then 'npm start' in the 'rest-api' folder to get the server ready. MongoDB Atlas Cloud Database is used. Listening on port: 3001.

Run 'npm install' and then 'npm start' in the 'front-end' folder to build the app. Cloudinary is used for file storage cloud API. Listening on port: 3000.

### Currently hosted on Heroku at [https://estatesbg.herokuapp.com/]


## Base API URL

```http://localhost:3001/```


## Front-End Endpoints:

.get / - get home page

.post /user/register - register new user

.get /user/profile/:userId - get user info (accessible only by logged in user)

.get /user/logout - logout current user (accessible only by logged in user)

.post /user/login - login user

.get /item - list all offers

.post /item/create - create a new offer (accessible only by logged in user)

.get /item/details/:itemId - get offer details (accessible only by logged in user)
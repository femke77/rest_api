# rest_api

link to live deployment via heroku: 

https://damp-beach-28114.herokuapp.com/api

USE:
Use this api to access a MongoDB database of movies and tv shows:

/api/movies id is 1-1000

/api/shows id is 1-1000 

/api/search?title=your_title

returns all movies and/or shows by that title with year and type (movie or show)



ABOUT:

Made with Node.js/Express and mongoosejs. MongoDB is live via mlab. 
My previous experience was only with Node.js using React Native for cross-platform mobile apps.
I did this challenge in 5 days and learned everything I could about express, mongodb, RESTful services, and mongoose to deploy a professional-ish (how professional can a first try be?) api. I could not find a data set that included synopsis of tv shows. Even imdb, with all the data it provides, does not provide that! So I cheated a bit with lorem ipsum statements. 

My searches are all clocking at avg 150ms via heroku

The endpoint requirements stated a singular form of "movie" and "show", but my research into how models/schemas are done properly with express and mongoose stated that the endpoints should be plural and any instance (models) should be singular. 
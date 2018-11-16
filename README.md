# rest_api 

more updates coming:
-remaining CRUD ops for full use of db
-authorization

A REST API built with Node.js, Express, and MongoDB/mongoose. Deployed via Heroku. 
Coding exercise only. Not for professional use. 

Link to live deployment via heroku: 

https://damp-beach-28114.herokuapp.com/api

USE: (3 endpoints: movies, shows, search)

Use this api to access a MongoDB database of movies and tv shows:

/api/movies/:id     

id is 1-1000

/api/movies

/api/shows

/api/shows/:id    

id is 1-1000 

/api/search?title=your_title   

returns all movies and/or shows by that title with year and type (movie or show)

to sort with /movies or /shows:  

?sort=+year  (ascending by year)

?sort=-year   (descending by year)

?sort=+title  (ascending by title)

?sort=-title  (descending by title)

?sort=+id

?sort=-id       





 
# rest_api 

more updates coming:

-authorization

-auto increment id in posts

-make things more interesting with subdocuments and references


A REST API built with Node.js, Express, and MongoDB/mongoose. Deployed via Heroku. 
Coding exercise only. Not for professional use. Data is not guaranteed to be correct.

Link to live deployment via heroku: 

https://damp-beach-28114.herokuapp.com/api

Note: The response time will likely be a few seconds long on the first request, because this app is running on a free dyno. Subsequent requests will behave as normal.

USE: (3 endpoints: movies, shows, search)

Use this api to access a MongoDB database of movies and tv shows:

/api/movies/:id     

id is 1-1000

/api/movies

/api/shows

/api/shows/:id    

id is 1-1000 

to sort with /movies or /shows:  

?sort=year  (ascending by year)

?sort=-year   (descending by year)

?sort=title  (ascending by title)

?sort=-title  (descending by title)

?sort=id  or -id

?sort=-id       

Movie and show documents can be updated with their id

The search endpoint is for multi-resource searching

/api/search?q=title  

returns all movies and/or shows by that title with year and type (movie or show). Its a global search. 





 
# WorkSpree

Heroku Link: https://joblisting-backend.herokuapp.com
​
## Elevator Pitch
Is there something you need done that doesn't require a professional? Is your time too valuable to be spending on such menial tasks? Tired of bothering your neighbors children to mow your lawn? Introducing: WorkSpree, the app that connects you with part-time freelancers looking for work. When you need a job done quick and cheap, look no further.
​
## Technologies Used
1. MERN, bootstrap
2. bcrypt, jwt, fetch
3. postman, github, heroku, atlas
​
## Installation
1. fork, clone
3. npm install
4. open 2 terminals
5. terminal 1: cd front-end && npm start
6. terminal 2: cd back-end && node server
​
## Unsolved problems and unimplemented features
1. fix the inefficient use of promises in some of my controller functions
2. fix bug when trying to display all replies that belong to the user, in the profile page
3. implement search filters by zipcode, 'kind', etc.
4. implement back-end pagination
5. make the code more uniform and readable, add comments where necessary.
​ 
## Details

##### User Stories
- AAU I want to sign up
- AAU I want to log in
- AAU I want to update my personal information
- AAU I want to view an overview of all posts
- AAU I want to filter posts by zipcode and by "seeking or offering" (icebox)
- AAU I want to modify the maximum number of posts I can see at a time (icebox)
- AAU I want to view the details and message body of a post
- AAU I want to reply to a post
- AAU I want to delete one of my own reply messages
- AAU I want to create a new post
- AAU I want to edit one of my posts
- AAU I want to delete one of my posts
- AAU I want to see a list of just my own posts
- AAU I want to see a list of my own replies (not working)
- AAU I want to see all replies on one of my posts
- AAU I don't want other people to see replies on my post, unless they started the reply thread
​
##### ERD
![](https://i.ibb.co/HhKtLJd/job-listing-site.jpg)
​
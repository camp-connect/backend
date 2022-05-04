# Camp Connect Node js backend



---

Backend for camp-connect application based on Node js + Elephent SQL (Cloud base postgresql database) designed to be run completly free from local host.

Current heroku deployment : https://camp-connect-backend.herokuapp.com/``api Endpoint``



---

* Node : ``v16.13.1``
* Express : ``v4.17.3``
* nodemon : ``v2.0.15``
* pg : ``v8.7.3``



---


## Setup on localhost

````markdown
 run `yarn install` to automatically install all the dependdancies.

If yarn is not installed on system install yarn package manager using `npm install --global yarn` and then install dependancies using yarn
````

````markdown
To run the server use `yarn dev` to start server in development mode.
The server will run at ``http://localhost:3000``
````


---

## How to use 

### HTTP Requests for different endpoints

```javascript
// uri/api/signup/student

POST /api/signup/student HTTP/1.1
Host: camp-connect-backend.herokuapp.com
Content-Type: application/json
Content-Length: 231 //set length of content

{
    "userEmail" : "sampleEmail@jklu.edu.in",
    "userPassword": "123",
    "name": "user",
    "roll": "000",
    "room": "000",
    "personalContact": "1234567890",
    "parentsContact": "0987654321",
    "mentor": "mentor name"
}
```



```javascript
// uri/api/verify

PUT /api/verify HTTP/1.1
Host: camp-connect-backend.herokuapp.com
Content-Type: application/json
Content-Length: 42 //set length of content

{
    "userEmail" : "namish@jklu.edu.in"
}
```



```javascript
// uri/api/login

POST /api/login HTTP/1.1
Host: camp-connect-backend.herokuapp.com
Content-Type: application/json
Content-Length: 69 //set length of content

{
    "userEmail" : "namish@jklu.edu.in",
    "userPassword": "123"
}
```



```javascript
// uri/api/login/student

POST /api/login/student HTTP/1.1
Host: camp-connect-backend.herokuapp.com
Content-Type: application/json
Content-Length: 69 //set length of content

{
    "userEmail" : "namish@jklu.edu.in",
    "userPassword": "123"
}
```



```javascript
// uri/api/outpass

POST /api/outpass HTTP/1.1
Host: camp-connect-backend.herokuapp.com
Content-Type: application/json
Content-Length: 201 //set length of content

{
    "userEmail" : "namish@jklu.edu.in",
    "userName": "namish",
    "purpose": "go home",
    "outTime": "04:00",
    "inTime": "12:00",
    "outDate": "2022-05-20",
    "parentsPermission": true
}
```


#### Similarly other endpoints can be accessed

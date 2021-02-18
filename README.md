# Credit Card Recommender API

 Too often people grow up not knowing much about credit cards or in a household where credit cards are demonized, while in reality they are pretty useful tools to get cash back and travel opportunities if used correctly. This app was created with the intention of helping those who are new to credit cards make an educated choice with regards to the user's first 5 credit cards. You will input your information to get a credit card recommendation based on your credit score, the number of cards you currently have, annual income, student status, and last hard inquiry.

This is the back-end of the app. You can check out the repo for the client [here](https://github.com/Human437/credit-card-recommender) or you can view it live [here](https://credit-card-recommender.vercel.app/).

#### Dummy Account Info
- Email: john-doe@dummy-account.com
- Password: aB3!bnmv

### New User Demo
![](./gifsForReadMe/newUser.gif)

### Returning User Demo
![](./gifsForReadMe/returningUser.gif)

### Technology Used
- Node.js
- Express
- Supertest
- Mocha and Chai
- PostgresSQL
- Knex.js
- Heroku

### Front-end
This API should be used in conjunction with the client made for this project which can be found [here](https://github.com/Human437/credit-card-recommender).

### Endpoints

The API is RESTful and all requests must be made with a authorization token. You can set your own authorization token in your own `.env` file. Follow the format for the `.env` file below.
````
API_TOKEN=INSERT-YOUR-TOKEN-HERE
DATABASE_URL=INSERT-YOUR-DATABASE-URL-HERE
TEST_DATABASE_URL=INSERT-YOUR-TEST-DATABASE-URL-HERE
````

#### Articles
- ##### Get all articles
  Example request:
  ````
  fetch('https://frozen-inlet-63495.herokuapp.com/api/articles', {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer d6e2e7eb-ee9c-4f48-bf2a-4e491111cdc0`
      })
    })
    .then(response => response.json())
  ````
  Example response:
  ````
  [
    {
        "id": 1,
        "title": "Choosing Your First Credit Card",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel dui mattis, bibendum dui aliquet, lobortis ante. Cras vestibulum, quam ac tincidunt dapibus, sapien mauris hendrerit mauris, ut scelerisque nisl magna sed ipsum. Sed molestie tortor vitae dignissim volutpat. In tincidunt leo imperdiet elit pulvinar, in rhoncus nulla pretium. Duis id malesuada risus. Phasellus libero nunc, feugiat at pharetra sit amet, vulputate ut justo."
    },
    {
        "id": 2,
        "title": "Understanding Your Fico Score",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel dui mattis, bibendum dui aliquet, lobortis ante. Cras vestibulum, quam ac tincidunt dapibus, sapien mauris hendrerit mauris, ut scelerisque nisl magna sed ipsum. Sed molestie tortor vitae dignissim volutpat. In tincidunt leo imperdiet elit pulvinar, in rhoncus nulla pretium. Duis id malesuada risus. Phasellus libero nunc, feugiat at pharetra sit amet, vulputate ut justo."
    },
    {
        "id": 3,
        "title": "Cashback vs Points",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel dui mattis, bibendum dui aliquet, lobortis ante. Cras vestibulum, quam ac tincidunt dapibus, sapien mauris hendrerit mauris, ut scelerisque nisl magna sed ipsum. Sed molestie tortor vitae dignissim volutpat. In tincidunt leo imperdiet elit pulvinar, in rhoncus nulla pretium. Duis id malesuada risus. Phasellus libero nunc, feugiat at pharetra sit amet, vulputate ut justo."
    }
  ]
  ````
- ##### Get a specific article by ID
  Example request:
  ````
  fetch('https://frozen-inlet-63495.herokuapp.com/api/articles/1', {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer d6e2e7eb-ee9c-4f48-bf2a-4e491111cdc0`
      })
    })
    .then(response => response.json())
  ````
  Example response:
  ````
  {
    "id": 1,
    "title": "Choosing Your First Credit Card",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel dui mattis, bibendum dui aliquet, lobortis ante. Cras vestibulum, quam ac tincidunt dapibus, sapien mauris hendrerit mauris, ut scelerisque nisl magna sed ipsum. Sed molestie tortor vitae dignissim volutpat. In tincidunt leo imperdiet elit pulvinar, in rhoncus nulla pretium. Duis id malesuada risus. Phasellus libero nunc, feugiat at pharetra sit amet, vulputate ut justo."
  }
  ````
#### Users
- ##### Get a user by email
  Example request:
  ````
  fetch(`https://frozen-inlet-63495.herokuapp.com/api/users?email=john-doe@dummy-account.com`, {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer d6e2e7eb-ee9c-4f48-bf2a-4e491111cdc0`
      })
    })
    .then(response => response.json())
  ````
  Example response:
  ````
  {
    "id": 2,
    "email": "john-doe@dummy-account.com",
    "hashedpassword": "$2a$10$YTluj.iNbWgqYHj860rLAOdzbML/EIDVBB7e3eIwwTf3qPgt5NChG",
    "usercards": [
        1
    ],
    "msg": ""
  }
  ````
- ##### Post a new user
  Example request:
  ````
  fetch('https://frozen-inlet-63495.herokuapp.com/api/users', {
    "email":"blah@gmail.com",
    "hashedPassword": "$2a$10$YTluj.iNbWgqYHj860rLAOdzbML/EIDVBB7e3eIwwTf3qPgt5NChG",
    "userCards":[1],
    "msg":"test msg"
    }),
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer d6e2e7eb-ee9c-4f48-bf2a-4e491111cdc0`
    },
  })
  .then(response => response.json())
  ````
  Example response:
  ````
  {
    "id": 3,
    "email": "blah@gmail.com",
    "hashedpassword": "$2a$10$YTluj.iNbWgqYHj860rLAOdzbML/EIDVBB7e3eIwwTf3qPgt5NChG",
    "usercards": [
        1
    ],
    "msg": "test msg"
  }
  ````
- ##### Get a user by ID
  Example request:
  ````
  fetch(`https://frozen-inlet-63495.herokuapp.com/api/users/3`, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer d6e2e7eb-ee9c-4f48-bf2a-4e491111cdc0`
    })
  })
  .then(response => response.json())
  ````
  Example response:
  ````
  {
    "id": 3,
    "email": "blah@gmail.com",
    "hashedpassword": "$2a$10$YTluj.iNbWgqYHj860rLAOdzbML/EIDVBB7e3eIwwTf3qPgt5NChG",
    "usercards": [
        1
    ],
    "msg": "test msg"
  }
  ````
- ##### Patch a user by ID
  Example request:
  ````
  fetch(`https://frozen-inlet-63495.herokuapp.com/api/users/3`, {
    method: 'PATCH',
    headers: new Headers({
      'Authorization': `Bearer d6e2e7eb-ee9c-4f48-bf2a-4e491111cdc0`,
      'content-type': 'application/json',
    }),
    body: JSON.stringify({
      usercards: [7,8],
      msg: "Patch test msg"
    })
  })
  ````
  Example response:  
  The only response is the status code 204.

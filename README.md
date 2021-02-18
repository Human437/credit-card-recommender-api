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
#### Cards
- ##### Get all cards
  Example request:
  ````
  fetch(`https://frozen-inlet-63495.herokuapp.com/api/cards`, {
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
        "title": "Discover IT Student",
        "content": "As the name suggests, this card is meant for students and has the additional good grades benefit that most students would appreciate. The good grades benefit in short gives you a $20 statement credit each school year you have a GPA that is 3.0 or higher. Aside from special features for students, it functions essentially the same way the regular Discover IT card functions. It has the same rotating categories that will give you 5% back on purchases that fit under the category and 1% back on everything else. On top of that Discover’s intro bonus is that they will double all the rewards you earn in the first year once you have held the card for one year. So let's say you opened an account on February 6th, 2020, and held the card till at the very least February 6th, 2021, Discover will match the cashback you earned. If you earned $100 in cashback, Discover will give you an additional $100 credit. So for a little effort on your part, you could be earning money back on all your purchases. Another perk with Discover is that, at least at the time of writing, all of their customer support is based in the United States so you won’t have to deal with people who you may have a hard time understanding when you run into issues as a new credit cardholder. Also, without an annual fee, you can keep this card forever even when you start moving on to higher-tier cards.",
        "imglink": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fborrowingbetter.com%2Fwp-content%2Fuploads%2F2019%2F07%2FDiscover-it-Student-Cash-Back-Credit-Card.jpg&f=1&nofb=1"
    },
    {
        "id": 2,
        "title": "Chase Sapphire Prefered",
        "content": "This is going to be your entry-level travel card that just fits the sweet spot of having access to Chase’s Ultimate Rewards portal without having to shell out a $550 annual fee. You won’t have as many perks as the Chase Sapphire Reserve, but you are also paying a fifth of the cost. This card is perfect for people who are getting their first credit card that has an annual fee and are still on the fence about whether or not they can justify getting a card with an annual fee. If you happen to be one of the people who are on the fence about whether or not you can justify the $95 annual fee just get it. Worst-case scenario you realize that the card is of no benefit to you, you will still walk away with an additional $400. For clarity's sake, the $400 is the 50,000 points on sign-up bonus after spending $4,000 in the first 3 months converted to a statement credit minus the annual fee for the first year. After the first year, you can downgrade the card or close it entirely. Also, this card is great for those who aren’t sure if they can take full advantage of the travel benefits the card offers. As a final word, its earnings categories are 2X points on dining and travel, 1X points on everything else, and for a limited time till April 30, 2021, 2X points on grocery store purchases.",
        "imglink": "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.abroaders.com%2Fwp-content%2Fuploads%2F2015%2F03%2F1515869_Chase_Sapphire_Preferred_Card_Art-June_2012.jpg&f=1&nofb=1"
    },
    {
        "id": 3,
        "title": "Chase Sapphire Reserve",
        "content": "This is essentially the better version of the Chase Sapphire Preferred, but at five times the price. While the high annual fee of $550 may steer some people away from it at first, remember the large number of benefits and credits the card offers. Most of the credits help pay for the card itself like the $300 Annual Travel Credit that is pretty easy to use and at the time of writing can be used at gas stations and grocery stores due to covid-19. So, if you believe that you can make full use of the benefits the card has to offer and you know that you will be traveling a lot, this is a great card to add to your arsenal. As a final word, its earnings categories are 3X points on dining and travel, 1X points on everything else, and for a limited time till April 30, 2021, 3X points on grocery store purchases.",
        "imglink": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kinja-img.com%2Fgawker-media%2Fimage%2Fupload%2Fs--1jAznzwr--%2Fc_fill%2Cfl_progressive%2Cg_center%2Ch_900%2Cq_80%2Cw_1600%2Ft23hrzfuukxi6zape1wa.jpg&f=1&nofb=1"
    }
  ]
  ````
  
- ##### Get a card by ID
  Example request:
  ````
  fetch(`https://frozen-inlet-63495.herokuapp.com/api/cards/1`, {
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
    "title": "Discover IT Student",
    "content": "As the name suggests, this card is meant for students and has the additional good grades benefit that most students would appreciate. The good grades benefit in short gives you a $20 statement credit each school year you have a GPA that is 3.0 or higher. Aside from special features for students, it functions essentially the same way the regular Discover IT card functions. It has the same rotating categories that will give you 5% back on purchases that fit under the category and 1% back on everything else. On top of that Discover’s intro bonus is that they will double all the rewards you earn in the first year once you have held the card for one year. So let's say you opened an account on February 6th, 2020, and held the card till at the very least February 6th, 2021, Discover will match the cashback you earned. If you earned $100 in cashback, Discover will give you an additional $100 credit. So for a little effort on your part, you could be earning money back on all your purchases. Another perk with Discover is that, at least at the time of writing, all of their customer support is based in the United States so you won’t have to deal with people who you may have a hard time understanding when you run into issues as a new credit cardholder. Also, without an annual fee, you can keep this card forever even when you start moving on to higher-tier cards.",
    "imglink": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fborrowingbetter.com%2Fwp-content%2Fuploads%2F2019%2F07%2FDiscover-it-Student-Cash-Back-Credit-Card.jpg&f=1&nofb=1"
  }
  ````

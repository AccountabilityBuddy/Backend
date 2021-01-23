Welcome to GraphiQL

GraphiQL is an in-browser tool for writing, validating, and
testing GraphQL queries.

Type queries into this side of the screen, and you will see intelligent
typeaheads aware of the current GraphQL type schema and live syntax and
validation errors highlighted within the text.

GraphQL queries typically start with a "{paradim " character. Lines that start
with a  are ignored.

> If you want to get access to the MongoDB atlas database on mongodb.com, create a mongodb.com account then contact David Lin with your email address 

# Accountability Specifics:

## Query is similar to a /GET request

Example: Get a list of users:
```GraphQL
query{
    users{
        _id
        username
        email
    }
}
```

GraphQL allows you to customize the return values, for example, 
if I want username to be returned as well:
```GraphQL
query{
    users{
        _id
        username
        email
        firstName
        lastName
    }
}
```

Mutation is similar to a /POST request
For relationships, you will need to specify the object ID, 
so it's following the NOSQL paradigm  
```GraphQL
mutation{
    createGoal(goalInput: {
      	name: "David's Goal"
        stake: "5"
        buddy: "5ffa75516d1f8f0004a8f6f8"
        period: "5"
        creator: "5ffa75516d1f8f0004a8f6f8"
        durationPerSession: "5"
        startDate: "2020-12-26T04:59:43.789Z",
        endDate: "2020-12-26T04:59:43.789Z"
    })
    {
        period
    }
}
```

Note: For the above query, only period will be returned. 



More examples:

```GraphQL
query{
    events{
        title
        creator{
        _id
        username
        }
    }
}
```

## To pass parameters for queries:
```GraphQL
query{
  users(id: "5ff23f39b539773e946b7380"){
    firstName
	_id
  }
}
```

## Mutation examples

```GraphQL
mutation {
    createUser(userInput: {
        email: "wsydgx@hotmail.com"
        username: "wsydgx"
        password: "password"
        firstName: "David"
        lastName: "Lin"
    })
    {
        email
        username
        firstName
        lastName
    }
}
```

```GraphQL
mutation{
    createUser(userInput: {
        email: "wsydgx@hotmail.com"
        username: "wsydgx"
        password: "password"
    })
    {
        username
        password
    }
}
```

Update approval:
```graphql
mutation{
	updateApproval(sessionApproval: {
    id: "60024d1031314844f0fc3226"
    approved: true
  }){
    approved
  }
}
```

Checking password for a user:
```graphql
query{
  checkPassword(loginInfo:{
    email: "email@email.com"
    password: "1234256"
  }){
    email
  }
}
```

Get id by email:
```graphql
query{
  getIdByEmail(userEmail:{
    email: "wsydgx@hotmail.com"
  })
}
```
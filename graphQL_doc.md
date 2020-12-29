Welcome to GraphiQL

GraphiQL is an in-browser tool for writing, validating, and
testing GraphQL queries.

Type queries into this side of the screen, and you will see intelligent
typeaheads aware of the current GraphQL type schema and live syntax and
validation errors highlighted within the text.

GraphQL queries typically start with a "{paradim " character. Lines that start
with a  are ignored.


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
        stake: "5"
        buddy: "5fe6c56524713e33e42d41bf"
        period: "5"
        creator: "5fe6c56524713e33e42d41bf"
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
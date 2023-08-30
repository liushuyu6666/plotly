# How to use
1. Use `yarn start` to start the application.
2. Use `yarn test` to check all unit tests for both `user` and `product`.

# APIs
The endpoint for GraphQL is `http://localhost:3000/graphql`

## Product
### Create
To create a new product, remember the `id` field will be generated automatically.
**Query**
```graphql
mutation createProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
        id
        name
        price
    }
}
```
**Variables**
```graphql
{
    "createProductInput": {
        "name": "chair",
        "price": 17.34
    }
}
```

### findAll
To list all products.
**Query**
```graphql
query products {
    products {
        id
        name
        price
    }
}
```

### findOne
To find one product by its id.
**Query**
```graphql
query product($id: String!) {
    product(id: $id) {
        id
        name
        price
    }
}
```
**Variables**
```graphql
{
    "id": "eb6efe43-1965-431b-ab86-f9f19db85c38"
}
```

## User
### Create
To create a new product, remember to generate products first the `id` field will be generated automatically.
**Query**
```graphql
mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
        id
        name
        email
        age
        order {
            id
            name
            price
        }
    }
}
```
**Variables**
```graphql
{
    "createUserInput": {
        "name": "jack",
        "email": "jack@gmail",
        "age": 30,
        "orderIds": [
            "cfe3f1a9-442d-42f5-8cbc-8bc71568ecce"
        ]
    }
}
```

### findAll
**Query**
```graphql
query users {
    users {
        id
        name
        email
        age
        order {
            id
            name
            price
        }
    }
}
```

### findOne
**Query**
```graphql
query user($id: String!) {
    user(id: $id) {
        id
        name
        email
        age
        order {
            id
            name
            price
        }
    }
}
```
**Variables**
```graphql
{
    "id": "b7c45d1f-a3f4-455d-95f1-ddfa75bb08f4"
}
```
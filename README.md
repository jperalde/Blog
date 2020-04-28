# Blog

This project shows how to create an application using devon4node with GraphQL as the API language, more exactly using the code-first method, and MongoDB as its database, using the Mongoose object Modeling tool.
The application works as a common blog that allows everyone to see the last 5 posts and all their comments and answers to those comments, search a post by its ID, search all the posts related to one topic and, last but not least, search a comment by its ID. The application uses authorization modules, this way it only allows authenticated users to make the mutations but allowing everyone to make the queries. Mutations are simple:

- Create a new User
- Create a post
- Add a comment in that post
- Add an answer to the comment

## Getting Started

1. To download this repository:

`git clone https://github.com/aunnolose`

2. Then to run the application on your system:

```
cd blog
docker-compose up -d
yarn start
```

3. To make all the petitions you need to use [GraphQLPlayground](http://localhost:3000/graphql)

### Mutation

For mutations you need to follow a few steps:

1. First you need to create a new User, for this you'll have to do a mutation:

```
mutation {
  newUser(
    newUserInput: {
      username:"Jorge Peral"
      password:"<insert password here>"
    }
  ) {
    username
  }
}

```

2. Now you have to send an HTTPS request with Postman like this:

[![postman-request](screenshots/postman.jpg)]

This will return the Bearer in the headers

[![postman-headers](screenshots/postman-headers.jpg)]

Copy it

3. Go to [GraphQLPlayground](http://localhost:3000/graphql) and paste it to your HTTP HEADERS section as shown bellow:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvcmdlIiwicm9sZSI6MCwiaWF0IjoxNTg3MTIwNzQ1LCJleHAiOjE1ODcyMDcxNDV9.HoQMvZDMGJ7LwiNjJwm5H_3OO8LLUiUmoEIMzv09yIM"
}
```

This will grant you access to the users' spectrum.

4. Now you can do whatever mutation you want:

4.1. newPost:

```
mutation {
newPost(
  newPostInput: {
    title: "How to program with GraphQL"
    author: "Jorge Peral"
    text: "hello everyone"
    categories: ["GraphQL", "Mongoose", "NestJS"]
  }
) {
  id
  author
  title
  categories
  createdAt
  updatedAt
  text
}
}

```

4.2. newComment

```
mutation {
  newComment(
    newCommentInput: {
      idPost: "<ID from the POST you want to comment>"
      title: "How to program with GraphQL"
      author: "Jorge Peral"
      text: "hello everyone"
    }
  ) {
    id
    author
    title
    createdAt
    updatedAt
    text
  }
}
```

4.3. newAnswer

```
mutation {
  newAnswer(
    newAnswerInput: {
      idComment: "<ID from the POST you want to comment>"
      author: "Jorge Peral"
      text: "hello everyone"
    }
  ) {
    id
    author
    createdAt
    updatedAt
    text
  }
}
```

### Query

There are _four_ simple _queries_:

1. allPosts: this query returns the last five posts created with all the comments.

```
query {
  allPosts {
    id
    author
    title
    categories
    createdAt
    updatedAt
    text
    comments {
      id
      author
      title
      createdAt
      updatedAt
      text
      answers {
        id
        author
        createdAt
        updatedAt
        text
      }
    }
  }
}
```

2. postOfId

```
query {
  postOfId(id: "<string-idPost>") {
    author
    title
    categories
    createdAt
    updatedAt
    text
    comments {
      id
      author
      title
      createdAt
      updatedAt
      text
      answers {
        id
        author
        createdAt
        updatedAt
        text
      }
    }
  }
}

```

3. postOfTopic

```
query {
  postsOfTopic(category:"<string-category>") {
    author
    title
    categories
    createdAt
    updatedAt
    text
    comments {
      id
      author
      title
      createdAt
      updatedAt
      text
      answers {
        id
        author
        createdAt
        updatedAt
        text
      }
    }
  }
}

```

4. commentOfId:

```
query {
  commentOfId(id: "<string-id>") {
    author
    title
    categories
    createdAt
    updatedAt
    text
    answers {
      id
      author
      createdAt
      updatedAt
      text
    }
  }
}

```

### Code style

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Creating the app

A step by step guide on how to create the app yourself, from Zero-to-Hero

### Application requisites

The employee application needs:

- A configuration module

- Security: CORS

- Authentication using JWT

- GraphQL support

- Mongoose (MongoDB object modeling tool)

- Docker

1. Install devon4node CLI

Execute the command npm i -g @devon4node/cli

2. Create a new application

Execute the command `devon4node new blog`

3. Then, you need to select the components interactively.

4. Once you have created the project, install the GraphQL and Mongoose packages:

Execute the following commands:

```
yarn add @nestjs/graphql graphql-tools graphql
yarn add @nestjs/mongoose mongoose
yarn add -D @types/mongoose
```

You must also install `apollo-server-express`.

5. Then to run the application on your system:

```
cd blog
docker-compose up -d
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn add
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Authors

- **Jorge Peral** - _Initial work_ - [jperalde](https://github.com/jperalde)
- **Alberto Beltran** - _Initial work_ - [Albelpin](https://github.com/Albelpin)

## License

Apache-2.0 [LICENSE](LICENSE.txt)

## Acknowledgments

- **Dario Rodriguez** - _Contributor_ - [dario-rodriguez](https://https://github.com/dario-rodriguez)

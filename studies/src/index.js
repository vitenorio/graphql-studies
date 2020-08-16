const { ApolloServer, gql } = require('apollo-server')

// schemas describes all of the fields, arguments, and result types
// resolvers: functions that are called to actually execute these fields

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        active: Boolean!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
    }

    type Query {        
        users: [User!]!
        getUserByEmail(email: String!): User!
        hello: String
    }

    type Mutation {
        createUser(name: String!, email: String!): User!
    }
`

const users = [
    { id: 12, name: 'Vitoria', email: 'vitoria@email.com', active: true },
    { id: 13, name: 'Vitoria 2', email: 'vitoria2@email.com', active: false },
]

const resolvers = {
    Query: {
        users: () => users,
        getUserByEmail: (_, args) => {
            return users.find((user) => user.email === args.email)
        },
        hello: () => 'Hello'
    },
    Mutation: {
        createUser: (_, args) => {
            const newUser = {
                id: String(Math.random()),
                name: args.name,
                email: args.email,
                active: true,
            }
            
            users.push(newUser)
            return newUser
        }
    }
}

// Scalar Types -> String, Int, Boolean, Float e ID

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => console.log(`Server started at ${url}`))
import { ApolloServer, PubSub } from 'apollo-server'
import mongoose from 'mongoose'

function server({ typeDefs, resolvers }) {
    mongoose.connect('mongodb://localhost:3030/graphql', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const pubsub = new PubSub()
    const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub } })
    server.listen().then(({ url }) => console.log(`Server started at ${url}`))
} 

export default server
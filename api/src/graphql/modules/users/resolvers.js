import User from '../../../models/User'
import { USER_ADDED } from './channels'

export default {
    User: {
        fullName : (user) => `${user.firstName} ${user.lasName}`,
    },
    Query: {
        users: () => User.find(),
        users: (_, { id }) => user.findById(id)
    },
    Mutation: {
        createUser: async (_, { input }, { pubsub }) => {
            const user = User.create(input)

            pubsub.publish(USER_ADDED, {
                userAdded: user   
            })
        },
        updateUser: (_, { id, input }) => User.findOneAndUpdate(id, input, { new: true }),
        deleteUser: async (_, { id }) => {
            const deleted = await User.findOneAndDelete(id)
            return !!deleted
        }
    },
    Subscription: {
        userAdded: {
            // obj, args, context
            subscribe: (obj, args, { pubsub } ) => pubsub.asyncIterator(USER_ADDED)
        }
    }
}
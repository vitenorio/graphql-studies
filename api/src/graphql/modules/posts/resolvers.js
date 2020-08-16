import Post from '../../../models/Post'
import User from '../../../models/User'

export default {
    Post: {
        author: (post) => User.findById(post.author),
    },
    Query: {
        post: () => Post.find(),
        posts: (_, { id }) => Post.findById(id)
    },
    Mutation: {
        createPost: (_, { input }) => Post.create(input),
        updatePost: (_, { id, input }) => Post.findOneAndUpdate(id, input, { new: true }),
        deletePost: async (_, { id }) => {
            const deleted = await Post.findOneAndDelete(id)
            return !!deleted
        }
    },
}
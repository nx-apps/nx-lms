const { makeExecutableSchema } = require('graphql-tools');
const {schemaTodoList,resolverTodoList} = require('./todoList/todoList.graphql');

module.exports = function(res){
    return makeExecutableSchema(
        {
            typeDefs: schemaTodoList,
            resolvers: resolverTodoList(res)
        }
    )
}



const schemaTodoList = `
type countResult {
    deleted: Int
    errors: Int
    inserted: Int
    replaced: Int
    skipped: Int
    unchanged: Int
}

type todoList {
    id:String
    fname:String
    lname:String
}

type Query {
    todoList: [todoList]  
}

type Mutation {

    insertTodo(
        fname:String
        lname:String
    ):countResult

    deleteTodo(
        id:String
    ):countResult
    
}

schema {
  query: Query,
  mutation: Mutation
}
`;

const resolverTodoList = function(res){
    const r = res.r;
    return {
        Query:{
            
            todoList(){

                return new Promise(function(resolve, reject) {
                    
                    r.db('graphql').table('todolist')
                    .coerceTo('array')
                    .run()
                    .then(function(result){
                        resolve(result);
                    })
                    .catch(function(err){
                        reject(err);
                    })
                })
                
            }
            
        },
        Mutation:{
            insertTodo(_,{fname,lname}){
                return new Promise(function(resolve, reject) {
                    r.db('graphql').table('todolist')
                    .insert({fname,lname})
                    .run()
                    .then(function(result){
                        resolve(result);
                    })
                    .catch(function(err){
                        reject(err);
                    })
                })

            },
            deleteTodo(_,{id}){
                return new Promise(function(resolve, reject) {
                    r.db('graphql').table('todolist').get(id)
                    .delete()
                    .run()
                    .then(function(result){
                        resolve(result);
                    })
                    .catch(function(err){
                        reject(err);
                    })
                })
            }
        }
    }
}

module.exports = {schemaTodoList,resolverTodoList}


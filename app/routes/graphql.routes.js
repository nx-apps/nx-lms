const graphqlHTTP = require('express-graphql');

const graphqlSchema = require('../graphql');

const bodyParser = require('body-parser');
//const express = require('express');




module.exports=function(app){
  app.use('/', graphqlHTTP(req=>{
    return{
      schema: graphqlSchema(req),
      graphiql: true
    }
  }))

}
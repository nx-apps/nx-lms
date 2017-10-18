const EWS = require('node-ews');

// exchange server connection info 
let ewsConfig = {
 username: 'emp1@betagro.com',
 password: 'emp@1234',
 host: 'https://mail.betagro.com'
};


exports.sendMail = (email, subject, html) => {
    if(typeof email=="string"){
        email = [email]
    }
    // initialize node-ews 
    let ewsConn = new EWS(ewsConfig);
    
   // define ews api function 
   let ewsFunction = 'CreateItem';
    
   // define ews api function args 
   let ewsArgs = {
     "attributes" : {
       "MessageDisposition" : "SendAndSaveCopy"
     },
     "SavedItemFolderId": {
       "DistinguishedFolderId": {
         "attributes": {
           "Id": "sentitems"
         }
       }
     },
     "Items" : {
       "Message" : {
         "ItemClass": "IPM.Note",
         "Subject" : subject,
         "Body" : {
           "attributes": {
             "BodyType" : "HTML"
           },
           "$value": html
         },
         "ToRecipients" : {
           "Mailbox" : email.map((item)=>{
               return { EmailAddress: item}
           })
         },
         "IsRead": "false"
       }
     }
   };
    
   // query ews, print resulting JSON to console 
   return ewsConn.run(ewsFunction, ewsArgs)
    //  .then(result => {
    //    console.log(JSON.stringify(result));
    //  })
    //  .catch(err => {
    //    console.log(err.stack);
    //  });

}

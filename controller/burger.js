/*** controller/burger.js
***/


// require
const express = require( 'express' );
const model = require( '../model' );


// global variables
var router = express.Router();


/*** GET '/'

Render home page

***/

router.get(
    '/' ,
    ( request , response ) => {
        console.group( `# GET '/'` );
        console.group( '[DEBUG] request.originalUrl :' ); console.debug( result ); console.groupEnd();
        console.group( '[DEBUG] request.method :' ); console.debug( result ); console.groupEnd();
        console.group( '[DEBUG] Parameters :' ); console.debug( result ); console.groupEnd();
        console.group( '[DEBUG] Body :' ); console.debug( result ); console.groupEnd();

        result = model.burger.getAll();
        console.group( '[DEBUG] result :' ); console.debug( result ); console.groupEnd();

        if( result.error ) {
            response.json( result.error );
        }

        var data = result.data;
        response.json( data );
        // response.render( 'index' , data );

        console.info( `[INFO] Route GET '/' completed.` );
        console.groupEnd();
    }
);


/*** GET '/api/burger/all'

Get all burgers

***/

router.get(
    '/api/burger/all' ,
    async ( request , response ) => {
        console.group( `# GET '/api/burger/all'` );
        console.group( '[DEBUG] request.originalUrl :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method :' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params :' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.body :' ); console.debug( request.body ); console.groupEnd();

        result = await model.burger.getAll();
        console.group( '[DEBUG] result :' ); console.debug( result ); console.groupEnd();

        if( result.error ) {
            response.json( result.error );
        }

        var data = result.result;
        response.json( data );

        console.info( `[INFO] Route GET '/api/burger/all' completed.` );
        console.groupEnd();
    }
);



// export
module.exports = router;

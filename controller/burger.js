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
    async ( request , response ) => {
        console.group( `# GET '/'` );
        console.group( '[DEBUG] request.url :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method :' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params :' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query :' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body :' ); console.debug( request.body ); console.groupEnd();

        var result = await model.burger.getAll();

        if( result.error ) {
            response.json( result.error );
        }

        var handlebarsData = { burgers : result.result };
        console.group( '[DEBUG] handlebarsData :' ); console.debug( handlebarsData ); console.groupEnd();
        response.render( 'index' , handlebarsData );

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
        console.group( '[DEBUG] request.url :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method :' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params :' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query :' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body :' ); console.debug( request.body ); console.groupEnd();

        var result = await model.burger.getAll();

        if( result.error ) {
            response.json( result.error );
        }

        var responseData = { result : result.result };
        console.group( '[DEBUG] responseData :' ); console.debug( responseData ); console.groupEnd();
        response.json( responseData );

        console.info( `[INFO] Route GET '/api/burger/all' completed.` );
        console.groupEnd();
    }
);


/*** POST '/api/burger/create'

Create new burger

***/

router.post(
    '/api/burger/create' ,
    async ( request , response ) => {
        console.group( `# POST '/api/burger/create'` );
        console.group( '[DEBUG] request.url :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method :' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params :' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query :' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body :' ); console.debug( request.body ); console.groupEnd();

        var burgerData = request.body;
        var result = await model.burger.create( burgerData );

        if( result.error ) {
            response.json( result.error );
        }

        var responseData = { result : result.result };
        console.group( '[DEBUG] responseData :' ); console.debug( responseData ); console.groupEnd();
        response.json( responseData );

        console.info( `[INFO] Route POST '/api/burger/create' completed.` );
        console.groupEnd();
    }
);


/*** PUT '/api/burger/devour'

Set burger as devoured

***/

router.put(
    '/api/burger/devour' ,
    async ( request , response ) => {
        console.group( `# PUT '/api/burger/devour'` );
        console.group( '[DEBUG] request.url :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method :' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params :' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query :' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body :' ); console.debug( request.body ); console.groupEnd();

        var burgerId = request.body.id;
        var result = await model.burger.setDevoured( burgerId );

        if( result.error ) {
            response.json( result.error );
        }

        var responseData = { result : result.result };
        console.group( '[DEBUG] responseData :' ); console.debug( responseData ); console.groupEnd();
        response.json( responseData );

        console.info( `[INFO] Route PUT '/api/burger/devour' completed.` );
        console.groupEnd();
    }
);



// export
module.exports = router;

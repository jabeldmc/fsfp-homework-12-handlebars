/*** server.js
***/


// check environment variables
console.group( '# Environment Variables' );
console.group( '[DEBUG] process.env.PORT :' ); console.debug( process.env.PORT ); console.groupEnd();
console.groupEnd();


// require
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const handlebars = require( 'express-handlebars' );
const orm = require( './orm' );


// global variables
const DEFAULT_PORT = 8080;
const PORT = ( process.env.PORT || DEFAULT_PORT );
var app;


/*** FUNCTION initialize()
***/

const initialize = function() {
    // create Express app
    app = express();

    // data handlers
    app.use( bodyParser.urlencoded( { extended : true } ) );    // MIME type application/x-www-form-urlencoded
    app.use( express.json() );    // MIME type application/json

    // static directory
    app.use( express.static( 'static' ) );

    // render engine
    app.engine( 'handlebars' , handlebars( { defaultLayout : 'main' } ) );
    app.set( 'view engine' , 'handlebars' );

    // routes
    var routers = require( './controller' );
    app.use( routers );
}


/*** FUNCTION start()
***/

const start = async function() {
    // connect to database
    await orm.initialize();

    // start Express app
    app.listen(
        PORT ,
        () => {
            console.info( `[INFO] Express app listening to http://localhost:${PORT}` );
        }
    );
}


// start
initialize();
start();

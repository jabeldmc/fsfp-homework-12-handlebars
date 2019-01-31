/*** config/index.js
***/


// connection
var connection;
if ( process.env.JAWSDB_URL ) {
    connection = process.env.JAWSDB_URL;
}
else {
    connection = require( './connection' );
}


// export
// other configs can be added
module.exports = {
    connection : connection
}

/*** orm/mysqlUtil.js
***/


// require
const mysql = require( 'mysql' );


// global variables
var connection;
var config;
if ( process.env.JAWSDB_URL ) {
    config = process.env.JAWSDB_URL;
}
else {
    config = require( '../config' );
}
console.group( '[DEBUG] config :' ); console.debug( config ); console.groupEnd();



/*** FUNCTION initialize()
***/

const initialize = function() {
    connection = mysql.createConnection( config.connection );
}


/*** FUNCTION connect()
***/

const connect = function() {
    return new Promise(
        ( resolve , reject ) => {
            connection.connect(
                ( error ) => {
                    // check error
                    if ( error ) {
                        reject( error );
                    }

                    console.info( `[INFO] Connected to database with thread ID ${connection.threadId}` );
                    resolve();
                }
            );
        }
    );
}


/*** FUNCTION disconnect()
***/

const disconnect = function() {
    return new Promise(
        ( resolve , reject ) => {
            connection.end();
            console.info( `[INFO] Disconnected from database with thread ID ${connection.threadId}` );
            resolve();
        }
    );
}


/*** FUNCTION createSelectQueryFragment()
***/

const createSelectQueryFragment = function( fields ) {
    var queryFragment;

    if ( fields ) {
        queryFragment = `SELECT ${ fields.map( () => '??' ).join( ' , ' ) }`;
    }
    else {
        queryFragment = 'SELECT *';
    }

    return queryFragment;
}


/*** FUNCTION createFromQueryFragment()
***/

const createFromQueryFragment = function() {
    return 'FROM ??';
}


/*** FUNCTION createWhereQueryFragment()
***/

const createWhereQueryFragment = function( filters ) {
    var queryFragment;

    if ( filters ) {
        queryFragment = `WHERE ${ Object.keys( filters ).map( () => '?? = ?' ).join( ' AND ' ) }`;
    }
    else {
        queryFragment = '';
    }

    return queryFragment;
}


/*** FUNCTION createUpdateQueryFragment()
***/

const createUpdateQueryFragment = function() {
    return 'UPDATE ??';
}


/*** FUNCTION createSetQueryFragment()
***/

const createSetQueryFragment = function( newValues ) {
    return `SET ${ Object.keys( newValues ).map( () => '?? = ?' ).join( ' , ' ) }`;
}


/*** FUNCTION createInsertQueryFragment()
***/

const createInsertQueryFragment = function( newValues ) {
    return `INSERT INTO ??( ${ Object.keys( newValues ).map( () => '??' ).join( ' , ' ) } )`;
}


/*** FUNCTION createValuesQueryFragment()
***/

const createValuesQueryFragment = function( newValues ) {
    return `VALUES ( ${ Object.keys( newValues ).map( () => '?' ).join( ' , ' ) } )`;
}


/*** FUNCTION createSelectQueryValues()
***/

const createSelectQueryValues = function( table , fields , filters ) {
    var queryValues = [];

    // add field names
    if( fields ) {
        queryValues = queryValues.concat( fields );
    }

    // add table name
    queryValues.push( table );

    // add filter field name and value
    if( filters ) {
        Object.keys( filters ).forEach(
            ( key , keyIndex ) => {
                queryValues.push( key );
                queryValues.push( filters[ key ] );
            }
        );
    }

    return queryValues;
}


/*** FUNCTION createUpdateQueryValues()
***/

const createUpdateQueryValues = function( table , newValues , filters ) {
    var queryValues = [];

    // add table name
    queryValues.push( table );

    // add new value field name and value
    Object.keys( newValues ).forEach(
        ( key , keyIndex ) => {
            queryValues.push( key );
            queryValues.push( newValues[ key ] );
        }
    );

    // add filter field name and value
    if( filters ) {
        Object.keys( filters ).forEach(
            ( key , keyIndex ) => {
                queryValues.push( key );
                queryValues.push( filters[ key ] );
            }
        );
    }

    return queryValues;
}


/*** FUNCTION createInsertQueryValues()
***/

const createInsertQueryValues = function( table , newValues ) {
    var queryValues = [];

    // add table name
    queryValues.push( table );

    // add new value field name
    Object.keys( newValues ).forEach(
        ( key , keyIndex ) => {
            queryValues.push( key );
        }
    );

    // add new value value
    Object.keys( newValues ).forEach(
        ( key , keyIndex ) => {
            queryValues.push( newValues[ key ] );
        }
    );

    return queryValues;
}


/*** FUNCTION createSelectQuery()

Example call:

```
var sql = mysqlUtil.createSelectQuery(
    'burger' ,
    [ 'id' , 'burger_name' ] ,
    {
        burger_name : 'BurgerFi' ,
        is_devoured : false
    }
);
```

Creates call to `mysql.format()`:

``
var query = mysql.format(
    'SELECT ?? , ?? FROM ?? WHERE ?? = ? AND ?? = ?' ,
    [
        // fields
        'id' , 'burger_name' ,
        // table
        'burger' ,
        // filters
        'burger_name' , 'BurgerFi' ,
        'is_devoured' , false
    ]
)
``

***/

const createSelectQuery = function( table , fields , filters ) {
    var selectQueryFragment = createSelectQueryFragment( fields );
    var fromQueryFragment = createFromQueryFragment();
    var whereQueryFragment = createWhereQueryFragment( filters );
    var queryValues = createSelectQueryValues( table , fields , filters );
    var queryFormatString =
        `${selectQueryFragment} ${fromQueryFragment} ${whereQueryFragment}`
        .trim()
        .replace( / {2,}/g , ' ' );
    var query = mysql.format(
        queryFormatString ,
        queryValues
    )

    return query;
}


/*** FUNCTION createUpdateQuery()

Example call:

```
var sql = mysqlUtil.createUpdateQuery(
    'burger' ,
    {
        burger_nme : 'NewBurgerName' ,
        is_devoured : true
    } ,
    {
        burger_name : 'BurgerFi' ,
        is_devoured : false
    }
);
```

Creates call to `mysql.format()`:

``
var query = mysql.format(
    'UPDATE ?? SET ?? = ? , ?? = ? WHERE ?? = ? AND ?? = ?' ,
    [
        // table
        'burger' ,
        // new values
        'burger_name' , 'NewBurgerName' ,
        'is_devoured' , true ,
        // filters
        'burger_name' , 'BurgerFi' ,
        'is_devoured' , false
    ]
)
``

***/

const createUpdateQuery = function( table , newValues , filters ) {
    var updateQueryFragment = createUpdateQueryFragment();
    var setQueryFragment = createSetQueryFragment( newValues );
    var whereQueryFragment = createWhereQueryFragment( filters );
    var queryValues = createUpdateQueryValues( table , newValues , filters );
    var queryFormatString =
        `${updateQueryFragment} ${setQueryFragment} ${whereQueryFragment}`
        .trim()
        .replace( / {2,}/g , ' ' );
    var query = mysql.format(
        queryFormatString ,
        queryValues
    )

    return query;
}


/*** FUNCTION createInsertQuery()

Example call:

```
var sql = mysqlUtil.createInsertQuery(
    'burger' ,
    {
        burger_nme : 'NewBurgerName' ,
        is_devoured : false
    }
);
```

Creates call to `mysql.format()`:

``
var query = mysql.format(
    'INSERT INTO ?? ( ?? , ?? ) VALUES ( ? , ? )' ,
    [
        // table
        'burger' ,
        // new values field name
        'burger_name' ,
        'is_devoured' ,
        // new values values
        'NewBurgerName' ,
        false
    ]
)
``

***/

const createInsertQuery = function( table , newValues ) {
    var insertQueryFragment = createInsertQueryFragment( newValues );
    var valuesQueryFragment = createValuesQueryFragment( newValues );
    var queryValues = createInsertQueryValues( table , newValues );
    var queryFormatString =
        `${insertQueryFragment} ${valuesQueryFragment}`
        .trim()
        .replace( / {2,}/g , ' ' );
    var query = mysql.format(
        queryFormatString ,
        queryValues
    )

    return query;
}


/*** FUNCTION runQuery()
***/

const runQuery = function( query ) {
    // return promise
    return new Promise(
        ( resolve , reject ) => {
            connection.query(
                query ,
                ( error , result , fields ) => {
                    var queryResult = {
                        fields : fields ,
                        result : result ,
                        error : error
                    };
                    resolve( queryResult );
                }
            );
        }
    );
}


// export
module.exports = {
    initialize : initialize ,
    connect : connect ,
    disconnect : disconnect ,
    createSelectQuery : createSelectQuery ,
    createUpdateQuery : createUpdateQuery ,
    createInsertQuery : createInsertQuery ,
    runQuery : runQuery
}

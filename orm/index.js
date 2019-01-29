/*** orm/index.js
***/


// require
const connection = require( './connection' );


/*** FUNCTION initialize()
***/

const initialize = async function() {
    connection.initialize();
    await connection.connect();
}


/*** FUNCTION select()

Defering query function to connection.js as we are using `mysql.format()`.

Example call:

```
var sqlResult = await orm.select(
    'burger' ,
    [ 'id' , 'burger_name' ] ,
    {
        burger_name : 'BurgerFi' ,
        is_devoured : false
    }
);
```

***/

const select = async function( table , fields , filters ) {
    if ( !table ) {
        throw new TypeError( `parameter 'table' is required.` );
    }

    var query = connection.createSelectQuery( table , fields , filters );
    var result = await connection.runQuery( query );
    return result;
}


/*** FUNCTION update()

Defering query function to connection.js as we are using `mysql.format()`.

Example call:

```
var sqlResult = await orm.update(
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

***/

const update = async function( table , newValues , filters ) {
    if ( !table ) {
        throw new TypeError( `parameter 'table' is required.` );
    }
    if ( !newValues ) {
        throw new TypeError( `parameter 'newValues' is required.` );
    }

    var query = connection.createUpdateQuery( table , newValues , filters );
    var result = await connection.runQuery( query );
    return result;
}


/*** FUNCTION insert()

Defering query function to connection.js as we are using `mysql.format()`.

Example call:

```
var sqlResult = await orm.insert(
    'burger' ,
    {
        burger_nme : 'NewBurgerName' ,
        is_devoured : false
    }
);
```

***/

const insert = async function( table , newValues ) {
    if ( !table ) {
        throw new TypeError( `parameter 'table' is required.` );
    }
    if ( !newValues ) {
        throw new TypeError( `parameter 'newValues' is required.` );
    }

    var query = connection.createInsertQuery( table , newValues );
    // var query = 'INSERT INTO burger SET `burger_name` = `test_01` , `is_devoured` = `false` )';
    var result = await connection.runQuery( query );
    return result;
}


/*** FUNCTION terminate()
***/

const terminate = async function() {
    await connection.disconnect();
}


// export
module.exports = {
    initialize : initialize ,
    select : select ,
    update : update ,
    insert : insert ,
    terminate : terminate
}

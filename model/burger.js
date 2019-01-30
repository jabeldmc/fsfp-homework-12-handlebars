/*** model/burger.js
***/


// require
const orm = require( '../orm' );


// global variables


/*** FUNCTION getAll
***/

const getAll = async function() {
    var result = await orm.select(
        'burger' ,
        null ,
        null
    );

    return result;
}


// export
module.exports = {
    getAll : getAll
}

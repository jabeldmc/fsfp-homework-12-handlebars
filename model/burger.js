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


/*** FUNCTION create
***/

const create = async function( newValues ) {
    var result = await orm.insert(
        'burger' ,
        newValues
    );

    return result;
}


/*** FUNCTION setDevoured
***/

const setDevoured = async function( id ) {
    var result = await orm.update(
        'burger' ,
        { is_devoured : true } ,
        { id : id }
    );

    return result;
}


// export
module.exports = {
    getAll : getAll ,
    create : create ,
    setDevoured : setDevoured
}

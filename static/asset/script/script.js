/*** /static/asset/script/script.js
***/


/*** Globals
***/


/*** FUNCTION createObject()

Converts from serialized format (array of `{ name , value }`) to
object format (`{ name : value , ... }`)

***/

const createObject = function( formData ) {
    console.group( 'createObject()' );

    var formDataObject = {};
    formData.forEach(
        ( formElement , formElementIndex ) => {
            formDataObject[ formElement.name ] = formElement.value;
        }
    );

    console.groupEnd();
    return formDataObject;
}


/*** FUNCTION createBurgerData()

Maps fields of form data to burget data.

***/

const createBurgerData = function( formDataObject ) {
    console.group( 'createBurgerData()' );

    var burgerData = {
        burger_name : formDataObject[ 'burger-name' ]
    };

    console.groupEnd();
    return burgerData;
}


/*** FUNCTION handleFormSubmit()
***/

const handleFormSubmit = async function( event ) {
    console.group( 'handleFormSubmit()' );

    // set DOM event handling
    event.stopPropagation();
    event.preventDefault();

    // get burger data from form data
    var formData = $( '#create-burger-form' ).serializeArray();
    var requestData = createBurgerData( createObject( formData ) );

    // create new burger
    await $.ajax(
        {
            url : '/api/burger/create' ,
            method : 'POST' ,
            data : requestData ,
            dataType: 'json'
        }
    )
    .then(
        ( data , textStatus , jqXHR ) => {
            console.log( data );
            console.log( textStatus );
        }
    );

    // refresh window
    location.reload();

    console.groupEnd();
}


/*** FUNCTION handleDevourButtonClick()
***/

const handleDevourButtonClick = async function( event ) {
    console.group( 'handleDevourButtonClick()' );

    // get burger ID
    var burgerId = $( this ).attr( 'data-burger-id' );
    var requestData = { id : burgerId };

    // devour burger
    await $.ajax(
        {
            url : '/api/burger/devour' ,
            method : 'PUT' ,
            data : requestData ,
            dataType: 'json'
        }
    )
    .then(
        ( data , textStatus , jqXHR ) => {
            console.log( data );
            console.log( textStatus );
        }
    );

    // refresh window
    location.reload();

    console.groupEnd();
}


/*** FUNCTION handleReady()
***/

const handleReady = function( event ) {
    console.group( 'handleReady()' );

    // register form event handler
    $( '#create-burger-form' ).on( 'submit' , handleFormSubmit );
    // register button event handlers, including post-cretion
    $( document ).on( 'click' , '.devour-button' , handleDevourButtonClick );


    console.groupEnd();
}


/*** Start
***/

$( handleReady );    // $( document ).ready( handleReady )

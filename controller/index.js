/*** controller/index.js
***/


// export
// other controllers/routers can be added
// exporting an array since `Express.Application.use()` requires
// a module or an array of modules
module.exports = [
    require( './burger' )
];

var express  = require( 'express' ),
    path     = require( 'path' ),
    bp       = require('body-parser'),
    root     = __dirname,
    port     = process.env.PORT || 1337,
    app      = express();

app.use( express.static( path.join( root, './client' )));
app.use( express.static( path.join( root, '.' )));

app.use( bp.json() );

require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});

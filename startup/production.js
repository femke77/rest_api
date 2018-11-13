//for web vulnerability protection and compression

const compression = require('compression');
const helmet = require('helmet');



module.exports = function(app){
    app.use(helmet());
    app.use(compression());
}
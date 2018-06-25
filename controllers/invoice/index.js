const logger = require('../../logger');
const request = require('request');

module.exports = function (req, res) {

    logger.debug('HTML Generation')
    //Extract Required Parameters
    res.render('invoice')
    
};

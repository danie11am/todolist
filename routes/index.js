
/*
 * GET home page.
 */

exports.index = function(req, res){
	
	// This renders a HTML page using the Jade language, in index.js.
	res.render('index', { title: 'Express' });
};
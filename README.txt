
This is a node.js app based on ExpressJS template project.
 
A good intro from a blog post: 
http://thecodebarbarian.wordpress.com/2013/07/22/introduction-to-the-mean-stack-part-one-setting-up-your-tools/

app.js: The main point of entry into your web server. This file defines the port that your application listens for requests on, includes dependencies via the “require” function, and defines handler functions for different REST-ful paths your clients can access.

package.json: Defines internal dependencies for your application. Running “npm install -d” (which we will do shortly when we modify this file) installs all the dependencies listed in the “dependencies” file.

routes: The routes directory will contain Javascript handlers for REST-ful paths defined in app.js. For example, if you open index.js, you’ll see the handler for requests to the “/” path, which renders the “index” template that resides in “views/index.jade”.

views: The views directory will contain templates defined in the Jade language. Jade is a cleaner and more human-readable version of HTML with several extraordinarily useful features, such as inheritance and partials. Your routes will access these views via the “res.render” function that you saw in routes/index.js.

public: The public directory is usually used for images, client-side Javascript, and other static assets. ExpressJS will route requests that correspond to files under the public directory directly to the file. For example, if you run

	node app.js

	and point your browser to http://localhost:3000/stylesheets/style.css, you’ll see that Express returned the contents of the “public/stylesheets/style.css” file.

node_modules: The node_modules file contains source code for tools installed via npm. You can feel safe ignoring its contents for now.

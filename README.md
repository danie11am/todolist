
A simple To-do list web app.

[This explains why it is created](http://daniellam.me/blog/getting-started-on-node-js-and-mean-stack/). You can see the web app [in action here](http://daniellam.me/examples/todolist).

Initial codes are based on [this tutorial](http://thecodebarbarian.wordpress.com/2013/07/29/introduction-to-the-mean-stack-part-two-building-and-testing-a-to-do-list/) and [its associated codes](https://github.com/vkarpov15/mean-stack-todo).

### Running the app 

To run the app in _development_ environment, e.g. your local machine:

	node todolist.js

This site URL will have no path, e.g. `http://localhost:3000/`. 3000 is the default port number for Express.

To run the site in _production_ environment, e.g. a domain like http://daniellam.me/:

	NODE_ENV=production node todolist.js

This will add a path to the site URL, `/examples/todolist`, e.g. `http://daniellam.me:3000/examples/todolist`. 

Port number can be omitted from URL if it is changed to 80 in the code. 80 is the default port number for web requests.

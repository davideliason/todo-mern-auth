# MERN Todo App w/ Authentication

9/6/2018
[David Eliason](http://www.davethemaker.com)

## Intro

This is an application exploring the quintessential CRUD functionality of a MERN stack, using MongoDB, express, node.js, and react.

## Lessons Learned

First off I built an express server with just a few routes: one to GET in order to list all the documents, another to respond to a POST request and subsequently saving req.body data into the colleciton, and UPDATE, which was invoked by targeting a specific document and using req.body data to update document field. Thus, in this first step, we used node.js to connect to the mongodb, create a form, and most of CRUD functionality.



I learned a lot about [passport](https://davideliason.github.io/node/using-passport-with-node/) module, which you can read about in that blog post. The spectrum of modules available to node developers is pretty amazing!

I was uncertain as to approaching the build for this app - I wanted the result of having user login with authentication, and then the functionality of having CRUD for todos along with image uploads. 
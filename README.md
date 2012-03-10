Pivotal Planner
===============

This is a Iteration Planning app for pivotal tracker, currently supports
viewing stories and comments and estimating stories with a cool sockets
poker game.

Add yourself to our [tracker](https://www.pivotaltracker.com/projects/414007)!


1. clone it
2. npm install -d
3. npm update
4. Install redis/mongo
5. node app.js

By default the app launches on port 3000, but you can pass an alternate
port with the PORT environment variable:

> PORT=8888 node app.js

Some stuffs you can do
----------------------

* Create a user
* Once you create a user, you'll need to add a tracker account by logging in and visiting your profile.
* When veiwing an individual project you can enter presentation mode by clicking on the green "[]"
* Navigate using J:next K:previous Q:quiit
* Click estimate to try out the poker spike.

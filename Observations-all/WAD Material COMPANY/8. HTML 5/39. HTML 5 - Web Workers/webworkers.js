/* Code for webworkers.js */

var i = 0;

function fun1()
{
	i = i + 1;
	postMessage(i); //send value to html page
}

setInterval("fun1()", 500);

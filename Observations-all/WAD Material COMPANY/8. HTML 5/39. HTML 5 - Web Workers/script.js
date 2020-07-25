var i = 0;
setInterval(function() {
	i++;
	postMessage(i);
}, 100);

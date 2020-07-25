function fun1()
{
	//alert(window.location.hash);
	var hash = window.location.hash;

	var pagename = "";

	if (hash == "#home")
		pagename = "/Home/Home";
	else if (hash == "#about")
		pagename = "/Home/About";
	else if (hash == "#contact")
		pagename = "/Home/Contact";

	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = fun2;
	xmlhttp.open("get", pagename);
	xmlhttp.send();

	function fun2()
	{
		if (xmlhttp.status == 200)
		{
			document.getElementById("content").innerHTML = xmlhttp.responseText;
		}
	}

	var alllinks = document.querySelectorAll("#navigation a");
	for (i=0; i<alllinks.length; i++)
	{
		alllinks[i].setAttribute("class", "");
	}

	document.querySelectorAll("#navigation a[href='" + hash + "']")[0].setAttribute("class", "active");
}

window.addEventListener("hashchange", fun1);

if (!window.location.hash)
{
	window.location.hash = "#home";
}

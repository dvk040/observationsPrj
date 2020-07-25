$(fun1);

function fun1()
{
	var months  = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

	for (var i=0; i< months.length; i++)
	{
		$("#monthdropdown").append("<option>" + months[i] + "</option>");
	}

	for (var i=1; i<= 31; i++)
	{
		$("#daydropdown").append("<option>" + i + "</option>");
	}

	for (var i=(new Date().getFullYear()); i>=1905; i--)
	{
		$("#yeardropdown").append("<option>" + i + "</option>");
	}

}

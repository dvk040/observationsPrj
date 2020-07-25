<%@ Page Language="C#" %>

<%
	Response.ContentType = "text/event-stream"; //enable server side stream
	Response.Write("data: " + DateTime.Now + "\n\n"); //send data to client
    Response.Flush(); //flush output back to the page
%>


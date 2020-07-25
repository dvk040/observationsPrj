<%@ Page Language="C#" %>
<%
	string s1 = Request.QueryString["uname"];
	string s2 = Request.QueryString["security"];
	
%>

<h1>The server received the following data</h1>
<h2>Username: <%=s1%></h2>
<h2>Security Key: <%=s2%></h2>

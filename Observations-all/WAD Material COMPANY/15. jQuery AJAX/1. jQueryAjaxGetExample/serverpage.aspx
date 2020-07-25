<%@ Page Language="C#" %>

<%
    string s = Request.QueryString["uname"];
    string msg = "Hello to " + s;
    Response.Write(msg);
%>

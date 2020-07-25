<%@ Page Language="C#" %>
<%
    string data = "[" +
                    " { \"empid\": 101, \"empname\": \"Scott\", \"salary\": 3000 }, " +
					" { \"empid\": 102, \"empname\": \"Allen\", \"salary\": 6500 }, "+
					" { \"empid\": 103, \"empname\": \"Jones\", \"salary\": 7500 }, " +
					" { \"empid\": 104, \"empname\": \"Smith\", \"salary\": 2400 }, " +
					" { \"empid\": 105, \"empname\": \"James\", \"salary\": 9500 } " +
				"]";

    Response.ContentType = "application/json";
    Response.Write(data);
    Response.End();
%>

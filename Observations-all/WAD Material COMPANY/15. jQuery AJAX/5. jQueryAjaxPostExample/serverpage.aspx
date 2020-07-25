<%@ Page Language="C#" %>
<%@ Import Namespace="System.Data.SqlClient" %>

<%
    int val1 = Convert.ToInt32(Request.Params["EmpID"]);
    string val2 = Request.Params["EmpName"];
    decimal val3 = Convert.ToDecimal(Request.Params["Salary"]);

    //ado.net code
    SqlConnection cn;
    SqlCommand cmd;
    SqlParameter p1, p2, p3;

    cn = new SqlConnection();
    cmd = new SqlCommand();
    p1 = new SqlParameter();
    p2 = new SqlParameter();
    p3 = new SqlParameter();

    cn.ConnectionString = "data source=localhost; integrated security=yes; initial catalog=employeesdatabase";
    cmd.CommandText = "insert into Employees values(@EmpID, @EmpName, @Salary)";
    cmd.Connection = cn;
    p1.ParameterName = "@EmpID";
    p2.ParameterName = "@EmpName";
    p3.ParameterName = "@Salary";
    p1.Value = val1;
    p2.Value = val2;
    p3.Value = val3;
    cmd.Parameters.Add(p1);
    cmd.Parameters.Add(p2);
    cmd.Parameters.Add(p3);

    cn.Open();
    cmd.ExecuteNonQuery();
    cn.Close();

    string msg = "Successfully Inserted";
    Response.Write(msg);

%>

<%@ Page Language="C#" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>

<%

    SqlConnection cn;
    SqlCommand cmd;
    SqlDataAdapter adp;
    DataSet ds;
    DataTable dt;
    DataRow drow;
    List<Employee> emps;
    JavaScriptSerializer j;

    cn = new SqlConnection();
    cmd = new SqlCommand();
    adp = new SqlDataAdapter();
    ds = new DataSet();
    emps = new List<Employee>();
    j = new JavaScriptSerializer();

    cn.ConnectionString = "data source=localhost; integrated security=yes; initial catalog=employeesdatabase";
    cmd.CommandText = "select * from Employees";
    cmd.Connection = cn;
    adp.SelectCommand = cmd;
    adp.Fill(ds);
    dt = ds.Tables[0];

    for (int i = 0; i < dt.Rows.Count; i++)
    {
        drow = dt.Rows[i];

        emps.Add(new Employee() { EmpID = Convert.ToInt32(drow["EmpID"]), EmpName = Convert.ToString(drow["EmpName"]), Salary = Convert.ToDecimal(drow["Salary"]) });

    }

    string json = j.Serialize(emps);
    Response.ContentType = "application/json";
    Response.Write(json);
    Response.End();

%>

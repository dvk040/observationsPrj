<%@ Page Language="C#" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>

<%
    int n = Convert.ToInt32(Request.QueryString["CountryID"]);

    SqlConnection cn;
    SqlCommand cmd;
    SqlDataAdapter adp;
    SqlParameter p1;
    DataSet ds;
    DataTable dt;
    DataRow drow;
    List<State> states;
    JavaScriptSerializer j;

    cn = new SqlConnection();
    cmd = new SqlCommand();
    adp = new SqlDataAdapter();
    p1 = new SqlParameter();
    ds = new DataSet();
    states = new List<State>();
    j = new JavaScriptSerializer();

    cn.ConnectionString = "data source=localhost; integrated security=yes; initial catalog=countriesandstatesdatabase";
    cmd.CommandText = "select * from States where CountryID=@CountryID";
    cmd.Connection = cn;
    p1.ParameterName = "@CountryID";
    p1.Value = n;
    adp.SelectCommand = cmd;

    cmd.Parameters.Add(p1);
    adp.Fill(ds);
    dt = ds.Tables[0];

    for (int i = 0; i < dt.Rows.Count; i++)
    {
        drow = dt.Rows[i];

        states.Add(new State() { StateID = Convert.ToInt32(drow["StateID"]), StateName = Convert.ToString(drow["StateName"]), CountryID = Convert.ToInt32(drow["CountryID"]) });

    }

    string json = j.Serialize(states); //convert the data into json format

    Response.ContentType = "application/json";
    Response.Write(json);
    Response.End();

%>


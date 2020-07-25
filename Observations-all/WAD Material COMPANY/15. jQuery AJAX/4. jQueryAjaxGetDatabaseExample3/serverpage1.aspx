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
    List<Country> countries;
    JavaScriptSerializer j;

    cn = new SqlConnection();
    cmd = new SqlCommand();
    adp = new SqlDataAdapter();
    ds = new DataSet();
    countries = new List<Country>();
    j = new JavaScriptSerializer();

    cn.ConnectionString = "data source=localhost; integrated security=yes; initial catalog=countriesandstatesdatabase";
    cmd.CommandText = "select * from Countries";
    cmd.Connection = cn;
    adp.SelectCommand = cmd;
    adp.Fill(ds);
    dt = ds.Tables[0];

    for (int i = 0; i < dt.Rows.Count; i++)
    {
        drow = dt.Rows[i];

        countries.Add(new Country() { CountryID = Convert.ToInt32(drow["CountryID"]), CountryName = Convert.ToString(drow["CountryName"]) });

    }

    string json = j.Serialize(countries); //convert the data into json format

    Response.ContentType = "application/json";
    Response.Write(json);
    Response.End();

%>

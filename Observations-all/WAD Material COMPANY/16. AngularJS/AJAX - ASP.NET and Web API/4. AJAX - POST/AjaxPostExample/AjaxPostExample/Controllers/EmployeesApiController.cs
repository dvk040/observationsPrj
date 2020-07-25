using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AjaxPostExample.Models;

namespace AjaxPostExample.Controllers
{
    public class EmployeesApiController : ApiController
    {
        employeesdatabaseEntities db = new employeesdatabaseEntities();

        public string Post(Employee emp)
        {
            db.Employees.Add(emp);
            db.SaveChanges();
            return "Successfully Inserted";
        }
    }
}

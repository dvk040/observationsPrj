using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AjaxDeleteExample.Models;

namespace AjaxDeleteExample.Controllers
{
    public class EmployeesApiController : ApiController
    {
        employeesdatabaseEntities db = new employeesdatabaseEntities();

        public string Delete(int id)
        {
            db.Employees.Remove(db.Employees.Find(id));
            db.SaveChanges();
            return "Successfully Deleted";
        }
    }
}

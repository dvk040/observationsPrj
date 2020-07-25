using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AjaxPutExample.Models;

namespace AjaxPutExample.Controllers
{
    public class EmployeesApiController : ApiController
    {
        employeesdatabaseEntities db = new employeesdatabaseEntities();

        public Employee Get(int id)
        {
            return db.Employees.Find(id);
        }

        public string Put(Employee emp)
        {
            db.Entry(emp).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return "Successfully Updated";
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AjaxGridExample.Models;

namespace AjaxGridExample.Controllers
{
    public class EmployeesApiController : ApiController
    {
        employeesdatabaseEntities db = new employeesdatabaseEntities();

        public List<Employee> Get()
        {
            return db.Employees.ToList();
        }

        public string Post(Employee emp)
        {
            db.Employees.Add(emp);
            db.SaveChanges();
            return "Successfully Inserted";
        }

        public string Put(Employee emp)
        {
            db.Entry(emp).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return "Successfully Updated";
        }

        public string Delete(int id)
        {
            db.Employees.Remove(db.Employees.Find(id));
            db.SaveChanges();
            return "Successfully Deleted";
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AjaxGetExample.Models;

namespace AjaxGetExample.Controllers
{
    public class EmployeesApiController : ApiController
    {
        employeesdatabaseEntities db = new employeesdatabaseEntities();

        public List<Employee> Get()
        {
            return db.Employees.ToList();
        }
    }
}

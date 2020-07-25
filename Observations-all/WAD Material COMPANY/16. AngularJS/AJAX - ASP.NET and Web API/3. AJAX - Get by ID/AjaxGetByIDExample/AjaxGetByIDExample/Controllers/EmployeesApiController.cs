using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AjaxGetByIDExample.Models;

namespace AjaxGetByIDExample.Controllers
{
    public class EmployeesApiController : ApiController
    {
        employeesdatabaseEntities db = new employeesdatabaseEntities();

        public Employee Get(int id)
        {
            return db.Employees.Find(id);
        }
    }
}

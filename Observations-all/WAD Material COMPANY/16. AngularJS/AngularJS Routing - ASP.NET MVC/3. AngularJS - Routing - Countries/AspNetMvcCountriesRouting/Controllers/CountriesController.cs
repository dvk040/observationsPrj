using System;
using AspNetMvcCountriesRouting.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AspNetMvcCountriesRouting.Controllers
{
    public class CountriesController : ApiController
    {

        public List<country> Get()
        {
            angularjscountriesdatabaseEntities db = new angularjscountriesdatabaseEntities();
            List<country> Countries;
            Countries = db.countries.ToList();
            return Countries;
        }

    }
}

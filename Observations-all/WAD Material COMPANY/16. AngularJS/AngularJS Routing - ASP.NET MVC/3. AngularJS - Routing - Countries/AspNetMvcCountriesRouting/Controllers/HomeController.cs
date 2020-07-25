using System;
using System.Web.Mvc;

namespace AspNetMvcCountriesRouting.Controllers
{
    public class HomeController : Controller
    {

        // GET: /Home/Index
        public ActionResult Index()
        {
            return View();
        }

        // GET: /Home/allcountries
        public ActionResult allcountries()
        {
            return View();
        }

        // GET: /Home/countrydetails
        public ActionResult countrydetails()
        {
            return View();
        }

    }
}

using System;
using System.Web.Http;

namespace AjaxExample.Controllers
{
    public class SampleController : ApiController
    {
        public string Get()
        {
            return "Hello";
        }
    }
}

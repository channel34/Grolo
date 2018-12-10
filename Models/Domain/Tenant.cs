using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Tenant
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string WebsiteUrl { get; set; }
        public string Description { get; set; }
        public int AppUserId { get; set; }
        public string ImageUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
       
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class TenantCreateRequest
    {
        [Required, MaxLength(50)]
        public string CompanyName { get; set; }
        [Required, MaxLength(50)]
        public string WebsiteUrl { get; set; }
        [Required]
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        [Required]
        public int AppUserId { get; set; }



    }
}

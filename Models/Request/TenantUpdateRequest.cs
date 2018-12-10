using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class TenantUpdateRequest : TenantCreateRequest
    {
        [Required]
        public int Id { get; set; }
        public string ImageUrl { get; set; }


    }
}

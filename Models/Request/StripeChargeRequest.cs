using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class StripeChargeRequest
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string StripeToken { get; set; }
        public string Description { get; set; }
        public string StripeCustomerId { get; set; }
        public int Amount { get; set; }
        public string UserName { get; set; }
        public int SubscriptionLevel { get; set; }
        public int TenantId { get; set; }
        public int BusinessId { get; set; }
        
    }
}

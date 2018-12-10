using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class StripeSubscriptionType
    {
        public int TenantId { get; set; }
        public int SubscriptionLevel { get; set; }
        public string StripePlanId { get; set; }
        



    }
}

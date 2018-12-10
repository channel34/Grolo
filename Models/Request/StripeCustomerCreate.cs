using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class StripeCustomerCreate
    {
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string SubscriptionType { get; set; }
        public string PaymentToken { get; set; }
        public DateTime SubscriptionStart { get; set; }
        public DateTime SubscriptionEnd { get; set; }
    }
}

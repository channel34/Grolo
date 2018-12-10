using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class StripeSubscriptionInfo
    {
        public int Id { get; set; }
        public int BusinessId { get; set; }
        public string StripeToken { get; set; }
        public string StripeCustomerId { get; set; }
        public string StripeSubscriptionId { get; set; }
        public string StripePlanId { get; set; }
        public int SubscriptionLevel { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime? DateCancelled { get; set; }
    }
}

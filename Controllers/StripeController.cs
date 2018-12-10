using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using Sabio.Services.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers
{
    [AllowAnonymous]
    public class StripeController : ApiController
    {
        readonly StripeService stripeService;
        public StripeController(StripeService stripeService)
        {
            this.stripeService = stripeService;
        }

        #region New Subscription

        [HttpPost, Route("api/pay/newsub")]
        public HttpResponseMessage SignUp(StripeChargeRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            //int userId = User.Identity.GetId().Value;
            int userId = 3;

            stripeService.Subscribe(request, userId);
            return Request.CreateResponse(HttpStatusCode.Created);
        }
        #endregion

        #region Cancel Subscription

        [HttpPut, Route("api/pay/cancelsubscription")]
        public HttpResponseMessage Unsubscribe(StripeChargeRequest req)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            stripeService.CancelSubscription(req);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
        #endregion

        #region Update Subscription
        [HttpPut, Route("api/pay/update/{Id:int}")]
        public HttpResponseMessage Update(StripeChargeRequest req)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            stripeService.UpdateSubscription(req);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
        #endregion

        [HttpGet, Route("api/pay/info/{Id:int}")]
        public HttpResponseMessage GetSubscriptionInfo(int Id)
        {
            if(!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            StripeSubscriptionInfo subscription = stripeService.GetByBusinessId(Id);
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<StripeSubscriptionInfo>
            {
                Item = subscription
            });
        }
    }
}
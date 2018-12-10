using Sabio.Data.Providers;
using Sabio.Data;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests;
using Sabio.Models.Domain;
using System.Data;

namespace Sabio.Services
{
    public class StripeService
    {

        readonly IDataProvider dataProvider;

        public StripeService(IDataProvider dataProvider)
        {

            this.dataProvider = dataProvider;
            StripeConfiguration.SetApiKey("sk_test_DqC9T6G3EwfViCi5qNa7kqLC");	

        }


        #region GetPlanById
        public StripeSubscriptionType GetById(int tenantId, int subscriptionLevel)
        {
            StripeSubscriptionType sub = new StripeSubscriptionType();
            dataProvider.ExecuteCmd(
            "TenantSubscriptionType_SelectById",
            (parameters) =>
            {
                parameters.AddWithValue("@TenantId", tenantId);
                parameters.AddWithValue("@SubscriptionLevel", subscriptionLevel);
            },
            (reader, resultSetIndex) =>
            {
                sub.StripePlanId = (string)reader["StripePlanId"];
            }

            );
            return sub;
        }
        #endregion

        #region New Subscription

        public void Subscribe(StripeChargeRequest req, int userId)
        {
            // do a data provider call for AppUser GetById
            // that will give you the email address

            var plan = GetById( req.TenantId, req.SubscriptionLevel);

            var customers = new Stripe.CustomerService();
            var customer = customers.Create(new CustomerCreateOptions
            {
                SourceToken = req.StripeToken,
                Email = req.Email,
            });
            var items = new List<SubscriptionItemOption> {
                new SubscriptionItemOption{
                   PlanId = plan.StripePlanId
                }
            };
            var options = new SubscriptionCreateOptions
            {
                Items = items,
                CustomerId = customer.Id
            };
            var service = new SubscriptionService();
            Subscription subscription = service.Create(options);
            dataProvider.ExecuteNonQuery(
                "Subscriptions_Insert",
                     (parameters) =>
                     {
                         parameters.AddWithValue("@TenantId", req.TenantId);
                         parameters.AddWithValue("@BusinessId", req.BusinessId);
                         parameters.AddWithValue("@SubscriptionLevel", req.SubscriptionLevel);
                         parameters.AddWithValue("@StripeToken", req.StripeToken);
                         parameters.AddWithValue("@StripeCustomerId", subscription.CustomerId);
                         parameters.AddWithValue("@StripeSubscriptionId", subscription.Id);
                         parameters.AddWithValue("@StartDate", subscription.CurrentPeriodStart);
                         parameters.AddWithValue("@EndDate", subscription.CurrentPeriodEnd);
                          parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                        
                     }
                );           
        }

        #endregion

        #region GetByBusinessId
        public StripeSubscriptionInfo GetByBusinessId(int businessId)
        {
            StripeSubscriptionInfo sub = null;
            dataProvider.ExecuteCmd(
            "Subscriptions_GetByBusinessId",
            (parameters) =>
            {
                parameters.AddWithValue("@BusinessId", businessId);
            },
            (reader, resultSetIndex) =>
            {
                sub = new StripeSubscriptionInfo();
                sub.Id = (int)reader["Id"];
         
                sub.SubscriptionLevel = (int)reader["SubscriptionLevel"];
                sub.StripeSubscriptionId = (string)reader["StripeSubscriptionId"];
                sub.StartDate = (DateTime)reader["StartDate"];
                sub.EndDate = (DateTime)reader["EndDate"];
                sub.StripePlanId = (string)reader["StripePlanId"];
                sub.DateCancelled = reader["DateCancelled"] as DateTime?;
                sub.BusinessId = (int)reader["BusinessId"];
                
            }

            );
            return sub;
        }
        #endregion

        #region Update Subscription
        public void UpdateSubscription(StripeChargeRequest req)
        {
            var newPlan = GetById(req.TenantId, req.SubscriptionLevel);
            var info = GetByBusinessId(req.BusinessId);

            var items = new List<SubscriptionItemUpdateOption> {
            new SubscriptionItemUpdateOption {
            PlanId = newPlan.StripePlanId
            }
            };
            var options = new SubscriptionUpdateOptions
            {
                Items = items,
                Prorate = false
            };

            var service = new SubscriptionService();
            Subscription subscription = service.Update(info.StripeSubscriptionId, options);
           



            dataProvider.ExecuteNonQuery(
                "Subscriptions_Update",
                (parameters) =>
                {
                parameters.AddWithValue("@SubscriptionLevel", req.SubscriptionLevel);
                parameters.AddWithValue("@StripeSubscriptionId", info.StripeSubscriptionId);
                parameters.AddWithValue("@BusinessId", req.BusinessId);
                }

                );

        }
        #endregion

        #region Cancel Subscription

        public void CancelSubscription(StripeChargeRequest req)
        {
            var info = GetByBusinessId(req.BusinessId);
            var service = new SubscriptionService();
            Subscription subscription = service.Cancel(info.StripeSubscriptionId, null);


            dataProvider.ExecuteNonQuery(
              "Subscriptions_Cancel",
              (parameters) =>
              {     
                  parameters.AddWithValue("@BusinessId", req.BusinessId);
              }

              );



        }

        #endregion





    }
}


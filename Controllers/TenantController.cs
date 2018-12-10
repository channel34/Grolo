using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers
{
    [RoutePrefix("api/tenants")]
    public class TenantController : ApiController
    {
        readonly TenantService tenantService;
        public TenantController(TenantService tenantService)
        {
            this.tenantService = tenantService;
        }


        #region Get All
        
        [Route("{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage GetAll(int pageSize, int pageIndex)
        {
            PagedResponse<Tenant> pagedResponse = tenantService.GetAll(pageIndex, pageSize);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedResponse<Tenant>>
            {
                Item = pagedResponse
            });
        }
        #endregion

        #region Search

        [Route("search/{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage Search(int pageIndex, int pageSize, string q)
        {
            PagedResponse<Tenant> pagedResponse = tenantService.Search(pageIndex, pageSize, q);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedResponse<Tenant>>
            {
                Item = pagedResponse
            });
        }

        #endregion

        #region Get By ID
        [Route("{Id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            Tenant tenant = tenantService.GetById(id);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<Tenant>
            {
                Item = tenant
            });
        }
        #endregion

        #region Post

        [Route, HttpPost]
        public HttpResponseMessage Create(TenantCreateRequest tenantCreateRequest)
        {
            if (tenantCreateRequest == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }
            if(!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int newTenantId = tenantService.Create(tenantCreateRequest);

            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newTenantId });
        }
        #endregion

        #region Update
        [Route("{Id:int}"), HttpPut]
        public HttpResponseMessage Update(TenantUpdateRequest tenantUpdateRequest)
        {
            if (tenantUpdateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }
            if(!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            tenantService.Update(tenantUpdateRequest);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
        #endregion

        #region Delete
        [Route("{Id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int Id)
        {
            tenantService.Delete(Id);
            return Request.CreateResponse(HttpStatusCode.OK);

        }
        #endregion
    }
}
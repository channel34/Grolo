using Sabio.Data.Providers;
using Sabio.Models.Responses;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests;
using System.Data;

namespace Sabio.Services
{
    public class TenantService
    {
       readonly IDataProvider dataProvider;

        public TenantService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        #region Get All Tenants
        
        public PagedResponse<Tenant> GetAll(int pageIndex, int pageSize)
        {
            PagedResponse<Tenant> pagedResponse = new PagedResponse<Tenant>();
            List<Tenant> listOfTenants = new List<Tenant>();
            dataProvider.ExecuteCmd(
                "Tenant_SelectAll",
                (parameters) =>
                {
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                },              
                (reader, resultSetIndex) =>
                {
                    Tenant tenant = new Tenant
                    {
                        Id = (int)reader["Id"],
                        CompanyName = (string)reader["CompanyName"],
                        WebsiteUrl = (string)reader["WebsiteUrl"],
                        Description = (string)reader["Description"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                        AppUserId = (int)reader["AppUserId"],
                        ImageUrl = reader["ImageUrl"] as string
                        
                    };
                    pagedResponse.TotalCount = (int)reader["TotalRows"];
                    listOfTenants.Add(tenant);
                });
          
            pagedResponse.PagedItems = listOfTenants;


            return pagedResponse;
                
        }
        #endregion

        #region Search Tenants

        public PagedResponse<Tenant> Search(int pageIndex, int pageSize, string q)
        {
            PagedResponse<Tenant> pagedResponse = new PagedResponse<Tenant>();
            List<Tenant> listOfTenants = new List<Tenant>();
            dataProvider.ExecuteCmd(
                "Tenant_Search",
                (parameters) =>
                {
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                    parameters.AddWithValue("@Search", q ?? (object)DBNull.Value);
                },
                (reader, resultSetIndex) =>
                {
                    Tenant tenant = new Tenant
                    {
                        Id = (int)reader["Id"],
                        CompanyName = (string)reader["CompanyName"],
                        WebsiteUrl = (string)reader["WebsiteUrl"],
                        Description = (string)reader["Description"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                        AppUserId = (int)reader["AppUserId"],
                        ImageUrl = reader["ImageUrl"] as string

                    };
                    pagedResponse.TotalCount = (int)reader["TotalRows"];
                    listOfTenants.Add(tenant);
                });
            pagedResponse.PagedItems = listOfTenants;


            return pagedResponse;

        }
        #endregion

        #region Get Tenant By ID

        public Tenant GetById(int id)
        {
            Tenant tenant = new Tenant();
            dataProvider.ExecuteCmd(
                "Tenant_SelectById",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                },
                (reader, resultSetIndex) =>
                {


                    tenant.Id = (int)reader["Id"];
                    tenant.CompanyName = (string)reader["CompanyName"];
                    tenant.WebsiteUrl = (string)reader["WebsiteUrl"];
                    tenant.Description = (string)reader["Description"];
                    tenant.DateCreated = (DateTime)reader["DateCreated"];
                    tenant.DateModified = (DateTime)reader["DateModified"];
                    tenant.AppUserId = (int)reader["AppUserId"];
                    tenant.ImageUrl = (string)reader["ImageUrl"];




                });
            return tenant;
        }


        #endregion



        #region Create Tenant

        public int Create(TenantCreateRequest request)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(

                "Tenant_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@CompanyName", request.CompanyName);
                    parameters.AddWithValue("@WebsiteUrl", request.WebsiteUrl);
                    parameters.AddWithValue("@Description", request.Description);
                    parameters.AddWithValue("@AppUserId", request.AppUserId);
                    parameters.AddWithValue("@ImageUrl", request.ImageUrl);

                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                },
                (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                });

            return newId;
        }

       

        #endregion

        #region Update Tenant
        public void Update(TenantUpdateRequest request)
        {

            dataProvider.ExecuteNonQuery(
                "Tenant_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", request.Id);
                    parameters.AddWithValue("@CompanyName", request.CompanyName);
                    parameters.AddWithValue("@WebsiteUrl", request.WebsiteUrl);
                    parameters.AddWithValue("@Description", request.Description);
                    parameters.AddWithValue("@ImageUrl", request.ImageUrl);
                    parameters.AddWithValue("@AppUserId", request.AppUserId);
                }
                );

        }


        #endregion

        #region Delete Tenant
        public void Delete(int Id)
        {
            dataProvider.ExecuteNonQuery(
                "Tenant_Delete",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", Id);
                });
                
        }


        #endregion
    }
}

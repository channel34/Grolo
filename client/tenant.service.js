import axios from "axios";

export function submitTenant(payload) {
  return axios.post("/api/tenants", payload);
}

export function getAllTenants(pageIndex, pageSize) {
  return axios.get("/api/tenants/" + pageIndex + "/" + pageSize);
}

export function getTenantById(id) {
  return axios.get("/api/tenants/" + id);
}

export function searchTenants(pageIndex, pageSize, q) {
  return axios.get(
    "/api/tenants/search/" + pageIndex + "/" + pageSize + "?q=" + encodeURIComponent(q)
  );
}

export function deleteTenant(id) {
  return axios.delete("/api/tenants/" + id);
}

export function updateTenant(tenant) {
  return axios.put("/api/tenants/" + tenant.id, tenant);
}

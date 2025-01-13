import { client } from "./httpClient";

export function listhouse(params?: any) {
  return client("/api/admin/house/show", { method: "GET", params: params });
}

export function delhouse(query?: any) {
  return client(`/api/admin/house/delete/${query?.id}`, {
    method: "DELETE",
  });
}

export function listHomeID(query?: any) {
  return client(`/api/admin/house/show/${query.id}`, {
    method: "GET",
  });
}

export function updateByEditHome(body?: any, id?: string) {
  return client(`/api/admin/house/update/${id}`, {
    method: "PATCH",
    body: body,
  });
}

export function UpdateStatusHouse(body?: any) {
  return client(`/api/admin/house/update/rec/${body.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      is_recommend: body.is_recommend,
    }),
  });
}

export function GetHouseHistory(params?: any) {
  return client("/api/admin/house/gethistory", {
    method: "GET",
    params: params,
  });
}

export function GetHouseByZone(params?: any) {
  return client("/api/admin/house/getcount", { method: "GET", params: params });
}

export function listconfirm(params?: any) {
  return client("/api/admin/house/getconfirm", {
    method: "GET",
    params: params,
  });
}

export function UpdateConfirm(body?: any) {
  return client(`/api/admin/house/update/confirm/${body.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      confirmation: body.confirmation,
    }),
  });
}

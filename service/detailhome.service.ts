import { client } from "./httpClient";

export function listdetail(params?: any) {
  return client("/api/admin/amenity/show", { method: "GET", params: params });
}

export function createdetail(body?: any) {
  return client("/api/admin/amenity/create", {
    method: "POST",
    body: body,
  });
}

export function updatedetail(body?: any) {
  return client(`/api/admin/amenity/update/${body.id}`, {
    method: "PATCH",
    body: body,
  });
}


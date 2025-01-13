import { client } from "./httpClient";

// ถ้ามีรูปภาพให้ set header ให้เป็น multipart/form-data
export function createhome(body?: any) {
   
  return client("/api/admin/house/create", {
    method: "POST",
    body: body,
    });
}

export function listamenity(params?: any) {
  return client("/api/admin/amenity/show", { method: "GET", params: params });
}

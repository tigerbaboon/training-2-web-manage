import { client } from "./httpClient";

export function listzone(params?: any) {
  return client("/api/admin/zone/show", { method: "GET", params: params });
}

// export function create(body?: any) {
//   return client("/api/admin/zone/create", {
//     method: "POST",
//     body: body,
//   });
// }

export function GetById(body?: any) {
  return client(`/api/admin/zone/show/${body.id}`, { method: "GET" });
}


 // ถ้ามีรูปภาพให้ set header ให้เป็น multipart/form-data
 export function createzone(body?: any) {
  return client("/api/admin/zone/create", {
     method: "POST",
     body: body,
  });
}

export function EditByZone(body?: any , id?: string) {
  return client(`/api/admin/zone/update/${id}`, {
     method: "PATCH",
     body: body,
  });
}

export function DeleteZone(query?: any) {
  return client(`/api/admin/zone/delete/${query?.id}`, {
     method: "DELETE",
  });
}


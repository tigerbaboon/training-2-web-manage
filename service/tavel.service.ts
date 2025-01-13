import { client } from './httpClient';


// ถ้ามีรูปภาพให้ set header ให้เป็น multipart/form-data
export function createtavel(body?: any) {
    return client("/api/admin/travel/create", {
       method: "POST",
       body: body,
    });
 }

 export function destroy(query?: any) {
    return client(`/api/admin/travel/delete/${query?.id}`, {
       method: "DELETE",
    });
 }

 export function update(body?: any) {
    return client(`/api/admin/travel/update/status/`, {
       method: "PATCH",
       body: body,
    });
 }

 export function GetById(body?: any) {
    return client(`/api/admin/travel/show/${body.id}`, { method: "GET"});
 }
 
 export function updateByEdit(body?: any , id?: string) {
    return client(`/api/admin/travel/update/${id}`, {
       method: "PATCH",
       body: body,
    });
 }

 
export function list(params?: any) {
   return client("/api/admin/travel/show", { method: "GET", params: params });
}

export function updateById(body?: any) {
   return client(`/api/admin/travel/update/status/${body.id}`, {
      method: "PATCH",
      body: JSON.stringify({
         status: body.status,
       }),
   });
}


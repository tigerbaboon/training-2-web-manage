import { client } from './httpClient';

export function UpdatePromote(body?: any) {
    return client(`/api/admin/promote/update/status/${body.id}`, {
       method: "PATCH",
       body: JSON.stringify({
         status: body.status,
       }),
    });
 }

 export function listpromote(params?: any) {
    return client("/api/admin/promote/show", { method: "GET", params: params });
 }
 

 // ถ้ามีรูปภาพให้ set header ให้เป็น multipart/form-data
 export function createpromote(body?: any) {
    return client("/api/admin/promote/create", {
       method: "POST",
       body: body,
    });
 }
 
 export function delpromote(query?: any) {
   return client(`/api/admin/promote/delete/${query?.id}`, {
      method: "DELETE",
   });
}

export function EditByPromote(body?: any , id?: string) {
   return client(`/api/admin/promote/update/${id}`, {
      method: "PATCH",
      body: body,
   });
}



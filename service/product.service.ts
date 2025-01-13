import { client } from './httpClient';

export function info(query?: any) {
   return client(`/example/info/${query.id}`, { method: "GET" });
}

export function create(body?: any) {
   return client("/api/admin/menager/login", {
      method: "POST",
      body: body,
   });
}

// export function updateById(query?: any) {
//    return client(`/api/admin/travel/update/status/${query.id}`, {
//       method: "PATCH",
//    });
// }



// export function updateByEdit(body?: any) {
//    return client(`/api/admin/travel/update/${body.id}`, {
//       method: "PATCH",
//       body: body,
//    });
// }


















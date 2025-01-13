import type { LoginRequest } from "@/models/auth.model";
import { client } from './httpClient';

export function login(body: LoginRequest) {
   return client("/api/admin/manager/login", {
      method: "POST",
      body: body,
   });
}


export function update(body?: any) {
    return client(``, {
       method: "PATCH",
       body: body,
    });
 }


 
export function logout() {
   return client("/auth/logout", {
      method: "POST",
   });
}



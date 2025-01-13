export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token').value;
    if (!token) {
      return navigateTo('/login'); // เปลี่ยนเส้นทางไปยังหน้า login หากไม่มี token
    }
  });
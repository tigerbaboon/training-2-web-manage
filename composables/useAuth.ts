import { useCookie } from 'nuxt/app';

export const useAuth = () => {
    const token = useCookie('token');
    const username = useCookie('username');

    const isAuthenticated = computed(() => !!token.value);

    const login = (newToken: string, newUsername: string) => {
        token.value = newToken;
        username.value = newUsername;
    };

    const logout = () => {
        token.value = null;
        username.value = null;
    };

    return {
        isAuthenticated,
        login,
        logout,
    };
};
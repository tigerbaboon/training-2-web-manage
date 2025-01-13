export const verify = async () => {
    const refToken = setCookie('token')
    const router = useRouter();
    if (refToken.value) {
        // ถ้าโทเค็นมีค่า ให้ทำการดำเนินการต่อไป
    } else {
        removeCookie('username')
        router.push("/");
        // ถ้าโทเค็นไม่มีค่า ให้ลบคุกกี้ที่ชื่อว่า 'username'
    }
}
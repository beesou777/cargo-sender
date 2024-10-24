import { create } from "zustand";
import { User, UserCredential } from "firebase/auth";

type AuthStore = {
    isAuthenticated: boolean
    user?: User | null
    setUser: (data: UserCredential) => void
    logOut: () => void
}

const AUTH_STORE_KEY = "app_cache"

const useAuthStore = create<AuthStore>((set) => {
    let appData: string | null = ''
    if (window) {
        appData = localStorage.getItem("AUTH_STORE_KEY")
    }
    const userData = appData ? JSON.parse(appData) as User : null
    return {
        isAuthenticated: userData ? true : false,
        user: userData,
        setUser: (data: UserCredential) => set(() => {
            localStorage.setItem("AUTH_STORE_KEY", JSON.stringify(data.user))
            return { user: data.user, isAuthenticated: true }
        }),
        logOut: () => set(() => {
            localStorage.removeItem(AUTH_STORE_KEY)
            return { user: null, isAuthenticated: false }
        })
    }
})

export default useAuthStore
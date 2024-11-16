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
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        appData = localStorage.getItem("AUTH_STORE_KEY")
    }
    const userData = appData ? JSON.parse(appData) as User : null
    return {
        isAuthenticated: userData ? true : false,
        user: userData,
        setUser: (data: UserCredential) => set(() => {
            // @ts-ignore
            localStorage.setItem("token", data.user.accessToken)
            localStorage.setItem("AUTH_STORE_KEY", JSON.stringify(data.user))
            return { user: data.user, isAuthenticated: true }
        }),
        logOut: () => set(() => {
<<<<<<< HEAD
            localStorage.removeItem(AUTH_STORE_KEY);
            return { user: null, isAuthenticated: false };
        })         
=======
            localStorage.removeItem(AUTH_STORE_KEY)
            return { user: null, isAuthenticated: false }
        })
>>>>>>> 2689d19ebde031c3eac2c5474db31346d65f7bfb
    }
})

export default useAuthStore
import { UserCredential } from "firebase/auth";
import { create } from "zustand";

type AuthStore = {
    user?: UserCredential | null
    setUser: (data: UserCredential) => void
}

const useAuthStore = create<AuthStore>((set) => {
    return {
        user: null,
        setUser: (data: UserCredential) => set(() => ({ user: data }))
    }
})

export default useAuthStore
import { create } from "zustand";
import { User, UserCredential } from "firebase/auth";
import Cookies from "js-cookie";

type AuthStore = {
  isAuthenticated: boolean;
  user?: User | null;
  setUser: (data: UserCredential) => void;
  logOut: () => void;
};

const AUTH_STORE_KEY = "app_cache";

const useAuthStore = create<AuthStore>((set) => {
  let appData: string | null = "";
  
  appData = Cookies.get("AUTH_STORE_KEY")
  const userData = appData ? (JSON.parse(appData)) : null;
  return {
    isAuthenticated: userData && appData ? true : false,
    user: userData,
    setUser: (data: UserCredential) =>
      set(() => {
        // @ts-ignore
        Cookies.set("token", data.user.accessToken, { expires: 30 / 1440 }); 
        Cookies.set("AUTH_STORE_KEY", JSON.stringify(data.user), { expires: 30 / 1440 });
        return { user: data.user, isAuthenticated: true };
      }),
    logOut: () =>
      set(() => {
        localStorage.removeItem(AUTH_STORE_KEY);
        Cookies.remove("AUTH_STORE_KEY");
        Cookies.remove("token");
        return { user: null, isAuthenticated: false };
      }),
  };
});

export default useAuthStore;

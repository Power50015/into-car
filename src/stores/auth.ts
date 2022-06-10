import { defineStore } from "pinia";
import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const db = getFirestore();

// wait until auth is ready
const unsub = await onAuthStateChanged(auth, async (user) => {
  const authState = useAuthStore();
  if (user) {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      authState.isLogin = true;
      authState.userName = doc.data().name;
      authState.userEmail = doc.data().email;
      authState.userImg = doc.data().img;
      authState.userType = doc.data().type;
      if (doc.data().type == "maintenance") {
        authState.userPhone = doc.data().phone;
        authState.userAddress = doc.data().address;
      }
    });
    authState.isLoding = true;
  } else {
    authState.isLoding = true;
  }
  unsub();
});

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isLogin: false,
    isLoding: false,
    userType: "",
    userName: "",
    userEmail: "",
    userImg: "",
    userAddress: "",
    userPhone: "",
  }),
  getters: {},
  actions: {},
});

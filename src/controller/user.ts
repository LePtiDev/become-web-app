import { use } from "vue/types/umd";
import { firebaseApp } from "../plugins/firebase";
import { getAllDataFromCollectionWithAll, addDataToCollection } from "../helpers/firebase";
import store from "../store/index";
import router from "../router";

class User {
  // Create a new user
  async createUser(type: string, form: any) {
    if (type == "email") {
      await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then((userCredential: any) => {
          addDataToCollection("user_data", {
            user_id: userCredential.user.uid,
            first_name: form.first_name,
            last_name: form.last_name,
          });
          this.setUser(userCredential.user.uid);
          router.push({ name: "dashboard" });
        })
        .catch((error: any) => {
          console.log(error.message);
        });
    }
  }
  // Set the login
  setLogin(form: any, goTo?: any) {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((userCredential: any) => {
        this.setUser(userCredential.user.uid);
        if (goTo) {
          router.push({ name: goTo });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  // Set user during login or sign in
  async setUser(userUUID: string) {
    const user: any = await getAllDataFromCollectionWithAll("userData", [
      {
        field: "user_id",
        compare: "==",
        value: userUUID,
      },
    ]);
    store.commit("user/setUserData", user[0]);
  }
}

export { User };

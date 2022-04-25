import { firebaseApp } from "../plugins/firebase";

class user {
  createUser(type: string, email: string, password: string) {
    if (type == "email") {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential: any) => {
          const user = userCredential.user;
        })
        .catch((error: any) => {
          console.log(error.message);
        });
    }
  }
}

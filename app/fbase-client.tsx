// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification, createUserWithEmailAndPassword, sendPasswordResetEmail, User, updateProfile, deleteUser } from "firebase/auth";
import { getFirestore, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIQKNaRwnsxlCSZBACO1K7QRwSRlRjFwE",
  authDomain: "varnotsava-405511.firebaseapp.com",
  projectId: "varnotsava-405511",
  storageBucket: "varnotsava-405511.appspot.com",
  messagingSenderId: "808606184188",
  appId: "1:808606184188:web:b0e51856474ba07f701d79",
  measurementId: "G-WB3VPNT4EK"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const _auth = getAuth();
const storage = getStorage();
const firestore = getFirestore();

function _loginRequired(router: AppRouterInstance, redirect: boolean = true):Promise<User | null> {
    return new Promise((resolve) => {
        _auth.onAuthStateChanged((user) => {
            if(!user) {
                if(redirect) {
                    router.push("/login");
                }
                resolve(null);
            } else {
                resolve(user);
            }
            _auth.onAuthStateChanged(() => {});
        });
    });
}

export const auth = _auth;
export const loginRequired = _loginRequired;
export const loginWithGoogle = () => {
    return new Promise((resolve) => {
        let provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider).then(userCredential => {
            let user = userCredential.user;
            if(user) {
                resolve(user);
            } else {
                resolve(null);
            }
        }).catch(() => {
            resolve(null);
        });
    });
}

function uploadPFP(user: User, photo: any):Promise<string|null> {
    return new Promise((resolve) => {
        let picName:any = photo.name || "";
        if(picName) {
            picName = picName.split(".");
            picName[0] = "profile";
            picName = picName.join(".");
        } else {
            picName = `profile.${photo.type.split("image/")[1]}`;
        }
    
        var storageRef = ref(storage, "/hackotsava-2k24/users/" + user.uid + '/profilePicture/' + picName);
    
        const metadata = {
            contentType: photo.type
        };
        //Upload file
        uploadBytes(storageRef, photo, metadata)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
            });
        })
        .catch((err) => {
            console.log(err);
            resolve(null);
        });
    });
}

export const loginWithEmail = (email:string, password:string, type:string = "login", router:any = null) => {
    return new Promise((resolve) => {
        if(type === "login") {
            signInWithEmailAndPassword(auth, email, password).then(userCredential => {
                let user = userCredential.user;
                if(user) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            }).catch(() => {
                resolve(null);
            });
        } else if(type === "create") {
            createUserWithEmailAndPassword(auth, email, password).then(async userCredential => {
                let user = userCredential.user;
                if(user) {
                    await sendEmailVerification(user);
                    alert("Verification email has been sent!");

                    if(!user.photoURL) {
                        try {
                            let avatarId = email.split("@")[0];
                            let res = await fetch(`https://api.multiavatar.com/${avatarId}.png`);
                            let blob = await res.blob();        
                            let photoURL:string | null = await uploadPFP(user, blob);
                            await updateProfile(user, {
                                displayName: avatarId, photoURL: photoURL
                            }); 
                            if(router) {
                                router.push("/login");
                            }
                        } catch(e) {
                            console.log(e);
                        }
                    }
                    await auth.signOut();
                    resolve(null);
                } else {
                    resolve(null);
                }
            }).catch(() => {
                alert("There was some error! Check if account with email already exists!");
                resolve(null);
            });
        }
    });
}

export const resetPasswordEmail = (email: string) => {
    return new Promise(async (resolve) => {
        await sendPasswordResetEmail(auth, email);
        alert("Password Reset Email has been sent!");
        resolve(null);
    });
}

export const deleteAccount = () => {
    return new Promise((resolve) => {
        let user = auth.currentUser;
        if(user) {
            const storageRef = ref(storage, "/hackotsava-2k24/users/" + user.uid + '/profilePicture');
            listAll(storageRef).then((listResults) => {
                const promises = listResults.items.map((item) => {
                    return deleteObject(item);
                });
                Promise.all(promises).then(() => {
                    deleteUser(user).then(() => {
                        // User deleted.
                        resolve(null);
                    }).catch((error) => {
                        // An error ocurred
                        // ...
                        console.log(error);
                        // resolve(null);
                    });
                });
            });
        } else {
            resolve(null);
        }
    });
}

export const updatePf = async (displayName: string, photo: any, type:string = "blob") => {
    let user = auth.currentUser;
    if(user) {
        try {
            let photoURL:string | null;
            if(type === "blob") {
                photoURL = await uploadPFP(user, photo);
            } else {
                photoURL = photo;
            }
            await updateProfile(user, {
                displayName: displayName, photoURL: photoURL
            }); 
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    } else {
        return false;
    }
}

export const checkUserBookmark = (id: string) : Promise<boolean> => {
    return new Promise((resolve) => {
        let user = auth.currentUser;
        if(user && user.email) {
            let ref = doc(firestore, "hackotsava-2k24", "storage", "users", user.email);
            getDoc(ref).then((res) => {
                let data = res.data();
                if(data) {
                    if(data.bookmarks) {
                        if(data.bookmarks.includes(id)) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            });
        } else {
            resolve(false);
        }
    });
}

export const updateBookmark = (id: string, data: boolean) : Promise<boolean> => {
    return new Promise((resolve) => {
        let user = auth.currentUser;
        if(user && user.email) {
            let ref = doc(firestore, "hackotsava-2k24", "storage", "users", user.email);
            updateDoc(ref, {
                bookmarks: data ? arrayUnion(id) : arrayRemove(id)
            }).then((res) => {
                resolve(true);
            });
        } else {
            resolve(false);
        }
    });
}

export const fetchBookmarks = () : Promise<Array<string>> => {
    return new Promise((resolve) => {
        let user = auth.currentUser;
        if(user && user.email) {
            let ref = doc(firestore, "hackotsava-2k24", "storage", "users", user.email);
            getDoc(ref).then((res) => {
                let data = res.data();
                if(data) {
                    let bookmarks = data.bookmarks;
                    if(bookmarks) {
                        resolve(data.bookmarks);
                    } else {
                        resolve([]);
                    }
                } else {
                    resolve([]);
                }
            });
        } else {
            resolve([]);
        }
    });
}
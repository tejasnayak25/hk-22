"use client";

import Image from "next/image";
import Loader from "../loader";
import { useEffect, useRef, useState } from "react";
import Form from "../form";
import "@iconscout/unicons/css/line.css";
import Navbar from "../navbar";
import { auth, deleteAccount, loginRequired, updatePf } from "../fbase-client";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import ChatUI from "../chatbot";

export default function Home() {
    let [ loading, setLoading ] = useState(true);
    let userRef = useRef<HTMLImageElement>(null);
    let pfpRef = useRef<HTMLImageElement>(null);
    let nameRef = useRef<HTMLInputElement>(null);
    let emailRef = useRef<HTMLInputElement>(null);
    let router = useRouter();

    useEffect(() => {
        // document.onloadedmetadata = () => {
        let userref:Promise<User | null> = loginRequired(router);

        userref.then((user: User | null) => {
            if(user) {
                if(userRef.current) {
                    userRef.current.src = user.photoURL || userRef.current.src;
                }
                if(pfpRef.current) {
                    pfpRef.current.src = user.photoURL || pfpRef.current.src;
                }
                if(nameRef.current) {
                    nameRef.current.value = user.displayName || nameRef.current.value;
                }
                if(emailRef.current) {
                    emailRef.current.value = user.email || emailRef.current.value;
                }
            }
        });
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        // }
    }, []);
    return (
        <>
        <Loader loading={loading}></Loader>
        <div className=" flex justify-center items-center w-full h-full absolute top-0 z-[49]">
            <div className=" w-full h-full  flex flex-col gap-5 py-10">
                <Navbar user_ref={userRef}></Navbar>
                <div className="relative flex md:flex-row flex-col items-center w-full flex-1 z-[47] overflow-y-auto">
                    <div className=" flex md:flex-row flex-col md:w-1/2 w-full md:justify-center justify-normal">
                        <div className="md:mt-10 mt-0 flex flex-col gap-3 justify-center items-center md:h-full h-fit md:w-1/2 w-full md:p-0 p-10 pb-4">
                            <p className=" md:text-4xl text-3xl font-bold leagueSpartan text-white">Account</p>
                            <a className="md:text-2xl text-lg text-gray-400 hover:underline" href="/account">View My Posts</a>

                            {/* <a className="text-2xl text-gray-400 hover:underline" href="/forgot-password">Forgot password?</a> */}
                        </div>
                        <div className=" flex flex-col gap-5 md:w-fit w-full p-7 justify-center items-center">
                            <Image
                                src={"/user.svg"}
                                width={500}
                                height={500}
                                alt="User"
                                ref={pfpRef}
                                className=" w-44 aspect-square rounded-full"
                            />
                            <div className="relative mb-4 flex justify-center z-10 w-full">
                                <button onClick={() => {
                                    let img = document.getElementById("image-file");
                                    if(img) {
                                        img.click();
                                    }
                                }} className=' md:w-full w-2/3 btn border-0 rounded-full bg-[#005d5b] text-white hover:bg-[#005d5cc0]'>Change</button>
                                <input onChange={async (e) => {
                                    let files = e.target.files;
                                    if(files) {
                                        if(files.length > 0) {
                                            if(nameRef.current) {
                                                let name = nameRef.current.value;
                                                let res = await updatePf(name, files[0]);
                                                if(res) {
                                                    if(userRef.current) {
                                                        userRef.current.src = auth.currentUser?.photoURL || userRef.current.src;
                                                    }
                                                    if(pfpRef.current) {
                                                        pfpRef.current.src = auth.currentUser?.photoURL || pfpRef.current.src;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }} id="image-file" type="file" accept="image/*" className="hidden" />
                            </div>
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col justify-center items-center flex-1 md:w-1/2 w-full gap-5 p-8">
                        <div className="w-full md:max-w-md">
                            <div className="h-full border-2 border-[#00bcae] bg-[#003a35] rounded-lg overflow-hidden p-6">
                                <Form items={[{ type: "input", id: "name", label: "Display Name", ref: nameRef, placeholder: "John Doe", inp_type: "text" }, { type: "input", id: "email", label: "Email", ref: emailRef, disabled: true, placeholder: "abc@gmail.com", inp_type: "text" }, { type: "button", label: "Update", onClick: async () => {
                                    let user = auth.currentUser;
                                    if(nameRef.current && user) {
                                        let name = nameRef.current.value;
                                        let res = await updatePf(name, user.photoURL, "url");
                                        if(res) {
                                            if(userRef.current) {
                                                userRef.current.src = auth.currentUser?.photoURL || userRef.current.src;
                                            }
                                            if(pfpRef.current) {
                                                pfpRef.current.src = auth.currentUser?.photoURL || pfpRef.current.src;
                                            }
                                            alert("Account updated successfully!");
                                        }
                                    }
                                } }]}></Form>
                            </div>
                        </div>
                        <div className=" flex md:flex-col flex-row gap-3">
                            <button onClick={async () => {
                                await auth.signOut();
                                router.push("/login");
                            }} className="btn border-0 btn-circle bg-[#005d5b] text-[#00bcae] hover:bg-[#005d5cdd]">
                                <i className="uil uil-signout text-xl"></i>
                            </button>
                            <button onClick={() => { router.push("/forgot-password") }} className="btn border-0 btn-circle bg-[#005d5b] text-[#00bcae] hover:bg-[#005d5cdd]">
                                <i className="uil uil-key-skeleton text-xl"></i>
                            </button>
                            <button onClick={async () => {
                                if(confirm("Are you sure you want to delete your account?")) {
                                    await deleteAccount();
                                    router.push("/login");
                                }
                            }} className="btn border-0 btn-circle btn-error text-white">
                                <i className="uil uil-trash-alt text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Image
                src={"/flowers.png"}
                alt="Art"
                priority
                className=" md:z-48 z-[46] overflow-hidden object-contain object-center fixed bottom-0 left-0 w-64 aspect-square"
                style={{imageRendering: "pixelated"}}
                width={"500"}
                height={"500"}
            />
        </div>
        <ChatUI></ChatUI>
        </>
    );
}

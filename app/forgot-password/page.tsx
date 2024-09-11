"use client";

import Image from "next/image";
import Loader from "../loader";
import { useEffect, useState } from "react";
import Form from "../form";
import "@iconscout/unicons/css/line.css";

export default function Home() {
    let [ loading, setLoading ] = useState(true);

    useEffect(() => {
        // document.onloadedmetadata = () => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        // }
    }, []);
    return (
        <>
        <Loader loading={loading}></Loader>
        <div className=" flex justify-center items-center w-full h-full absolute top-0 z-[49]">
            <div className="absolute flex md:flex-row flex-col w-full h-full z-[47]">
                <div className=" flex flex-col gap-3 justify-center items-center md:h-full h-fit md:w-1/2 w-full md:pt-0 pt-20 pb-4">
                    <p className=" md:text-4xl text-3xl text-center font-bold leagueSpartan text-white">Forgot Password?</p>
                    <a className="md:text-2xl text-lg text-gray-400 hover:underline md:mb-10 mb-0" href="/login">Return To Login</a>

                    {/* <a className="text-2xl text-gray-400 hover:underline" href="/forgot-password">Forgot password?</a> */}
                </div>
                <div className="flex justify-center md:items-center items-start flex-1 md:w-1/2 w-full p-8">
                    <div className="w-full md:max-w-md h-fit">
                        <div className="h-full border-2 border-[#00bcae] bg-[#003a35] rounded-lg overflow-hidden p-6">
                            <Form items={[{ type: "input", id: "email", label: "Email", placeholder: "abc@gmail.com", inp_type: "text" }, { type: "button", label: "Send Mail" }]}></Form>
                        </div>
                    </div>
                </div>
            </div>
            <Image
                src={"/flowers.png"}
                alt="Art"
                priority
                className=" md:z-48 z-[46] overflow-hidden object-contain object-center absolute bottom-0 left-0 w-64 aspect-square"
                style={{imageRendering: "pixelated"}}
                width={"500"}
                height={"500"}
            />
        </div>
        </>
    );
}

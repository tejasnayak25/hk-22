"use client";

import Loader from "../loader";
import { useEffect, useRef, useState } from "react";
import Navbar from "../navbar";
import "../style.css";
import "@iconscout/unicons/css/line.css";
import { loginRequired } from "../fbase-client";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";

export default function Explore() {
    let [ loading, setLoading ] = useState(true);
    let router = useRouter();
    let userRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let userref:Promise<User | null> = loginRequired(router);

        userref.then((user: User | null) => {
            if(user) {
                if(userRef.current) {
                    userRef.current.src = user.photoURL || userRef.current.src;
                }
            }
        });
    // document.onloadedmetadata = () => {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    // }
  }, []);
    return (
        <>
            <Loader loading={loading}></Loader>
            <div className=" flex justify-center items-center w-full h-full absolute top-0 z-[49]">
                <div className=" absolute top-0 w-full h-full flex flex-col py-10">
                    <Navbar user_ref={userRef}></Navbar>
                    <div className=" flex-1 p-10 pt-14 flex flex-col items-center overflow-y-auto">
                      <p className=" font-semibold md:text-5xl text-3xl leagueSpartan text-white mb-3">Sanskriti</p>
                      <p className=" text-gray-400 mb-10">By FeatureX</p>
                      <p className=" md:px-10 px-0 text-gray-400 mb-5">
                      We are an online heritge gallery
                      </p>
                      <div className=" flex justify-center items-center text-white p-5">
                        <button className=" btn btn-square btn-ghost">
                          <i className="uil uil-instagram text-3xl"></i>
                        </button>
                        <button className=" btn btn-square btn-ghost">
                          <i className="uil uil-twitter text-3xl"></i>
                        </button>
                        <button className=" btn btn-square btn-ghost">
                          <i className="uil uil-youtube text-3xl"></i>
                        </button>
                      </div>
                      <p className=" text-gray-400"><i className=" uil uil-copyright text-lg"></i>2024 - FeatureX</p>
                    </div>
                </div>
            </div>
        </>
    );
}
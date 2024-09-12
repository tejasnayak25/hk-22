"use client";

import Loader from "../loader";
import { useEffect, useRef, useState } from "react";
import * as Heritage from "../heritage_data.json";
import Navbar from "../navbar";
import "../style.css";
import "@iconscout/unicons/css/line.css";
import "@iconscout/unicons/css/solid.css";
import { getPlaces } from "./getPlaces";
import { User } from "firebase/auth";
import { fetchBookmarks, loginRequired } from "../fbase-client";
import { useRouter } from "next/navigation";

export default function Explore() {
    let [ loading, setLoading ] = useState(true);
    let [ items, setItems ] = useState([]);
    let userRef = useRef<HTMLImageElement>(null);
    let router = useRouter();

  useEffect(() => {
    let userref:Promise<User | null> = loginRequired(router);

        userref.then((user: User | null) => {
            if(user) {
                if(userRef.current) {
                    userRef.current.src = user.photoURL || userRef.current.src;
                }
            }
        });

        let list:any = [];

        fetchBookmarks().then(data => {
          for (let i = 0; i < data.length; i++) {
            const d_item = data[i];
            let herit_data = Object.values(Heritage).find(item => item.id === d_item);
            list.push(herit_data);
          }
          setItems(list);
        });
    // document.onloadedmetadata = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    // }
  }, [items]);
    return (
        <>
            <Loader loading={loading}></Loader>
            <div className=" flex justify-center items-center w-full h-full absolute top-0 z-[49]">
                <div className=" absolute top-0 w-full h-full flex flex-col py-10">
                    <Navbar user_ref={userRef}></Navbar>
                    <div className=" flex-1 grid gap-5 md:grid-cols-3 grid-cols-1 md:p-10 p-5 overflow-y-auto">
                        {getPlaces(items)}
                    </div>
                </div>
            </div>
        </>
    );
}
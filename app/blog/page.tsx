"use client";

import Image from "next/image";
import Loader from "../loader";
import { useEffect, useState } from "react";
import * as Heritage from "../heritage_data.json";
import Navbar from "../navbar";
import "../style.css";
import "@iconscout/unicons/css/line.css";
import { getBlogs } from "./getBlogs";

export default function Explore() {
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
                <div className=" absolute top-0 w-full h-full flex flex-col py-10">
                    <Navbar></Navbar>
                    <div className=" flex-1 grid gap-5 md:grid-cols-3 grid-cols-1 md:p-10 p-5 overflow-y-auto">
                        <div className="p-4 w-full">
                          <div className="bg-[#005d5b] w-full h-full p-2 rounded-lg">
                            <div className=" w-full h-full border-4 border-dashed border-gray-400 rounded-lg flex justify-center items-center">
                              <Image
                                src={"/plus.svg"}
                                alt="Plus icon"
                                className=" w-20 aspect-square"
                                width={500}
                                height={500}
                              />
                            </div>
                          </div>
                        </div>
                        {getBlogs(Heritage)}
                    </div>
                </div>
            </div>
        </>
    );
}
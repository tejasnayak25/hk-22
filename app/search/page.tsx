"use client";

import Loader from "../loader";
import { useEffect, useState } from "react";
import * as Heritage from "../heritage_data.json";
import Navbar from "../navbar";
import "../style.css";
import "@iconscout/unicons/css/line.css";
import "@iconscout/unicons/css/solid.css";
import { getPlaces } from "./getPlaces";

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
                    <div className=" md:px-16 px-8 py-2 w-full flex">
                      <input type="search" name="search" id="search" placeholder="Search" className="placeholder:text-[#00bcae] input flex-shrink-0 flex-1 rounded-s-full input-bordered bg-[#057775]" />
                      <button className=" rounded-e-full border-0 btn btn-square text-[#00bcae] bg-[#057775] hover:bg-[#057775] px-8">
                        <i className=" uil uil-search text-xl"></i>
                      </button>
                    </div>
                    <div className=" flex-1 grid gap-5 md:grid-cols-3 grid-cols-1 md:p-10 p-5 overflow-y-auto">
                        {getPlaces(Heritage)}
                    </div>
                </div>
            </div>
        </>
    );
}
"use client";

import { useParams, useRouter } from "next/navigation";
import Loader from "../loader";
import { useEffect, useState } from "react";
import Heritage from "../../../heritage_data.json";
import Image from "next/image";
import "@iconscout/unicons/css/line.css";

export default function Place() {
    let { id } = useParams();

    let [ loading, setLoading ] = useState(true);
    let router = useRouter();

    let item = Heritage.find(item => item.id === id);

    if(!item) {
        router.push("/explore");
    }
    useEffect(() => {
        // document.onloadedmetadata = () => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        // }
    }, []);
    return (
        <>
            <div className=" w-full h-full">
                <Loader info={item ? {name: item.name, image: item.image} : { name: "", image: "" }} loading={loading}></Loader>
                <div className=" absolute top-0 w-full h-full flex flex-col max-h-dvh">
                    <div className=" w-full flex-1 relative overflow-hidden">
                        <Image
                            src={item ? item.image : ""}
                            alt="Background"
                            width={1280}
                            height={720}
                            className="w-full h-full object-cover object-top"
                        />
                        <div className=" absolute top-0 w-full h-full from-transparent to-[#142a31] bg-gradient-to-b"></div>
                    </div>
                    <div className=" p-5 min-h-32">
                        <p className=" w-full text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia esse in voluptate corporis aut, hic dolores perferendis unde eius. A cum ipsam cumque eos consequuntur, id recusandae aliquam quae itaque?</p>
                    </div>
                    <div className=" absolute top-0 w-full h-full pt-10 md:px-32 px-5">
                        <div className="bg-black rounded-md bg-opacity-50 flex justify-between items-center">
                            <button className="btn btn-square btn-ghost text-white">
                                <i className=" uil uil-angle-left text-4xl"></i>
                            </button>
                            <p className="leagueSpartan font-semibold text-xl">{item?.name}</p>
                            <button className="btn btn-square btn-ghost text-white">
                                <i className=" uil uil-volume text-3xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}
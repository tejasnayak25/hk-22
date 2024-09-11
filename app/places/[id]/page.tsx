"use client";

import { useParams, useRouter } from "next/navigation";
import Loader from "./loader";
import { useEffect, useState } from "react";
import Heritage from "../../heritage_data.json";

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
            </div> 
        </>
    )
}
import { useEffect } from "react";
import "../../style.css";
import Image from "next/image";

interface Info {
    image: string;
    name: string;
};

export default function Loader({ loading, info = { name: "", image: "" } }: { loading: boolean, info: Info }) {
    useEffect(() => {
        if(!loading) {
            document.getElementById("loading-window")?.classList.replace("flex", "hidden");
        }
    }, [loading]);
    return (
        <div id="loading-window" className={`${loading ? "flex" : "hidden"} justify-center items-center w-full h-full fixed top-0 z-50`}>
            <Image
                src={info.image}
                alt="Loader"
                priority
                className={` w-dvw h-dvh overflow-hidden object-cover object-center bg-blend-color-burn`}
                style={{imageRendering: "crisp-edges"}}
                unoptimized
                width={"1152"}
                height={"648"}
            />
            <div className=" absolute top-0 w-full h-full bg-[#005d5b] opacity-70"></div>
            <div className=" absolute top-0 w-full h-full flex flex-col gap-10 justify-center items-center">
                <p className=" maragsa md:text-5xl text-4xl">{info.name}</p>
                <div className=" md:w-1/3 w-2/3 h-2 rounded-full bg-[#00bcae] relative overflow-hidden">
                    <div className=" h-full w-2/3 bg-[#ebb840] loader absolute"></div>
                </div>
            </div>
        </div>
    );
}
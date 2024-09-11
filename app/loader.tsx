import { useEffect } from "react";
import "./style.css";
import Image from "next/image";

export default function Loader({ loading }: { loading: boolean }) {
    useEffect(() => {
        if(!loading) {
            console.log("hi")
            document.getElementById("loading-window")?.classList.replace("flex", "hidden");
        }
    }, [loading]);
    return (
        <div id="loading-window" className={`${loading ? "flex" : "hidden"} justify-center items-center w-full h-full absolute top-0 z-50`}>
            <Image
                src={"/loading.gif"}
                alt="Loader"
                priority
                className={` w-dvw h-dvh overflow-hidden object-cover object-center bg-blend-color-burn`}
                style={{imageRendering: "crisp-edges"}}
                unoptimized
                width={"1152"}
                height={"648"}
            />
            <div className=" absolute top-0 w-full h-full flex justify-center items-center">
                <div className=" md:w-1/3 w-2/3 h-2 rounded-full md:mt-32 mt-40 bg-[#00bcae] relative overflow-hidden">
                    <div className=" h-full w-2/3 bg-[#ebb840] loader absolute"></div>
                </div>
            </div>
        </div>
    );
}
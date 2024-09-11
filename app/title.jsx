import Image from "next/image";

export default function TitleBar() {
    return (
        <div className=" hidden justify-center items-center w-full h-full absolute top-0 z-[49]">
            <Image
                src={"/title-page-bg.png"}
                alt="Title BG"
                priority
                className=" w-dvw h-dvh overflow-hidden object-cover object-center "
                style={{imageRendering: "pixelated"}}
                width={"1366"}
                height={"768"}
            />
            <p className=" text-9xl richmond absolute text-[#ffce38]">Sanskriti</p>
            <Image
                src={"/flowers.png"}
                alt="Art"
                priority
                className=" overflow-hidden object-contain object-center absolute bottom-0 left-0 w-80 aspect-square"
                style={{imageRendering: "pixelated"}}
                width={"500"}
                height={"500"}
            />
        </div>
    );
}
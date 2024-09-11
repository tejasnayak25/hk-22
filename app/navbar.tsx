import "material-symbols/index.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar({ page = "normal" }){
    let [menuState, setMenuState] = useState(false);

    useEffect(() => {
        let menuBtn = document.getElementById("menu-btn");
        let mobileNav = document.getElementById("mobile-nav");
        
        if (menuBtn) {
            menuBtn.onclick = () => {
                setMenuState((prevState) => {
                    const newState = !prevState;
                    
                    if (newState) {
                        mobileNav?.classList.replace("hidden", "flex");
                    } else {
                        mobileNav?.classList.replace("flex", "hidden");
                    }
                    
                    console.log(newState); // Now this will correctly reflect the updated state
                    return newState;
                });
            };
        }
    }, []);
    return(
        <div className="flex justify-center w-full md:px-10 px-5">
            <header className={` ${page === "normal" ? "bg-transparent" : "bg-[#003a35]"} ${page==="home" ? "w-fit" : "w-full"}  rounded-md opacity-[0.77] px-3 flex ${page==="home" ? "justify-center" : "justify-between"}`}>
                <div className={`${page==="home" ? "hidden" : "flex"} items-center gap-3`}>
                    <Image
                        src={"/logo.png"}
                        alt="Logo"
                        width={500}
                        height={500}
                        className=" w-10 aspect-square object-contain"
                    />
                    <p className=" font-semibold leagueSpartan text-xl">Sanskriti</p>
                </div>
                <nav className=" md:block hidden">
                <div
                    className={""}
                    id="nav-menu"
                >
                    <ul className="flex gap-5">
                    <li className="py-3 px-3">
                        <a href="/" className="text-[#09dbcc] flex items-center">Home</a>
                    </li>
                    <li className="py-3 px-3">
                        <a href="/explore" className="text-[#09dbcc] flex items-center">Explore</a>
                    </li>
                    <li className="py-3 px-3">
                        <a href="/search" className="text-[#09dbcc] flex items-center">Search</a>
                    </li>
                    <li className="py-3 px-3">
                        <a href="/blog" className="text-[#09dbcc] flex items-center">Blog</a>
                    </li>
                    <li className="py-3 px-3">
                        <a href="/bookmarks" className="text-[#09dbcc] flex items-center">Bookmarks</a>
                    </li>
                    <li className={` py-3 px-3 ${page==="home" ? "block" : "hidden"}`}>
                        <a href="/more" className="text-white flex items-center">
                            <span className="material-symbols-rounded">menu</span>
                        </a>
                    </li>
                    </ul>
                    </div>
                </nav>

                <div className={`${page==="home" ? "hidden" : "flex"} items-center gap-5`}>
                    <a id="menu-btn" className="text-white flex items-center">
                        <span className="material-symbols-rounded">{ menuState ? "close" : "menu" }</span>
                    </a>
                    <Image
                        src={"/user.svg"}
                        alt="Placeholder"
                        width={500}
                        height={500}
                        className=" w-10 aspect-square object-contain"
                    />
                </div>
            </header>
            <div id="mobile-nav" className=" absolute z-40 md:hidden hidden flex-col list-none mobile-nav bg-[#142a31] p-5 mt-10 left-0 w-full">
                <li className="py-3 px-3">
                    <a href="/" className="text-[#09dbcc] flex items-center">Home</a>
                </li>
                <li className="py-3 px-3">
                    <a href="/explore" className="text-[#09dbcc] flex items-center">Explore</a>
                </li>
                <li className="py-3 px-3">
                    <a href="/search" className="text-[#09dbcc] flex items-center">Search</a>
                </li>
                <li className="py-3 px-3">
                    <a href="/blog" className="text-[#09dbcc] flex items-center">Blog</a>
                </li>
                <li className="py-3 px-3">
                    <a href="/bookmarks" className="text-[#09dbcc] flex items-center">Bookmarks</a>
                </li>
            </div>
        </div>
    )
}
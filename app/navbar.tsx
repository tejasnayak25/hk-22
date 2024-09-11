import "material-symbols/index.css";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar({ page = "normal" }){
    let [menuState, setMenuState] = useState(false);
    let router = useRouter();
    let path = "home";
    let pname = usePathname();
    pname = pname.substring(1);

    if(pname !== "") {
        path = pname;
    }

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

        let navMenu = document.getElementById("nav-menu");
        if(navMenu) {
            let pelem = navMenu.querySelector(`#${path}`);
            if(pelem) {
                pelem.classList.replace("text-[#09dbcc]", "text-white");
                let pdiv = pelem.querySelector("div");
                if(pdiv) {
                    pdiv.style.width = "100%";
                }
            }
        }
    }, []);
    return(
        <div className="flex justify-center w-full md:px-10 px-5 relative z-50">
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
                    <li className="py-3 px-3 relative flex justify-center text-[#09dbcc] hover:text-white" id="home">
                        <a href="/" className=" flex items-center text-center w-full">Home</a>
                        <div className="h-0.5 rounded-full absolute bottom-0 bg-white" style={{width: 0}}></div>
                    </li>
                    <li className="py-3 px-3 relative flex justify-center text-[#09dbcc] hover:text-white" id="explore">
                        <a href="/explore" className=" flex items-center text-center w-full">Explore</a>
                        <div className="h-0.5 rounded-full absolute bottom-0 bg-white" style={{width: 0}}></div>
                    </li>
                    <li className="py-3 px-3 relative flex justify-center text-[#09dbcc] hover:text-white" id="search">
                        <a href="/search" className=" flex items-center text-center w-full">Search</a>
                        <div className="h-0.5 rounded-full absolute bottom-0 bg-white" style={{width: 0}}></div>
                    </li>
                    <li className="py-3 px-3 relative flex justify-center text-[#09dbcc] hover:text-white" id="blog">
                        <a href="/blog" className=" flex items-center text-center w-full">Blog</a>
                        <div className="h-0.5 rounded-full absolute bottom-0 bg-white" style={{width: 0}}></div>
                    </li>
                    <li className="py-3 px-3 relative flex justify-center text-[#09dbcc] hover:text-white" id="bookmarks">
                        <a href="/bookmarks" className=" flex items-center text-center w-full">Bookmarks</a>
                        <div className="h-0.5 rounded-full absolute bottom-0 bg-white" style={{width: 0}}></div>
                    </li>
                    <li className="py-3 px-3 relative flex justify-center text-[#09dbcc] hover:text-white" id="about">
                        <a href="/about" className=" flex items-center text-center w-full">About</a>
                        <div className="h-0.5 rounded-full absolute bottom-0 bg-white" style={{width: 0}}></div>
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
                        onClick={()=>{router.push("/account")}}
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
                <li className="py-3 px-3">
                    <a href="/about" className="text-[#09dbcc] flex items-center">About</a>
                </li>
            </div>
        </div>
    )
}
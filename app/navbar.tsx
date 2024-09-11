import "material-symbols/index.css";
import Image from "next/image";

export default function Navbar({ page = "normal" }){
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
                <nav className="">
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
                    <a href="/more" className="text-white flex items-center">
                        <span className="material-symbols-rounded">menu</span>
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
        </div>
    )
}
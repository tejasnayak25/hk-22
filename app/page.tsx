"use client";

import Image from "next/image";
import Loader from "./loader";
import { useEffect, useRef, useState } from "react";
import * as Places from "./places.json";
import Navbar from "./navbar";
import "./style.css";
import { loginRequired } from "./fbase-client";
import { useRouter } from "next/navigation";
import ChatUI from "./chatbot";

export default function Home() {
  let home_image = Places[Math.floor(Math.random() * Places.length)];
  let router = useRouter();
  let userRef = useRef<HTMLImageElement>(null);
  
  let [ loading, setLoading ] = useState(true);

  useEffect(() => {
      loginRequired(router);
      setTimeout(() => {
        setLoading(false);

        var textWrapper = document.querySelector('#loader-title');
        if(textWrapper) {
            textWrapper.innerHTML = textWrapper.textContent?.replace(/\S/g, "<span class='letter'>$&</span>") ?? "";
        }
        textWrapper?.classList.replace("opacity-0", "opacity-70");

        window.anime({
            targets: '#loader-title .letter',
            opacity: [0,1],
            easing: "easeInOutQuad",
            duration: 1000,
            delay: (el:HTMLElement, i:number) => 150 * (i+1)
        });
      }, 2000);
  }, []);
  return (
    <>
      <Loader loading={loading}></Loader>
      <div className=" flex justify-center items-center w-full h-full absolute top-0 z-[49]">
        <div className=" relative w-full h-full">
          <Image
            src={home_image}
            id="bg-image"
            alt="Background Image"
            className="w-full h-full object-cover absolute top-0"
            width={1200}
            height={800}
          />
          <div className=" absolute top-0 w-full h-full from-transparent to-[#142a31] bg-gradient-to-b"></div>
        </div>
        <div className=" absolute top-0 w-full h-full flex flex-col py-10">
            <Navbar user_ref={userRef} page="home"></Navbar>
            <div className=" flex-1 flex flex-col gap-5 justify-center items-center">
              <p id="loader-title" className=" md:text-9xl text-8xl richmond text-white">Sanskriti</p>
              <p className=" md:text-[2.5rem] text-3xl maragsa text-white mb-10">Heritage Gallery</p>
              <a href="/explore" className=' px-28 btn border-0 rounded-full bg-[#00bcae] text-white hover:bg-[#00bcafc9]'>Explore</a>
            </div>
        </div>
      </div>
      <ChatUI></ChatUI>
    </>
  );
}

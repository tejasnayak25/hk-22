"use client";

import { useParams, useRouter } from "next/navigation";
import Loader from "../loader";
import { useEffect, useState } from "react";
import Heritage from "../../../heritage_data.json";
import Image from "next/image";
import "@iconscout/unicons/css/line.css";
// import { initVoice, say } from "./speak";

export default function Place() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState(""); // Array to store story lines
  const router = useRouter();

  const item = Heritage.find(item => item.id === id);

  if (!item) {
    router.push("/explore");
  }

  useEffect(() => {
    const fetchStory = async () => {
        let voice = "";

      const response = await fetch(location.origin + "/api/study", {
        method: "POST",
        body: JSON.stringify({
          prompt: `Tell me about ${item?.name} in a story format`
        })
      });


      if (!response.ok) {
        console.error("Error fetching story:", response.statusText);
        return;
      }

      const data = await response.json();

      if (data.status === 200) {
        const storyLines = data.result.split(".");

        // Efficiently update story state line by line with a loop
        for (let i = 0; i < storyLines.length; i++) {
          setStory(() => {
            // ... your logic to create the new story lines
            return storyLines[i]; // Assuming newStoryLines is an array of strings
          });
        //   if(voice) {
        //     await say(speechSynthesis, voice ,story);
        //   }
          await new Promise(resolve => setTimeout(resolve, voice ? 0 : 4000)); // Wait 1 second
        }
        setStory("The End");
      } else {
        console.error("Error retrieving story:", data.message || "Unknown error");
      }

      setLoading(false);
    };

    if(item) {
        fetchStory();
    }

    setTimeout(() => {
        setLoading(false);
    }, 2000);
  }, []); // Ensure fetch runs only on id change

  return (
    <>
      <div className=" w-full h-full">
        <Loader info={item ? { name: item.name, image: item.image } : { name: "", image: "" }} loading={loading} />
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
            {<p key={0} className=" w-full text-center">{story}</p>}
          </div>
          <div className=" absolute top-0 w-full h-full pt-10 md:px-32 px-5">
            <div className="bg-black rounded-md bg-opacity-50 flex justify-between items-center">
              <button onClick={() => router.back()} className="btn btn-square btn-ghost text-white">
                <i className=" uil uil-angle-left text-4xl"></i>
              </button>
              <p className="leagueSpartan text-white font-semibold text-xl">{item?.name}</p>
              <button className="btn btn-square btn-ghost text-white">
                <i className=" uil uil-volume text-3xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
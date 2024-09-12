"use client";

import { useParams, useRouter } from "next/navigation";
import Loader from "../loader";
import { useEffect, useState } from "react";
import Heritage from "../../../heritage_data.json";
import Image from "next/image";
import "@iconscout/unicons/css/line.css";

export default function Place() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const item = Heritage.find(item => item.id === id);

  if (!item) {
    router.push("/explore");
  }

  useEffect(() => {
    function setSpeech() {
        return new Promise((resolve) => {
            let synth = window.speechSynthesis;
            let voices = synth.getVoices();
            
            if (voices.length !== 0) {
                resolve(voices);
            } else {
                // Listen for the voiceschanged event if voices aren't immediately available
                synth.onvoiceschanged = () => {
                    resolve(synth.getVoices());
                };
            }
        });
    }

    const fetchStory = async () => {
        let voice = false;
        let speech = document.getElementById("speech");

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

        let playBtn = document.getElementById("play-btn");
        let playWin = document.getElementById("playWin");

        // Efficiently update story state line by line with a loop
        window.addEventListener("speaker-ready", async () => {
            if(playBtn) {
                playBtn.removeAttribute("disabled");
            }
        });

        var speak = async (text: string):Promise<null> => {return null;}

        if(playBtn) {
            playBtn.onclick = async () => {
                if(playWin) {
                    playWin.classList.replace("opacity-100", "opacity-0");
                }
                let stopLoop = false;
                for (let i = 0; i < storyLines.length; i++) {
                    if(playWin && playWin.classList.contains("opacity-0")) {
                        playBtn.onclick = () => {
                            speechSynthesis.pause();
                            window.location.reload();
                        };
                    }

                    if(!stopLoop) {
                        await speak(storyLines[i]);   
                  
                        await new Promise(resolve => setTimeout(resolve, voice ? 0 : 4000)); // Wait 1 second
                    } else {
                        break;
                    }
                }
                if(speech) {
                    speech.innerText = "The End";
                }
            }
        }

        let utterance = new SpeechSynthesisUtterance();

        setSpeech().then((voices:any) => {
            voice = true;
            let sel_voice = voices.find((item:SpeechSynthesisVoice) => item.lang === "en-IN");
            let volume_btn = document.getElementById("volume-btn");
            
            if(volume_btn) {
                let vol_icon = volume_btn.querySelector("i");
                
                if(vol_icon) {
                    let lsspeaking = localStorage.getItem("speaking");

                    let speaking = true;

                    if(lsspeaking !== null) {
                        speaking = (lsspeaking === "false") ? false : true;
                    }
                    else speaking = true;

                    if(speaking) {
                        vol_icon.classList.replace("uil-volume-mute", "uil-volume");
                    } else {
                        vol_icon.classList.replace("uil-volume", "uil-volume-mute");
                    }

                    if(vol_icon.classList.contains("uil-volume-mute")) {
                        speaking = false;
                    }

                    volume_btn.onclick = () => {
                        speaking = !speaking;
                        localStorage.setItem("speaking", String(speaking));

                        if(speaking) {
                            vol_icon.classList.replace("uil-volume-mute", "uil-volume");
                        } else {
                            vol_icon.classList.replace("uil-volume", "uil-volume-mute");
                        }
                    }

                    speak = (text:string) : Promise<null> => {
                        return new Promise((resolve) => {
                            utterance.text = text;
                            utterance.voice = sel_voice ?? voices[0];
                    
                            utterance.onend = () => {
                                resolve(null);
                            };
                    
                            if(speaking) {
                                speechSynthesis.speak(utterance);
                                speechSynthesis.resume();
                            } else {
                                setTimeout(() => {
                                    resolve(null);
                                }, 4000);
                            }
                            if(speech) {
                                speech.innerText = text;
                            }
                        });
                    }
                    window.dispatchEvent(new CustomEvent("speaker-ready"));
                }
            }
        });
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
            <p id="speech" className=" w-full text-center"></p>
          </div>
          <div id="playWin" className=" bg-[#142a31] bg-opacity-70 opacity-100 absolute top-0 w-full h-full flex justify-center items-center">
            <button id="play-btn" disabled className="btn btn-ghost text-[#00bcae] disabled:text-[#00bcaf83] btn-circle"><i className=" text-5xl uil uil-play"></i></button>
          </div>
          <div className=" pointer-events-none absolute top-0 w-full h-full pt-10 md:px-32 px-5">
            <div className="pointer-events-auto bg-black rounded-md bg-opacity-50 flex justify-between items-center">
              <button onClick={() => router.back()} className="btn btn-square btn-ghost text-white">
                <i className=" uil uil-angle-left text-4xl"></i>
              </button>
              <p className="leagueSpartan text-white font-semibold text-xl">{item?.name}</p>
              <button id="volume-btn" className="btn btn-square btn-ghost text-white">
                <i className=" uil uil-volume text-3xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
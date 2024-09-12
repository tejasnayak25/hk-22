import Script from "next/script";
import Image from "next/image";

export default function ChatUI() {
    return(
        <>
            <div className="fixed bottom-0 right-0 mb-4 mr-4 z-[49]">
                <button id="open-chat" className=" rounded-md transition duration-300 flex items-center">
                    <Image
                        src={"/chatbot.png"}
                        width={800}
                        height={800}
                        alt="Chatbot"
                        className="w-12 aspect-square object-contain"
                    />
                </button>
            </div>
            <div id="chat-container" className="hidden fixed bottom-[4.5rem] md:right-4 right-0 md:w-96 w-full z-[49]">
                <div className="bg-[#003a35] border-2 border-[#09dbcc] shadow-md rounded-lg max-w-lg w-full">
                    <div className="p-4 bg-[#09dbcc] text-black rounded-t-lg flex justify-between items-center">
                        <p className="text-lg font-semibold">Sanskriti Bot</p>
                        <button id="close-chat" className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="black">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                        <div className="mb-2">
                            <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">Hello, I'm Sanskriti Bot. I will try my best to answer your queries regarding Indian heritage. However, sometimes even I may be wrong, so please proceed with caution!</p>
                        </div>
                    </div>
                    <div className="p-4 border-t border-[#09dbcc] flex">
                        <input id="user-input" type="text" placeholder="Type a message" className="w-full placeholder:text-[#057775] read-only:text-slate-400 input input-bordered rounded-s-md rounded-e-none border-r-0 bg-transparent border-2 border-solid border-[#00bcae] relative z-[8]"/>
                        <button id="send-button" className="bg-[#00bcae] text-white px-4 py-2 rounded-r-md hover:bg-[#00bcafc1] transition duration-300">Send</button>
                    </div>
                </div>
            </div>
            <Script src="/chatbot.js"></Script>
        </>
    );
}
"use client";

import { useParams, useRouter } from "next/navigation";
import Loader from "./loader";
import { useEffect, useState } from "react";
import Heritage from "../../heritage_data.json";
import Image from "next/image";
import "@iconscout/unicons/css/line.css";
import "@iconscout/unicons/css/solid.css";
import "material-symbols/index.css";
import { checkUserBookmark, updateBookmark } from "../../fbase-client";

export default function Place() {
    let { id } = useParams();

    let [ loading, setLoading ] = useState(true);
    let router = useRouter();

    let item = Heritage.find(item => item.id === id);

    if(!item) {
        router.push("/explore");
    }
    useEffect(() => {
        // document.onloadedmetadata = () => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        let shareBtn = document.getElementById("share-btn");
        if(shareBtn) {
            shareBtn.onclick = () => {
                navigator.share({
                    url: location.href,
                    title: item?.name
                });
            }
        }

        if(item) {
            let bookmarked:Promise<boolean> = checkUserBookmark(item.id);

            bookmarked.then(data => {
                let bkbtn = document.getElementById("bookmark");
                if(bkbtn) {
                    let bkicon = bkbtn.querySelector("i");

                    if(bkicon) {
                        if(data) {
                            bkicon.classList.replace("uil", "uis");
                            bkicon.classList.replace("uil-bookmark", "uis-bookmark");
                        } else {
                            bkicon.classList.replace("uis", "uil");
                            bkicon.classList.replace("uis-bookmark", "uil-bookmark");
                        }

                        bkbtn.onclick = () => {
                            if(data) {
                                bkicon.classList.replace("uis", "uil");
                                bkicon.classList.replace("uis-bookmark", "uil-bookmark");
                            } else {
                                bkicon.classList.replace("uil", "uis");
                                bkicon.classList.replace("uil-bookmark", "uis-bookmark");
                            }
                            data = !data;
                            updateBookmark(item.id, data);
                        }
                    }
                }
            })
        }
        // }
    }, []);
    return (
        <>
            <div className=" w-full h-full">
                <Loader info={item ? {name: item.name, image: item.image} : { name: "", image: "" }} loading={loading}></Loader>
                <div className=" absolute top-0 w-full flex flex-col overflow-y-auto">
                    <div className=" w-full h-full max-h-[25rem] relative overflow-hidden">
                        <Image
                            src={item ? item.image : ""}
                            alt="Background"
                            width={1280}
                            height={720}
                            className="w-full h-full object-cover object-top"
                        />
                        <div className=" absolute top-0 w-full h-full from-transparent to-[#142a31] bg-gradient-to-b"></div>
                    </div>
                    <div className=" md:py-10 py-5 md:px-20 px-5 min-h-32 flex flex-wrap gap-8">
                        <div className=" md:flex-1 flex-auto h-full">
                            <div className="mb-8 p-3 px-4 rounded-md bg-[#057775] text-white w-fit">{item?.location}</div>
                            <div className="w-full text-3xl mb-3 font-bold leagueSpartan text-white">{item?.title}</div>
                            <div className=" w-full text-gray-400 mb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore totam aliquam quidem veritatis error sunt a autem dolor omnis porro maxime inventore cumque sapiente dolorem ullam quibusdam, enim voluptate? Voluptates.</div>
                        </div>
                        <div className=" flex flex-col justify-center items-center i-code gap-3 md:w-1/3 w-full h-full px-10">
                            <a href={`https://maps.google.com/maps?q=${item?.latitude},${item?.longitude}`} className=' w-full btn border-0 rounded-md bg-[#00bcae] text-white hover:bg-[#00bcafc9] relative'>
                                <i className="uil uil-map-pin text-2xl absolute left-5"></i><p>View Location</p>
                            </a>
                            <a href={`https://maps.google.com/maps?q=&layer=c&cbll=${item?.latitude},${item?.longitude}`} className=' w-full btn border-0 rounded-md bg-[#00bcae] text-white hover:bg-[#00bcafc9] relative'><i className="uil uil-cube text-2xl absolute left-5"></i><p>View 3D</p></a>
                            <a href={`/places/${item?.id}/learn`} className=' w-full btn border-0 rounded-md bg-[#00bcae] text-white hover:bg-[#00bcafc9] relative'><i className="uil uil-book-open text-2xl absolute left-5"></i><p>Study Heritage</p></a>
                            <a href={`https://en.wikipedia.org/w/rest.php/v1/page/${item?.wikipedia}/html`} className=' w-full btn border-0 rounded-md bg-[#00bcae] text-white hover:bg-[#00bcafc9] relative'><i className=" text-xl absolute left-5">W</i><p>Wikipedia</p></a>
                        </div>
                    </div>
                    <div className=" md:py-10 py-5 md:px-20 px-5">
                        <hr className=" h-0.5 bg-[#057775] border-0 w-full"></hr>
                        <div className=" flex md:flex-row flex-col-reverse gap-4">
                            <div className=" flex-1">
                                <p className=" text-xl my-3 text-white">Reviews</p>
                                <hr className=" h-0.5 bg-[#057775] border-0 w-full"></hr>
                                <div className=" flex flex-col gap-3">
                                <article className=" py-8 border-b-2 border-[#057775]">
                                    <div className="flex items-center mb-4">
                                        <img className="w-10 h-10 me-4 rounded-full" src="/user.svg" alt=""/>
                                        <div className="font-medium text-white">
                                            <p>Jese Leos <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Joined on August 2014</time></p>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <svg className="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-sm font-semibold text-white my-3">Amazing place</h3>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est incidunt eveniet quidem iste laborum rerum officiis, aperiam tempora praesentium cupiditate nisi amet, quia perferendis natus voluptatibus ea, dolore quae ipsum.</p>
                                    <aside>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
                                        <div className="flex items-center mt-3">
                                            <a href="#" className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Helpful</a>
                                            <a href="#" className="ps-4 text-sm font-semibold text-[#057775] hover:underline border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Report abuse</a>
                                        </div>
                                    </aside>
                                </article>
                                <article className=" py-8 border-b-2 border-[#057775]">
                                    <div className="flex items-center mb-4">
                                        <img className="w-10 h-10 me-4 rounded-full" src="/user.svg" alt=""/>
                                        <div className="font-medium text-white">
                                            <p>Jese Leos <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Joined on August 2014</time></p>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <svg className="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-sm font-semibold text-white my-3">Amazing place</h3>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est incidunt eveniet quidem iste laborum rerum officiis, aperiam tempora praesentium cupiditate nisi amet, quia perferendis natus voluptatibus ea, dolore quae ipsum.</p>
                                    <aside>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
                                        <div className="flex items-center mt-3">
                                            <a href="#" className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Helpful</a>
                                            <a href="#" className="ps-4 text-sm text-[#057775] hover:underline font-semibold border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Report abuse</a>
                                        </div>
                                    </aside>
                                </article>
                                </div>
                            </div>
                            <div className="md:w-1/3 w-full border-b-2 border-[#057775]">
                                <p className=" text-xl my-3 text-center text-white w-full">Leave a Review</p>
                                <hr className=" h-0.5 bg-[#057775] border-0 w-full"></hr>
                                <div className="flex items-center justify-center p-8 pb-0 mb-1 space-x-1 rtl:space-x-reverse">
                                    <svg className="w-6 h-6 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    <svg className="w-6 h-6 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    <svg className="w-6 h-6 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    <svg className="w-6 h-6 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    <svg className="w-6 h-6 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                </div>
                                <div className="relative mb-8 flex flex-col z-10 md:px-8 px-4">
                                    <label htmlFor={"review"} className="leading-7 text-xs text-[#00bcae] bg-[#142a31] p-1 pb-0 m-0 ml-3 w-fit relative z-[9]">Review</label>
                                    <textarea id={"review"} name={"review"} placeholder={"Write something..."} className=" placeholder:text-[#057775] -mt-3 textarea textarea-bordered bg-transparent border-2 border-solid border-[#00bcae] relative z-[8] min-h-40"/>
                                </div>
                                <div className=" md:px-8 px-4 mb-8">
                                    <button className=' w-full btn border-0 rounded-full bg-[#00bcae] text-white hover:bg-[#00bcafc9]'>Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" pointer-events-none absolute top-0 w-full h-full pt-10 md:px-32 px-5">
                        <div className="bg-black pointer-events-auto rounded-md bg-opacity-50 flex justify-between items-center">
                            <button onClick={() => { router.back(); }} className="btn btn-square btn-ghost text-white">
                                <i className=" uil uil-angle-left text-4xl"></i>
                            </button>
                            <p className="leagueSpartan text-white font-semibold text-xl text-ellipsis max-h-6 overflow-hidden">{item?.name}</p>
                            <div className="flex gap-2">
                                <button id="bookmark" className="btn btn-square btn-ghost text-white">
                                    <i className={` uis uis-bookmark text-3xl`}></i>
                                </button>
                                <button id="share-btn" className="btn btn-square btn-ghost text-white">
                                    <i className=" uil uil-share text-3xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}
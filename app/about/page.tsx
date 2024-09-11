"use client";

import Loader from "../loader";
import { useEffect, useState } from "react";
import * as Heritage from "../heritage_data.json";
import Navbar from "../navbar";
import "../style.css";
import "@iconscout/unicons/css/line.css";

export default function Explore() {
    let [ loading, setLoading ] = useState(true);

  useEffect(() => {
    // document.onloadedmetadata = () => {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    // }
  }, []);
    return (
        <>
            <Loader loading={loading}></Loader>
            <div className=" flex justify-center items-center w-full h-full absolute top-0 z-[49]">
                <div className=" absolute top-0 w-full h-full flex flex-col py-10">
                    <Navbar></Navbar>
                    <div className=" flex-1 p-10 pt-14 flex flex-col items-center overflow-y-auto">
                      <p className=" font-semibold md:text-5xl text-3xl leagueSpartan text-white mb-3">Sanskriti</p>
                      <p className=" text-gray-400 mb-10">By FeatureX</p>
                      <p className=" md:px-10 px-0 text-gray-400 mb-5">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br></br>
                      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                      </p>
                      <div className=" flex justify-center items-center text-white p-5">
                        <button className=" btn btn-square btn-ghost">
                          <i className="uil uil-instagram text-3xl"></i>
                        </button>
                        <button className=" btn btn-square btn-ghost">
                          <i className="uil uil-twitter text-3xl"></i>
                        </button>
                        <button className=" btn btn-square btn-ghost">
                          <i className="uil uil-youtube text-3xl"></i>
                        </button>
                      </div>
                      <p className=" text-gray-400"><i className=" uil uil-copyright text-lg"></i>2024 - FeatureX</p>
                    </div>
                </div>
            </div>
        </>
    );
}
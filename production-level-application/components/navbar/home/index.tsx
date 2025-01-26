"use client";

import ImageCard from "@/components/global/image-card";
import { useAppDispatch, useAppSelector } from "@/components/wrapper/redux";
import { setIsDarkMode } from "@/state";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const imageData = [
  {
    src: "https://www.itarian.com/assets-new/images/project-management.png",
    aspectRatio: "0.94",
  },
  {
    src: "https://png.pngtree.com/png-vector/20220527/ourmid/pngtree-woman-doing-project-management-png-image_4752006.png",
    aspectRatio: "0.94",
    marginTop: "mt-4",
  },
  /*   {
    src: "https://marketplace.canva.com/EAE2pXyqyx0/1/0/1600w/canva-simple-instagram-frame-template-instagram-post-ObQSn5BL2ZQ.jpg",
    aspectRatio: "1.7",
    marginTop: "mt-4",
  }, */
];

const imageData2 = [
  {
    src: "https://cdni.iconscout.com/illustration/premium/thumb/online-test-illustration-download-in-svg-png-gif-file-formats--exam-education-e-learning-digital-world-pack-seo-web-illustrations-6770271.png?f=webp",
    aspectRatio: "1.7",
  },
  {
    src: "https://static.vecteezy.com/system/resources/previews/022/608/528/non_2x/business-infographic-analysis-marketing-data-analysis-marketing-business-solutions-free-png.png",
    aspectRatio: "0.94",
    marginTop: "mt-4",
  },
  {
    src: "https://cdni.iconscout.com/illustration/premium/thumb/project-planning-illustration-download-in-svg-png-gif-file-formats--management-plan-business-discussion-teamwork-pack-illustrations-6666400.png?f=webp",
    aspectRatio: "0.94",
    marginTop: "mt-4",
  },
];

function HomeNavBar({}: Props) {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <section
      className={`relative h-screen ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
      {isDarkMode && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      )}
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden flex-col w-full max-md:mt-10 max-md:max-w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mt-4">
                  {/*  <div className="h-8 w-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                    li
                  </div> */}
                  <span
                    className={`pl-4 text-xl font-semibold ${
                      isDarkMode ? "text-blue-200" : "text-blue-800"
                    }`}
                  >
                    Project Management
                  </span>
                </div>
                <nav
                  className={`hidden space-x-6 text-sm md:block  ${
                    isDarkMode ? "text-blue-200" : "text-blue-800"
                  }`}
                >
                  <Link href="#features">Features</Link>
                  <Link href="#pricing">Pricing</Link>
                  <Link href="#about">About</Link>
                </nav>
                <div className="flex justify-center items-center gap-x-2">
                  <button
                    onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
                    className={
                      isDarkMode
                        ? `rounded p-2 hover:bg-gray-700`
                        : `rounded p-2 hover:bg-gray-100`
                    }
                  >
                    {isDarkMode ? (
                      <Sun className="h-6 w-6 cursor-pointer text-white" />
                    ) : (
                      <Moon className="h-6 w-6 cursor-pointer text-black" />
                    )}
                  </button>

                  <Link href="/dashboard">
                    <button className="bg-white text-black font-semibold rounded-md px-6 py-4">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
              {/* Rest of the component implementation follows with the extracted components */}
              {/* Features section */}

              <div className="flex overflow-hidden flex-col px-16 mt-28 w-full min-h-[900px] max-md:px-5 max-md:max-w-full">
                <div className="flex flex-wrap flex-1 size-full max-md:max-w-full">
                  <div className="flex flex-col flex-1 shrink justify-center pr-20 basis-0 min-w-[240px] max-md:max-w-full">
                    <div className="flex flex-col w-full text-white max-md:max-w-full">
                      <h1
                        className={`text-4xl font-bold leading-tight tracking-tighter  sm:text-5xl md:text-6xl lg:text-7xl ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Smart Project Management System for Agile Teams
                      </h1>
                      <p
                        className={`mt-6 text-lg ${
                          isDarkMode ? "text-blue-200" : "text-blue-700"
                        }`}
                      >
                        {`The Smart Project Management System is a comprehensive
                        web-based platform designed to help Agile teams
                        efficiently plan, execute, and monitor projects. The
                        system offers a collaborative workspace where team
                        members can create tasks, assign responsibilities, set
                        deadlines, and track progress using visual tools like
                        Kanban boards and Gantt charts.`}
                      </p>
                    </div>
                    <div className="flex gap-4 items-start self-start mt-8 text-base">
                      <Link href="/dashboard">
                        <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-6 py-4">
                          Get Started
                        </button>
                      </Link>
                      <Link href="/dashboard">
                        <button
                          className={`border-blue-400  hover:bg-blue-900/50 rounded-md px-6 py-4 ${
                            isDarkMode ? "text-white " : "text-gray-700"
                          }`}
                        >
                          Learn More
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex relative flex-1 shrink gap-4 items-start my-auto basis-20 left-44">
                    <img
                      src="https://projectvectors.com.au/_next/image?url=%2Fimages%2Fmanagement.png&w=1080&q=75"
                      alt="img"
                      className="w-[800px]"
                    />
                    {/*                   <div className="flex absolute right-0 bottom-0 z-0 flex-col h-[800px] left-[550px] min-w-[240px] w-[360px]">
                      {imageData.map((image, index) => (
                        <ImageCard
                          key={`right-${index}`}
                          src={image.src}
                          aspectRatio={image.aspectRatio}
                          marginTop={image.marginTop}
                        />
                      ))}
                    </div>
                    <div className="flex absolute bottom-0 left-[100px] z-0 flex-col h-[1000px] right-[337px] w-[370px]">
                      {imageData2.map((image, index) => (
                        <ImageCard
                          key={`left-${index}`}
                          src={image.src}
                          aspectRatio={image.aspectRatio}
                          marginTop={image.marginTop}
                        />
                      ))}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeNavBar;

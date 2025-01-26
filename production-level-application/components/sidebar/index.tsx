"use client";

import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  PlusSquare,
  ShieldAlert,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ModalNewProject from "../modal/modal-new-project";
import { useAppSelector } from "../wrapper/redux";

type Props = {};

function SideBar({}: Props) {
  const dispatch = useDispatch();
  const [showProject, setShowProject] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const [isModalNameProjectOpen, setIsModalNameProjectOpen] = useState(false);

  const { data: projects } = useGetProjectsQuery();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  /*   if (!currentUser) return null;
  const currentUserDetails = currentUser.user; */
  const sideBarClassNames = `fixed flex flex-col h-full justify-between shadow-xl
  transition-all duration-300 ease-in-out z-40 dark:bg-black overflow-y-auto bg-white
  ${
    isSidebarCollapsed
      ? "max-w-0 overflow-hidden opacity-0"
      : "max-w-64 opacity-100"
  }`;

  return (
    <div className={sideBarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/*    */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            LIST
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-500 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-lg font-bold tracking-wide dark:text-gray-200">
              Project Management
            </h3>

            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/dashboard" />
          {projects && projects.length > 0 && (
            <SidebarLink
              icon={Briefcase}
              label="Timeline"
              href="/dashboard/timeline"
            />
          )}

          {/*           <SidebarLink icon={Search} label="Search" href="/dashboard/search" />
          <SidebarLink
            icon={Settings}
            label="Settings"
            href="/dashboard/settings"
          />
          <SidebarLink icon={User} label="Users" href="/dashboard/users" />
          <SidebarLink icon={Users} label="Teams" href="/dashboard/teams" /> */}
        </nav>
        <button
          onClick={() => setShowProject((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span>Projects</span>
          {showProject ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showProject &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/dashboard/projects/${project.id}`}
            />
          ))}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span>Priory</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/dashboard/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/dashboard/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/dashboard/priority/medium"
            />
            <SidebarLink
              icon={AlertOctagon}
              label="Low"
              href="/dashboard/priority/low"
            />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/dashboard/priority/backlog"
            />
          </>
        )}
        <div className="flex justify-center mt-4 gap-x-2">
          <ModalNewProject
            isOpen={isModalNameProjectOpen}
            onClose={() => setIsModalNameProjectOpen(false)}
          />
          <button
            className="flex items-center rounded-sm bg-blue-300 text-black dark:bg-blue-950 px-3 py-2 dark:text-white hover:bg-blue-600 w-full"
            onClick={() => setIsModalNameProjectOpen(true)}
          >
            <PlusSquare className="mr-1 h-5 w-5" /> New Board
          </button>
        </div>
      </div>
      <div className="z-10 mt-32 flex w-full flex-col items-center gap-4 bg-white px-8 py-4 dark:bg-black md:hidden">
        <div className="flex w-full items-center">
          <div className="align-center flex h-9 w-9 justify-center">
            {/*      {!!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                alt={currentUserDetails?.username || "User Profile Picture"}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
            )} */}
            {/*   <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" /> */}
          </div>
          {/*           <span className="mx-3 text-gray-800 dark:text-white">sashen</span>
          <button
            className="self-start rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            // onClick={handleSignOut}
          >
            Sign out
          </button> */}
        </div>
      </div>
    </div>
  );
}

interface SideBarLinksType {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SideBarLinksType) => {
  const pathName = usePathname();
  const isActive =
    pathName === href || (pathName === "/" && href === "/dashboard");
  const screenWidth = window.innerWidth;

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 rounded-sm transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-500" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default SideBar;

// 1.40

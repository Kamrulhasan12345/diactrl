"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Login from "./Login";
import { NavBar } from "./NavBar";

type singleData = {
  gluc: string;
  insul: string;
  exercise: string;
  breakfast: string[];
  lunch: string[];
  dinner: string[];
};

function getData(user_email: string, date: string) {
  let res: any;
  fetch(
    `${
      process.env.NODE_ENV == "development"
        ? "http://localhost:3000"
        : "https://diactrl.xyz"
    }/api/details?user_email=${user_email}&date=${date}`
  )
    .then((d) => d.json())
    .then((d) => (res = d));
  return res;
}

const StatsEditorModal = ({ stateFn }: { stateFn: unknown }) => {
  return (
    <>
      <div className="h-50 md:w-50 md:h-90 w-28 bg-gray-200"></div>
    </>
  );
};

export default function Home() {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const date = new Date().toISOString().substring(0, 10);
  const userData: singleData = getData(session?.user?.email as string, date);
  console.log(userData);
  return (
    <>
      <NavBar user={session?.user} />
      <section>
        {modalOpen ? <StatsEditorModal stateFn={setModalOpen} /> : <></>}
        <div
          className={`h-full flex-col items-center justify-center ${
            modalOpen ? "hidden" : "flex"
          }`}
        >
          <div className="mt-8 text-center">
            <h1 className="text-xl font-medium md:text-2xl">
              Hi! {session?.user?.name}
            </h1>
            <h3 className="mt-4 text-lg">Have a look at today&apos;s stats.</h3>
          </div>
          <div className="mt-8 text-left">
            <h6 className="font-semibold">
              Glucose:{" "}
              <span className="font-normal">{userData?.gluc || "Not set"}</span>
            </h6>
            <h6 className="font-semibold">
              Insulin:{" "}
              <span className="font-normal">
                {userData?.insul || "Not set"}
              </span>
            </h6>
            <h6 className="font-semibold">
              Exercise:{" "}
              <span className="font-normal">
                {userData?.exercise || "Not set"}
              </span>
            </h6>
            <h6 className="font-semibold">
              Breakfast: {userData?.breakfast?.join(", ") || "Not set"}
            </h6>
            <h6 className="font-semibold">
              Lunch: {userData?.lunch?.join(", ") || "Not set"}
            </h6>
            <h6 className="font-semibold">
              Dinner: {userData?.dinner?.join(", ") || "Not set"}
            </h6>
            <button
              onClick={() => setModalOpen(true)}
              className="mr-3 rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0"
            >
              Edit Stats
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

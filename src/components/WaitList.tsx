"use client";
import React, { useEffect, useState, createContext } from "react";
import api from "../services/api";
import Moment from "react-moment";
import RemoveBtn from "./RemoveBtn";

const WaitList = (props: any) => {
  const [usersData, setUsersData] = useState([]);
  const [isContentDelete, setIsContentDelete] = useState(false);
  const [positionValue, setpositionValue] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/waitlist");
        const data = response.data?.users;
        setUsersData(data);
      } catch (error) {
        console.log("data fetching errors");
      }
    };
    fetchData();
  }, [isContentDelete]);

  function ChoosePositionEvent(user: any) {
    props?.setStepNumber(2);
    props?.setClientToAdd(user);
  }

  return (
    <div className="flex justify-center">
      <div className="bg-blue-500 p-4 w-[950px]">
        {usersData.map((user: any, index: number) => (
          <ul
            className="flex items-center bg-gray-200 p-2 mb-4 rounded-md"
            key={index}
          >
            <li className="flex-1">
              <span>
                <Moment format="YYYY-MM-DD">{user.createdAt}</Moment>
              </span>
            </li>
            <li className="flex-1 ml-8">
              <span>{index + 1}</span>
            </li>
            <li className="flex-1">
              <span>{user.firstName}</span>
            </li>
            <li className="flex-1">
              <span>{user.lastName}</span>
            </li>
            <li className="flex-1">
              <span>{user.city}</span>
            </li>
            <li className="flex-1">
              <span>{user.country}</span>
            </li>
            <li className="flex-1">
              <span>{user.status}</span>
            </li>
            {user.status === "active" ? (
              <button
                onClick={() => ChoosePositionEvent(user)}
                className="bg-indigo-500 text-white py-2 px-4 rounded-md"
              >
                Choose position
              </button>
            ) : (
              <RemoveBtn
                id={user._id}
                setIsContentDelete={setIsContentDelete}
              />
            )}
          </ul>
        ))}
        <button
          className="bg-red-500 mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => props.setIsPopupOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WaitList;

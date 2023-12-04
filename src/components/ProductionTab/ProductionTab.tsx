"use client";
import React, { useEffect, useState } from "react";
import api from "../../services/api";

const ProductionTab = () => {
  const [distributorData, setDistributorData] = useState([]);
  useEffect(() => {
    const getTreeData = async () => {
      const result = await api.get("/tree");
      setDistributorData(result.data.Client);
    };
    getTreeData();
  }, []);

  function addReward(data: any) {
    const sortedDistributorData = data?.sort(
      (a: any, b: any) => b.referralOfTheMonth - a.referralOfTheMonth
    );

    const rewardValueArray = [5000, 3000, 2000, 1000, 500];

    // Add rewards to the top 5 distributors (or as many as there are)
    const numberOfDistributors = Math.min(sortedDistributorData.length, 5);
    for (let index = 0; index < numberOfDistributors; index++) {
      sortedDistributorData[index].rewardValue = rewardValueArray[index];
    }

    return sortedDistributorData;
  }

  const modifyList = addReward(distributorData);

  console.log(modifyList, 'modifyListmodifyList');
  

  return (
    <div className="flex justify-center items-center">
      <div className="p-8 bg-gray-100 rounded-lg shadow-md w-[1010px]">
        <h2 className="text-3xl font-bold mb-6 text-center">TOP CLASSEMENTS</h2>
        <div className="grid grid-cols-1 ">
          <div>
            <ul className="flex items-center bg-gray-700 p-4 mb-4 rounded-md shadow-md space-x-8">
              <li className="flex-1 text-center">
                <span className="font-bold text-white">NUMERO</span>
              </li>
              <li className="flex-1 text-center">
                <span className="font-bold text-blue-500">PRENOM</span>
              </li>
              <li className="flex-1 text-center">
                <span className="text-white">VILLE</span>
              </li>
              <li className="flex-1 text-center">
                <span className="text-white">PAY</span>
              </li>

              <li className="flex-1 text-center">
                <span className=" font-bold text-white">
                  NUMBER D&apos;INSCRIPTIONS
                </span>
              </li>
              <li className="flex-1 text-center">
                <span className=" font-bold text-white">PRIME</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 ">
          <div>
            {distributorData?.map((items: any, index: number) => (
              <ul
                className="flex items-center bg-white p-4 mb-4 rounded-md shadow-md space-x-8"
                key={index}
              >
                <li className="flex-1 text-center">
                  <span className="font-bold text-gray-700">
                    {items._id.slice(-6)}
                  </span>
                </li>
                <li className="flex-1 text-center">
                  <span className="font-bold text-blue-500 uppercase">
                    {items.name}
                  </span>
                </li>
                <li className="flex-1 text-center">
                  <span className="text-gray-600 uppercase">
                    {items.city ? items.city : "Mumbai"}
                  </span>
                </li>
                <li className="flex-1 text-center">
                  <span className="text-gray-600 uppercase">
                    {items.country ? items.country : "India"}
                  </span>
                </li>

                <li className="flex-1 text-center">
                  <span className="text-green-500 font-bold">
                    {items.referralOfTheMonth}
                  </span>
                </li>
                <li className="flex-1 text-center">
                  <span className=" font-bold">{items.rewardValue}</span>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionTab;

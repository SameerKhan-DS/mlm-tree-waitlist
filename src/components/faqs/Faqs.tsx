"use client";
import api from "@/services/api";
import React, { useEffect, useState } from "react";

const FaqItem = ({
  title,
  content,
  isOpen,
  toggleIsOpen,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
}) => {
  return (
    <div className="faq-item">
      <button
        onClick={toggleIsOpen}
        className={`flex justify-between items-center w-full p-4 bg-gray-200 hover:bg-gray-300 focus:outline-none ${
          isOpen ? "rounded-t-none" : "rounded"
        }`}
      >
        <span className="text-lg font-semibold">{title}</span>
        <span className={`arrow-icon ${isOpen ? "transform rotate-180" : ""}`}>
          &#9660;
        </span>
      </button>
      {isOpen && (
        <div className="answer p-4 bg-white border border-t-0 rounded-b">
          <p className="text-gray-800">{content}</p>
        </div>
      )}
    </div>
  );
};

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIsOpen = (index: number) => () => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const [FAQsData, setFAQsData] = useState([]);
  useEffect(() => {
    const getTreeData = async () => {
      const result = await api.get("/faqs");
      setFAQsData(result.data.faqs);
    };
    getTreeData();
  }, []);
  return (
    <div className="faqs w-[60%] m-auto mt-12">
      {FAQsData?.map((item: any, index) => (
        <FaqItem
          key={item.title}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          toggleIsOpen={toggleIsOpen(index)}
        />
      ))}
    </div>
  );
};

export default Faqs;

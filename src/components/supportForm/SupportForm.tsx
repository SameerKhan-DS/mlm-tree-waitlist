"use client";
import axios from "axios";
import React, { useState } from "react";

const SupportForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    object: "",
    message: "",
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/ticket", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 400) {
        console.log("error");
      }
      if (response.status === 201) {
        console.log("success");
        setIsFormSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          object: "",
          message: "",
        });
      }
    } catch (error) {
      console.log("Error, try again");
    }
  };

  return (
    <div className="p-4">
      {isFormSubmitted && (
        <>
          <div className="flex justify-center center">
            <span className="bg-green-500 text-white p-2 rounded inline-block mt-4 m-auto w-[25%]">
              Form submitted
            </span>{" "}
            <button onClick={() => setIsFormSubmitted(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <input
            type="text"
            name="firstName"
            className="w-full p-2 border rounded"
            placeholder="Prenom"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="lastName"
            className="w-full p-2 border rounded"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="object"
            className="w-full p-2 border rounded"
            placeholder="Objet"
            value={formData.object}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            id="description"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Message..."
            required
          ></textarea>
        </div>

        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          type="submit"
        >
          ENVOYER
        </button>
      </form>
    </div>
  );
};

export default SupportForm;

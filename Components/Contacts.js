"use client";

import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contacts = () => {
  return (
    <div className="bg-gray-100 py-12 px-4">

      {/*  Page Heading */}
      <div className="max-w-7xl mx-auto text-center">

        <h1 className="text-4xl font-bold text-gray-800">
          Contact Ovilo
        </h1>

        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Have questions about our products or your order? We'd love to hear
          from you. Fill out the form below and our team will get back to you
          as soon as possible.
        </p>

      </div>

      {/*  Contact Sectio */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/*  Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Get In Touch
          </h2>

          {/* Address */}
          <div className="flex items-start gap-4 mb-6">

            <div className="bg-indigo-100 p-3 rounded-full">
              <FaMapMarkerAlt className="text-indigo-600 text-xl" />
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Address
              </h3>

              <p className="text-gray-500">
                Lahore, Pakistan
              </p>
            </div>

          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 mb-6">

            <div className="bg-green-100 p-3 rounded-full">
              <FaPhoneAlt className="text-green-600 text-xl" />
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Phone
              </h3>

              <p className="text-gray-500">
                +92 ......
              </p>
            </div>

          </div>

          {/* Email */}
          <div className="flex items-start gap-4">

            <div className="bg-red-100 p-3 rounded-full">
              <FaEnvelope className="text-red-500 text-xl" />
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Email
              </h3>

              <p className="text-gray-500">
                support@ovilo.com
              </p>
            </div>

          </div>

        </div>

        {/*  Contact Form*/}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Send Message
          </h2>

          <form className="space-y-5">

            {/* Name */}
            <div>

              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* Email */}
            <div>

              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* Subject */}
            <div>

              <label className="block mb-2 font-medium">
                Subject
              </label>

              <input
                type="text"
                placeholder="Enter subject"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* Message */}
            <div>

              <label className="block mb-2 font-medium">
                Message
              </label>

              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Contacts;
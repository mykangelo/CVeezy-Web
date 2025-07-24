import React, { useState } from "react";
import { Link } from "react-router-dom";

const supportData = [
  {
    title: "Billing support",
    description:
      "If you have any questions regarding payment, feel free to contact us:",
    phone: "+44 808 502 0312",
    email: "billing@cveezy.com",
  },
  {
    title: "Customer Help",
    description:
      "If you have any questions regarding our service, feel free to contact us:",
    phone: "+44 808 502 0312",
    email: "help@cveezy.com",
  },
  {
    title: "Our postal address",
    name: "TSFF Holdings Limited",
    address:
      "Office 51, Agias Zonis, 23, Kotsios Court A, Limassol, 3027, Cyprus",
    email: "help@cveezy.com",
  },
];

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message submitted successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white py-4 px-8 shadow-sm flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">CVeezy</div>
        <div className="space-x-4">
          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition"
          >
            Login
          </Link>
          <Link
            to="/choose-template"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create my resume
          </Link>
        </div>
      </header>

      {/* Contact Section */}
      <section className="bg-[#eaf6ff] flex-1 flex flex-col items-center justify-center p-8 gap-6">
        {/* Heading */}
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Contact us</h2>
          <p className="text-gray-600 text-base">
            If you need assistance with our service or have any questions,
            don't hesitate to get in touch with us.
          </p>
        </div>

        {/* Form and Illustration */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-full max-w-6xl mt-6">
          {/* Form */}
          <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-sm text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm text-gray-700 mb-1">
                    Email address*
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white w-full py-3 rounded-md font-semibold hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Illustration */}
          <div className="hidden md:block w-full max-w-md">
            <img
              src="/cntc-img-pen"
              alt="Contact Illustration"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-[#f8fafc] w-full py-10 px-4 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
          {supportData.map((item, i) => (
            <div
              key={i}
              className="border border-dashed border-blue-400 rounded-lg p-6 bg-blue-50 space-y-4"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white text-xl">
                {i === 0 ? "📄" : i === 1 ? "⚙️" : "📨"}
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold">{item.title}</h2>

              {/* Description or Details */}
              {item.description ? (
                <p className="text-sm text-gray-700">{item.description}</p>
              ) : (
                <div className="text-sm text-gray-700 space-y-2">
                  <div>
                    <span className="font-medium">Name</span>
                    <p>{item.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Address</span>
                    <p>{item.address}</p>
                  </div>
                </div>
              )}

              {/* Contact Info */}
              {item.phone && (
                <div>
                  <p className="font-medium">Via phone:</p>
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="phone">📞</span>
                    <span>{item.phone}</span>
                  </div>
                </div>
              )}
              <div>
                <p className="font-medium">Via email:</p>
                <div className="flex items-center gap-2">
                  <span role="img" aria-label="email">✉️</span>
                  <span>{item.email}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                {item.phone && (
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Call us
                  </button>
                )}
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Email us
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

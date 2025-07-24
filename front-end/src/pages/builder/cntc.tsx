import React, { useState, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const Contacts: React.FC = () => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const additionalInfoRef = useRef<HTMLDivElement>(null);

        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Contacts</h2>
            <p className="text-gray-600 mb-4">
              Add your up-to-date contact information so employers and recruiters can easily reach you.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium mb-1">First name</label>
                <input id="first-name" className="w-full p-2 border border-gray-300 rounded-md" placeholder="John" />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium mb-1">Last name</label>
                <input id="last-name" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Doe" />
              </div>
              <div className="col-span-2">
                <label htmlFor="job-title" className="block text-sm font-medium mb-1">Desired job title</label>
                <input id="job-title" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Software Developer" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                <input id="phone" className="w-full p-2 border border-gray-300 rounded-md" placeholder="123-456-789" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input id="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="johndoe@gmail.com" />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowAdditionalInfo((prev) => {
                  const newState = !prev;
                  if (!prev) {
                    setTimeout(() => {
                      additionalInfoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 300);
                  }
                  return newState;
                });
              }}
              className="mt-4 text-blue-600 text-sm font-medium cursor-pointer flex items-center gap-1 transition-all"
            >
              Additional information
              {showAdditionalInfo ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>

            <div
              ref={additionalInfoRef}
              className={`grid grid-cols-2 gap-4 overflow-hidden transition-all duration-500 ease-in-out ${
                showAdditionalInfo ? "max-h-[500px] mt-4" : "max-h-0 mt-0"
              }`}
            >
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
                <input id="country" className="w-full p-2 border border-gray-300 rounded-md" placeholder="USA" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                <input id="city" className="w-full p-2 border border-gray-300 rounded-md" placeholder="New York" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                <input id="address" className="w-full p-2 border border-gray-300 rounded-md" placeholder="123 Street Ave" />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium mb-1">Post Code</label>
                <input id="postcode" className="w-full p-2 border border-gray-300 rounded-md" placeholder="10001" />
              </div>
            </div>
          </>
        );
};

export default Contacts;

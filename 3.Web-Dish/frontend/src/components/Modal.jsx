import React, { useState } from "react";

function Modal() {
  const [reviewType, setReviewType] = useState(""); // State to store the type of review

  // Function to handle submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="bg-[#f7f3cd]  min-h-screen flex flex-col justify-center items-center">
      <h1 class="text-center text-2xl font-bold mb-3">
          Congratulations on creating a delicious dish <br />
          <span class="text-gray-600">Please provide your feedback</span>
      </h1>
      <div className="max-w-md w-full bg-[#00544f] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Feedback</h2>
        <p className="text-white mb-6">
          If you had any issues or you liked our product, please share with us!
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-white font-medium block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded border border-gray-300 bg-gray-50 py-2 px-3 text-base text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Your email address"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-white font-medium block mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full rounded border border-gray-300 bg-gray-50 py-2 px-3 text-base text-gray-700 resize-none focus:outline-none focus:border-blue-500"
              placeholder="Your message"
            ></textarea>
          </div>
          <div className="flex justify-between">
            {/* Buttons for different review types */}
            <button
              className="review-button bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-300"
              onClick={() => setReviewType("good")}
            >
              😊 Good
            </button>
            <button
              className="review-button bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 transition duration-300"
              onClick={() => setReviewType("bad")}
            >
              😞 Bad
            </button>
            <button
              className="review-button bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
              onClick={() => setReviewType("super")}
            >
              🚀 Super
            </button>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">
            Send Feedback
          </button>
        </form>
        <p className="text-sm text-white mt-3">
          We appreciate your feedback! Connect with us on social media for more updates.
        </p>
        {/* Render a message based on the selected review type */}
        {reviewType && (
          <p className={`text-${reviewType === "good" ? "green" : reviewType === "bad" ? "red" : "blue"}-500 mt-3`}>
            Thank you for your {reviewType === "good" ? "positive" : reviewType === "bad" ? "constructive" : "enthusiastic"} feedback!
          </p>
        )}
      </div>
    </div>
  );
}

export default Modal;

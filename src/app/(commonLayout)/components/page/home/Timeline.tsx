import React from "react";

const Timeline = () => {
  const timelineData = [
    {
      year: "2021",
      title: "High School",
      description: " Bagerhat Govt High school",
    },

    {
      year: "2023",
      title: "Collage",
      description: "Bagerhat Govet Mohila collage",
    },
    {
      year: "2022",
      title: "University",
      description: "Northerbn Univarsity of business and Technology Khulna",
    },
  ];

  return (
    <div className="flex mt-48   flex-col bdark:bg-[#19191B] w-3/4  mx-auto items-center">
      <h2 className=" text-4xl font-bold text-white my-10">Education</h2>
      {/* <button className="relative button z-1 px-6 py-3 bg-purple-500 text-white font-bold rounded-lg btn-custom">
        Click Me
      </button> */}

      <div className="relative w-full max-w-6xl mt-6">
        {/* Vertical Line */}
        <div className="absolute border-l-4 border-[#7271EB] shadow-lg h-full left-1/2 -ml-0.5 hidden sm:block"></div>

        <div className="space-y-24">
          {timelineData.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex w-full ${
                idx % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* The dots on the timeline */}
              <div className="absolute w-6 h-6 circle  rounded-full left-1/2 -ml-3"></div>

              <div
                className={`button-timeline position: relative;
  z-index: 1; text-white px-6 py-4  shadow-md w-96 ${
    idx % 2 === 0 ? "mr-auto" : "ml-auto"
  }`}
              >
                <p className="text-white">
                  <b>{item.year}</b>
                </p>
                <p className="text-white">{item.title}</p>
                <p className="text-white">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

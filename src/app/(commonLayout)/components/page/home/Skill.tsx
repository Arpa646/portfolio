import React from "react";
import { useGetAllSkillQuery } from "@/GlobalRedux/api/api"; // Adjust the path to your API slice

// Button component to display each skill icon
const PartnerButton = ({ imgSrc }: { imgSrc: string }) => (
  <div className=" ">
    <img
      src={imgSrc}
      alt="Skill Icon"
      className="w-11 sm:w-24 lg:w-32 h-auto"
    />
  </div>
);

const Skill = () => {
  // Fetch all skills using useGetAllSkillQuery
  const { data: skills, isLoading } = useGetAllSkillQuery(undefined);

  if (isLoading) return <p>Loading...</p>;


  return (
    <div className="pt-20 h-auto bg-black dark:bg-[#19191B]">
      <div className="text-white py-12 px-4 md:px-8">
        {/* Testimonial Section */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
          {/* Circular Text with Icon */}
          <div className="relative w-full md:w-1/2 h-24 flex items-center justify-center">
            <div className="absolute w-full h-full flex justify-center items-center">
              <div>
                <h1 className="m-4 text-2xl sm:text-3xl">Skill</h1>
                <img
                  className="w-20 sm:w-32 lg:w-40"
                  src="https://hubfolio.themescamp.com/inner-pages/wp-content/uploads/sites/10/2024/08/vector_quote.svg"
                  alt="Quote Icon"
                />
              </div>
            </div>
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-center max-w-2xl text-lg font-medium">
            <p className="text-1xl sm:text-3xl lg:text-4xl font-bold text-start">
            In the ever-evolving landscape of web development, finding a partner who can seamlessly blend creativity with technical expertise is crucial. As a dedicated web developer, I specialize in creating engaging, user-friendly websites and applications that not only meet but exceed client expectations.
            </p>
          </blockquote>
        </div>
      </div>

      {/* Skills (Partner Logos) */}
      <div className="flex justify-center mt-12 lg:mt-32">
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {skills?.map((skill: { _id: string; iconUrl: string }) => (
            <PartnerButton key={skill._id} imgSrc={skill.iconUrl} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skill;













// {/* <div className="pt-20 h-auto bg-black dark:bg-[#19191B]">
// <div className="text-white py-12 px-4 md:px-8">
//   {/* Testimonial Section */}
//   <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
//     {/* Circular Text with Icon */}
//     <div className="relative w-full md:w-1/2 h-24 flex items-center justify-center">
//       <div className="absolute w-full h-full flex justify-center items-center">
//         <div>
//           <h1 className="m-4 text-2xl sm:text-3xl">Skill</h1>
//           <img
//             className="w-20 sm:w-32 lg:w-40"
//             src="https://hubfolio.themescamp.com/inner-pages/wp-content/uploads/sites/10/2024/08/vector_quote.svg"
//             alt="Quote Icon"
//           />
//         </div>
//       </div>
//     </div>

//     {/* Testimonial Text */}
//     <blockquote className="text-center max-w-2xl text-lg font-medium">
//       <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-start">
//  Hubfolio studios ability to create a high-quality UI stands
//         out. It&s something we placed a premium on. A studio with
//         passionate, professional, fun, and full creativity.
//         Recommend!
//       </p>
//     </blockquote>
//   </div>
// </div>

// {/* Skills (Partner Logos) */}
// <div className="flex justify-center mt-12 lg:mt-32">
//   <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
//     {skills?.map((skill: { _id: string; iconUrl: string }) => (
//       <PartnerButton key={skill._id} imgSrc={skill.iconUrl} />
//     ))}
//   </div>
// </div>
// </div> */}
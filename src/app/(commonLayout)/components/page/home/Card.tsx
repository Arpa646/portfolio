


function Card() {
  // const services = [
  //   {
  //     icon: `${Icon}`,
  //     title: "Web Design",
  //     description:
  //       "From concept to launch, we create stunning user-centric websites.",
  //   },
  //   {
  //     icon: `${Icon}`,
  //     title: "UI/UX Design",
  //     description: "We focus on visual appeal and seamless user experience.",
  //   },
  //   {
  //     icon: `${Icon}`,
  //     title: "Responsive Design",
  //     description: "Designs that work beautifully across all screen sizes.",
  //   },
  // ];

  return (
    <h1>hi</h1>
    // <div className="mt-48 lg:max-w-[1024px] w-full mx-auto px-4 lg:px-0">
    //   <div
    //     style={{ width: "354px" }}
    //     className="mt-4 font-raleway ms-4 lg:ms-11 text-3xl dark:text-white lg:text-[50.33px] font-bold leading-[56.33px] lg:text-start text-center"
    //   >
    //     <h1>What We Do</h1>
    //   </div>

    //   <div className="mt-10 p-14">
    //     <div className=" flex text-center gap-6">
    //       {services.map((service, index) => (
    //         <div
    //           key={index}
    //           style={{
    //             borderRadius: "12px",
    //             padding: "16px",
    //           }}
    //         >
    //           <div>
    //             <div className=" space-y-3 ">
    //               <div>
    //                 <img
    //                   src={service.icon}
    //                   alt={service.title}
    //                   className=" mx-auto"
    //                 />
    //               </div>
    //               <h3 className="text-1xl dark:text-[#F5F5F5] font-semibold">
    //                 {service.title}
    //               </h3>
    //               <p className="text-[#898A71] dark:text-[#F5F5F5] mt-2 ">
    //                 {service.description}
    //               </p>
    //             </div>

    //             {/* Hide the image on small screens, display on larger screens */}
    //             {service.image && (
    //               <img
    //                 // Hidden on small, visible on large screens
    //                 className={`pt-8 hidden lg:block w-full lg:w-auto 
                    
    //                  ${index === 4 ? "pt-3" : ""}  // Adding pt-8 for index 3
    //                   ${index === 3 ? "pt-11" : ""}  // Adding pt-7 for index 5
    //                 `}
    //                 src={service.image}
    //                 alt={service.title}
    //               />
    //             )}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
}

export default Card;

import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./slider.css";
import { useGetAllProjectQuery } from "@/GlobalRedux/api/api";
import  Link  from "next/link";
const Slider = () => {
  const { data: projects, isLoading, error } = useGetAllProjectQuery(undefined);
  const [items, setItems] = useState([]);
  console.log(items);
  // Set items with projects data once it's available
  useEffect(() => {
    if (projects) {
      setItems(projects);
    }
  }, [projects]);

  // Move first item to the end of the list (next)
  const handleNext = () => {
    setItems((prevItems) => [...prevItems.slice(1), prevItems[0]]);
  };

  // Move last item to the beginning of the list (prev)
  const handlePrev = () => {
    setItems((prevItems) => [
      prevItems[prevItems.length - 1],
      ...prevItems.slice(0, -1),
    ]);
  };

  // Loading and error handling
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  return (
    <div className="container">
      <div className="slide">
        {items.map((item, index) => {
          console.log(item); // Logs each item to the console

          return (
            <div
              key={index}
              className="item w-[0px] md:w-[0px] lg:w-[200px]  "
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="content glass-effect">
                <div className="name mb-7 text-black">{item?.title}</div>
                <Link href={item.link}
                  className="bg-black  px-7 py-4 rounded-lg "
                 
                > 
                  See More
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="button">
        <button className="prev" onClick={handlePrev}>
          <FaArrowLeft />
        </button>
        <button className="next" onClick={handleNext}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Slider;

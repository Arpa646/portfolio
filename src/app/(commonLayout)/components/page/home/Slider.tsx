import { useGetAllProjectQuery } from "@/GlobalRedux/api/api"; // Adjust the import based on your API setup
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./styles.css";

type SliderProps = {
  darkMode: boolean; // Define darkMode as a boolean
};

interface Blog {
  link: string;
  image: string;
}

const Slider: React.FC<SliderProps> = () => {
  // Fetch blog data using useGetAllBlogQuery
  const { data: projects, isLoading, error } = useGetAllProjectQuery(undefined);
  console.log(projects);
  if (isLoading) {
    return <div>Loading...</div>; // Optionally, a loading spinner can be used here
  }

  if (error) {
    return <div>Error loading projects</div>; // Handle the error
  }

  return (
    <div className="space-y-7 pt-1 mt-8">
      <div className="mt-24 font-raleway lg:ms-11 ms-0 dark:text-white text-[50.33px] font-bold leading-[56.33px] text-center">
        <h1>Check our Work</h1>
      </div>

      <p className="lg:w-[449px] mx-auto text-center text-[#8987A1] dark:text-white">
        Take a look at some of our recent projects to see how we&apos;ve helped
        businesses like yours succeed online.
      </p>

      <div className="h-[500px]">
        <Swiper
          slidesPerView={2} // 2 for large screens, 1 for small
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          initialSlide={0}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 1, // 1 slide per view for small screens
            },
            1024: {
              slidesPerView: 2, // 2 slides per view for larger screens
            },
          }}
        >
          {projects?.map((blog: Blog, index: number) => (
            <SwiperSlide
              key={index}
              className="p-4 bg-[#e0dbdb79] dark:bg-[#3837377b]"
            >
              <a href={blog.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={blog.image} // Ensure the path starts with a "/"
                  alt={`Blog ${index + 1}`}
                  className="w-full h-auto"
                  width={600} // Manual width
                  height={400} // Manual height
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;

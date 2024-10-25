"use client";
import { useState, useEffect, useRef } from "react";
import { RecipeCard } from "./RecipeCard"; // Assuming RecipeCard is already created
import { PulseLoader } from "react-spinners";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useGetAllRecipeQuery } from "@/GlobalRedux/api/api"; // Your custom API hook
import { FaChevronDown } from "react-icons/fa"; // Import the dropdown icon


const RecipieFeed = () => {

  interface ObjectId {
    _id: string;
  }
  
  interface Comment {
    userId: ObjectId;
    comment: string;
    _id: ObjectId;
  }
  
  interface User {
    _id: string;
    name: string;
  }
  interface Rating {
    userId: ObjectId;
    rating: number;
    _id: ObjectId;
  }
  
  interface Recipe {
    _id: ObjectId;
    title: string;
    time: string;
    image: string;
    recipe: string;
    user: User;
    isDeleted: boolean;
    isPublished: boolean;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    rating: number;
    ratings: Rating[];
    dislikedBy: string[];
    likedBy: string[];
  }
  

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const { data, isLoading } = useGetAllRecipeQuery({ page: currentPage },{pollingInterval: 1000 });

  const [sortOption, setSortOption] = useState("time_asc");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setSearchTrigger] = useState("");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false); // To toggle time dropdown
  const [likesDropdownOpen, setLikesDropdownOpen] = useState(false); // To toggle likes dropdown

  useEffect(() => {
    if (data) {
      setRecipes((prev) => [...prev, ...data.data]);
      setTotalRecipes((prev) => prev + data.data.length);
    }
  }, [data]);

  useEffect(() => {
    const lastRecipeElement = document.getElementById("last-recipe");

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        if (totalRecipes >= data?.totalCount) {
          setCurrentPage(1);
          setRecipes([]);
        } else {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    };

    if (lastRecipeElement) {
      observer.current = new IntersectionObserver(observerCallback);
      observer.current.observe(lastRecipeElement);
    }

    return () => {
      if (observer.current && lastRecipeElement) {
        observer.current.unobserve(lastRecipeElement);
      }
    };
  }, [totalRecipes, data]);

  // Trigger search when searchTrigger updates
  const filteredRecipes = recipes.filter((recipe: Recipe) => {
    const inTimeRange =
      Number(recipe.time) >= priceRange[0] &&
      Number(recipe.time) <= priceRange[1];
  
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()); // Use searchQuery directly
  
    const matchesRating =
      selectedRatings.length === 0 || selectedRatings.includes(recipe.rating);
  
    return matchesSearch && inTimeRange && matchesRating;
  });
  

  const sortedRecipes = filteredRecipes.sort((a: Recipe, b: Recipe) => {
    switch (sortOption) {
      // Time-based sorting
      case "time_asc":
        return Number(a.time) - Number(b.time); // Sort by time (Low to High)
      case "time_desc":
        return Number(b.time) - Number(a.time); // Sort by time (High to Low)

      // Likes-based sorting
      case "likes_asc":
        return a.likedBy.length - b.likedBy.length; // Sort by likes (Low to High)
      case "likes_desc":
        return b.likedBy.length - a.likedBy.length; // Sort by likes (High to Low)

      default:
        return 0;
    }
  });

  if (isLoading && currentPage === 1) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <PulseLoader color="#A18549" size={15} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <div className="header flex items-center justify-between mb-4 w-full gap-3">
        <input
          type="text"
          placeholder="Search Within these results..."
          className="border border-gray p-[11px] w-full rounded-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update the query on input change
        />
        <button
          className="h-12 px-10 bg-[#6CA12B] text-white"
          onClick={() => setSearchTrigger(searchQuery)} // Set searchTrigger when clicking the button
        >
          Search
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/12 mb-6 md:mb-0">
          <h1 className="mt-6 mb-4">Time Range</h1>
          <Slider
            range
            min={0}
            max={1000}
            value={priceRange}
            onChange={(value) => {
              if (typeof value !== "number") {
                setPriceRange(value);
              }
            }}
            className="mb-4"
          />
          <div className="flex justify-between">
            <span>{priceRange[0]} min</span>
            <span>{priceRange[1]} min</span>
          </div>

          <h1 className="mt-6 mb-4">Rating</h1>
          <div className="px-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="flex mt-2 items-center space-x-2">
                <input
                  type="checkbox"
                  value={star}
                  onChange={(e) =>
                    setSelectedRatings((prev) =>
                      e.target.checked
                        ? [...prev, star]
                        : prev.filter((rating) => rating !== star)
                    )
                  }
                />
                <span>{star} Star</span>
              </label>
            ))}
          </div>
        </div>

        <div className="md:w-9/12">
          <div className="flex justify-end gap-4 mb-6">
            {/* Dropdown for sorting by time */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700"
              >
                Sort by Time <FaChevronDown className="ml-2" />
              </button>
              {timeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={() => {
                        setSortOption("time_asc");
                        setTimeDropdownOpen(false); // Close dropdown after selection
                      }}
                    >
                      Low to High
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={() => {
                        setSortOption("time_desc");
                        setTimeDropdownOpen(false); // Close dropdown after selection
                      }}
                    >
                      High to Low
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown for sorting by likes */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setLikesDropdownOpen(!likesDropdownOpen)}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700"
              >
                Sort by Likes <FaChevronDown className="ml-2" />
              </button>
              {likesDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={() => {
                        setSortOption("likes_asc");
                        setLikesDropdownOpen(false); // Close dropdown after selection
                      }}
                    >
                      Low to High
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={() => {
                        setSortOption("likes_desc");
                        setLikesDropdownOpen(false); // Close dropdown after selection
                      }}
                    >
                      High to Low
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="my-5 p-3">
            {sortedRecipes && sortedRecipes.length > 0 ? (
              <div className="grid md:grid-cols-1 sm:grid-cols-2 gap-10 mx-auto my-5">
                {sortedRecipes.map((Recipe: Recipe) => (
                  <RecipeCard key={String(Recipe._id)} Recipe={Recipe} />
                ))}
                <div id="last-recipe" />
              </div>
            ) : (
              <div className="flex justify-center">No Recipes Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipieFeed;

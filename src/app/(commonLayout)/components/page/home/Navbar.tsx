// import React from "react";
// import { NavLink as RouterNavLink } from "react-router-dom";
// import { FaBars, FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons
// import Logo3 from "./Logo3.png";
// import Logo4 from "./Logo4.png";

// interface NavbarProps {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
// }

// interface NavLinkProps {
//   to: string;
//   children: React.ReactNode;
//   className?: string;
//   style?: React.CSSProperties; // Add style prop for inline styles
//   end?: boolean;
// }

// interface MobileNavLinkProps {
//   to: string; // Define the 'to' prop type, probably a string representing the URL path
//   end?: boolean; // Optional 'end' prop, can be a boolean
//   children: React.ReactNode; // 'children' prop is of type ReactNode (what's inside the link)
//   className?: string;
// }
// const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <nav style={{ color: "black" }} className="pt-5 ">
//       <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
//         <div className="relative flex items-center justify-between h-16">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             <button
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//               aria-controls="mobile-menu"
//               aria-expanded="false"
//               onClick={toggleMenu}
//             >
//               <span className="sr-only">Open main menu</span>
//               <FaBars className="h-6 w-6 text-slate-500" />
//             </button>
//           </div>

//           <div className="w-full flex items-center justify-between">
//             <h3 className="mt-1 ms-10 text-[30px] font-bold">
//               <img
//                 src={darkMode ? Logo3 : Logo4}
//                 alt="Logo"
//                 className="w-[112px] sm:w-[150px] lg:w-[112px]"
//               />
//             </h3>

//             <div
//               style={{
//                 backgroundColor: darkMode
//                   ? "rgba(19, 19, 19, 0.5)"
//                   : "rgba(255, 255, 255, 0.6)",
//                 border: darkMode
//                   ? "1px solid rgba(128, 128, 128, 0.55)"
//                   : "1px solid rgba(255, 255, 255, 1)",
//               }}
//               className="hidden  md:block lg:block   border shadow-lg rounded-lg sm:ml-6"
//             >
//               <div className="flex lg:space-x-4  ">
//                 <NavLink
//                   className="font-raleway text-black dark:text-gray-300"
//                   to="/"
//                   end
//                 >
//                   <b>Home</b>
//                 </NavLink>

//                 <NavLink
//                   className="font-raleway text-gray-500 dark:text-gray-300"
//                   to="/about"
//                 >
//                   About
//                 </NavLink>

//                 <NavLink
//                   className="font-raleway text-gray-500 dark:text-gray-300"
//                   to="/how-it-works"
//                 >
//                   How it Works
//                 </NavLink>

//                 <NavLink
//                   className="font-raleway text-gray-500  dark:text-gray-300"
//                   to="/services"
//                 >
//                   Services
//                 </NavLink>
//               </div>
//             </div>

//             <div className="hidden sm:flex items-center space-x-4">
//               <button
//                 onClick={toggleDarkMode}
//                 className="p-2 bg-black dark:bg-gray-700 text-white dark:text-white rounded-md flex items-center justify-center"
//               >
//                 {darkMode ? <FaSun size={18} /> : <FaMoon size={20} />}
//               </button>

//               {/* <span className="text-gray-500  "> Sign Up</span> */}
//               <NavLink to="/signup">
//                 <span className="bg-[#4E47FF] text-white     lg:py-2 lg:px-4  px-2  py-3 text-sm  rounded-lg transition-all">
//                   Sign Up
//                 </span>
//               </NavLink>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="dark:bg-[rgba(77, 71, 71, 0.81)] bg-[rgba(137, 135, 161, 1)] relative z-50 shadow-md">
//         <div
//           className={`${
//             isOpen ? "block" : "hidden"
//           } sm:hidden bg-[rgba(137, 135, 161, 1)] dark:bg-[rgba(0, 0, 0, 0.7)] border-white shadow-lg rounded-lg z-50`}
//           id="mobile-menu"
//         >
//           <div className="px-4 py-4 space-y-2">
//             <NavLink
//               to="/"
//               end
//               className="block dark:text-white text-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
//               style={{ color: darkMode ? "white" : "black" }} // Use an object for inline styles
//             >
//               Home
//             </NavLink>

//             <NavLink
//               style={{ color: darkMode ? "white" : "black" }}
//               className="block dark:text-white text-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
//               to="/facilities"
//             >
//               Facilities
//             </NavLink>
//             <NavLink
//               className="block dark:text-white text-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
//               to="/dashboard"
//             >
//               Dashboard
//             </NavLink>
//             <NavLink
//               className="block dark:text-white text-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
//               to="/contact"
//             >
//               Contact
//             </NavLink>
//             <NavLink
//               className="block dark:text-white text-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
//               to="/aboutus"
//             >
//               About Us
//             </NavLink>
//             <NavLink
//               className="block dark:text-white text-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
//               to="/login"
//             >
//               Login
//             </NavLink>
//           </div>
//         </div>

//         {/* Dark Mode Toggle Button */}
//         <div className="absolute -top-12 right-4">
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 bg-gradient-to-r sm:hidden lg:hidden md:hidden from-gray-800 to-gray-900 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-110 flex items-center justify-center"
//           >
//             {darkMode ? <FaSun size={18} /> : <FaMoon size={20} />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// const NavLink: React.FC<NavLinkProps> = ({
//   to,
//   end,
//   children,
//   className = "",
// }) => (
//   <RouterNavLink
//     to={to}
//     end={end}
//     className={({ isActive }) =>
//       `block px-3 py-2 rounded-md text-sm font-medium ${
//         isActive ? "text-black" : "text-gray-700"
//       } ${className}`
//     }
//   >
//     {children}
//   </RouterNavLink>
// );

// const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, children }) => (
//   <NavLink to={to} className="mobile-nav-link">
//     {children}
//   </NavLink>
// );

// // Usage
// <MobileNavLink to="/home">Home</MobileNavLink>;

// export default Navbar;

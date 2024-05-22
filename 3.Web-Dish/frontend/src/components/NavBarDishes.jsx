import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function NavBarDishes() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoriesToShow, setCategoriesToShow] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoriesPerPage, setCategoriesPerPage] = useState(3);

  const categories = [
    { path: "/All-Indian-Dishes", label: "Indian Dishes" },
    { path: "/Luxury-Dishes", label: "Luxury Dishes" },
    { path: "/Quick-Dishes", label: "Quick Dishes" },
    { path: "/Healthy-Dishes", label: "Healthy Dishes" },
    { path: "/Create-Menu", label: "Create Menu" },
    { path: "/chef-intelligence", label: "Chef Intelligence", external: true },
  ];

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let perPage;
      if (screenWidth <= 640) perPage = 3;
      else if (screenWidth <= 768) perPage = 4;
      else if (screenWidth <= 1024) perPage = 5;
      else perPage = 6;
      setCategoriesPerPage(perPage);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const startIndex = currentIndex * categoriesPerPage;
    const endIndex = startIndex + categoriesPerPage;
    setCategoriesToShow(categories.slice(startIndex, endIndex));
  }, [currentIndex, categoriesPerPage]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleNextPage = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevPage = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div className="bg-[#f7f3cd] z-10  overshadow-md w-full fixed flex justify-center items-center sm:justify-between sm:items-center h-16">
      <div className="flex items-center justify-between w-full max-w-6xl">
        <div>
          {currentIndex !== 0 && categories.length > categoriesPerPage && (
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 focus:outline-none shadow-md transition duration-300 ease-in-out" onClick={handlePrevPage}>
              <BsChevronLeft className="w-8 h-8 text-white" />
            </button>
          )}
        </div>
        <div className="flex space-x-4">
          {categoriesToShow.map(({ path, label, external }) => (
            <Link
              key={path}
              to={path}
              className={`px-3 py-2 text-center leading-4 bg-[#f7f3cd] shadow-lg transition-colors duration-300 ${
                selectedCategory === label ? " text-gray-900  " : "  hover:bg-emerald-700 hover:text-white"
              } md:text-lg rounded-full`}
              onClick={() => handleCategoryClick(label)}
              target={external ? "_blank" : ""}
              style={{ textDecoration: 'none' }}
            >
              {label}
            </Link>
          ))}
        </div>
        <div>
          {currentIndex !== Math.ceil(categories.length / categoriesPerPage) - 1 && categories.length > categoriesPerPage && (
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 focus:outline-none shadow-md transition duration-300 ease-in-out"
              onClick={handleNextPage}
            >
              <BsChevronRight className="w-6 h-full text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
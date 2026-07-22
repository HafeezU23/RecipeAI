import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faClockRotateLeft,
  faForwardFast,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router";

const Landing = () => {
  return (
    <div className="relative min-h-screen w-full bg-[url('/LandingPage.png')] bg-center bg-no-repeat bg-cover">
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <header className="flex justify-between items-center p-4 md:p-6 lg:p-8">
          <div className="flex justify-start items-center">
            <img src="/logo.png" alt="logo" className="h-10 md:h-14 lg:h-20" />
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white ml-2">
              Recipe
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#7abd59]">
              AI
            </p>
          </div>
          <div className="flex justify-end items-center gap-2 md:gap-4">
            <NavLink
              to="/login"
              className="text-sm md:text-lg font-bold text-white border-2 border-[#7abd59] bg-transparent hover:text-[#7abd59] transition-all hover:bg-white hover:border-white px-3 py-1.5 md:px-6 md:py-2 rounded-lg"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="text-sm md:text-lg font-bold text-white bg-[#7abd59] border-2 border-[#7abd59] hover:text-[#7abd59] hover:bg-white transition-all hover:border-white px-3 py-1.5 md:px-6 md:py-2 rounded-lg"
            >
              Signup
            </NavLink>
          </div>
        </header>
        <main className="grow flex flex-col justify-center px-6 md:px-12 lg:px-20 py-10">
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              AI-POWERED
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white flex flex-col sm:flex-row sm:mt-2 leading-tight">
              RECIPE
              <span className="sm:ps-3 text-[#7abd59]">GENERATOR</span>
            </h1>

            <div className="flex flex-col justify-start items-start mt-6 md:mt-10">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white">
                Just enter the ingredients you have,
              </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white">
                and let AI create delicious recipes for you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-start items-center mt-8 md:mt-10 gap-4 w-full sm:w-auto">
              <a
                href="#"
                className="w-full sm:w-auto text-center text-lg md:text-xl lg:text-2xl font-medium text-white bg-[#7abd59] border-2 border-[#7abd59] hover:text-[#7abd59] hover:bg-white transition-all hover:border-white px-6 md:px-8 py-3 rounded-lg"
              >
                Get Started
              </a>
              <a
                href="#"
                className="w-full sm:w-auto text-center text-lg md:text-xl lg:text-2xl font-medium text-white border-2 border-transparent hover:text-[#7abd59] transition-all px-6 md:px-8 py-3 rounded-lg"
              >
                How it works?
              </a>
            </div>
          </div>
        </main>

        {/* Footer - Converts from 1 col (mobile) to 2 cols (tablet) to 3 cols (desktop) */}
        <footer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-black/60 p-6 md:p-8 rounded-t-xl lg:rounded-none">
          {/* Feature 1 */}
          <div className="flex flex-row justify-start lg:justify-center items-center">
            <FontAwesomeIcon
              icon={faBrain}
              className="text-3xl md:text-4xl lg:text-5xl text-[#7abd59] me-4"
            />
            <div className="flex flex-col justify-start items-start">
              <div className="flex">
                <p className="text-lg md:text-xl lg:text-2xl font-medium text-white">
                  Smart
                </p>
                <p className="text-lg md:text-xl lg:text-2xl font-medium text-[#7abd59] ps-1 md:ps-2">
                  Recipes
                </p>
              </div>
              <p className="text-sm md:text-base lg:text-xl font-normal text-white/90">
                AI generates creative and delicious recipes.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-row justify-start lg:justify-center items-center">
            <FontAwesomeIcon
              icon={faClockRotateLeft}
              className="text-3xl md:text-4xl lg:text-5xl text-[#7abd59] me-4"
            />
            <div className="flex flex-col justify-start items-start">
              <div className="flex">
                <p className="text-lg md:text-xl lg:text-2xl font-medium text-white">
                  Save &
                </p>
                <p className="text-lg md:text-xl lg:text-2xl font-medium text-[#7abd59] ps-1 md:ps-2">
                  History
                </p>
              </div>
              <p className="text-sm md:text-base lg:text-xl font-normal text-white/90">
                Save your favorite recipes and view history.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-row justify-start lg:justify-center items-center sm:col-span-2 lg:col-span-1">
            <FontAwesomeIcon
              icon={faForwardFast}
              className="text-3xl md:text-4xl lg:text-5xl text-[#7abd59] me-4"
            />
            <div className="flex flex-col justify-start items-start">
              <div className="flex">
                <p className="text-lg md:text-xl lg:text-2xl font-medium text-white">
                  Easy &
                </p>
                <p className="text-lg md:text-xl lg:text-2xl font-medium text-[#7abd59] ps-1 md:ps-2">
                  Fast
                </p>
              </div>
              <p className="text-sm md:text-base lg:text-xl font-normal text-white/90">
                Quick answers with minimal ingredients.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;

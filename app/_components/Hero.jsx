import React from "react";

function Hero() {
  return (
    <section className="bg-gray-50 hero-section max-h-[80vh] relative">
      <div className="absolute inset-0  bg-black bg-opacity-50"></div>
      <div className="z-10 relative mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
            All Your Digital Products
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Is One Click Away{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed capitalize text-white">
           Start Explore State Of the Art Assets now !
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-teal-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-600    sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-600 border border-primary   sm:w-auto"
            
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

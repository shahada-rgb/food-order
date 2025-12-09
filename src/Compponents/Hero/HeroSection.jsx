import React from 'react'
import SearchBar from './SearchBar'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import breakfast from '../../assets/images/Untitled design.png'

function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-400 py-20">

      {/* Headline */}
      <div className="text-center mb-8">
        <h1 className="text-white font-extrabold text-5xl leading-tight drop-shadow-md">
          Order Food Online,
        </h1>
        <h1 className="text-white font-extrabold text-5xl leading-tight drop-shadow-md">
          Freshly Made For You 🍽️
        </h1>
      </div>

      {/* SearchBar */}
      <div className="w-full flex justify-center mb-14">
        <SearchBar />
      </div>

      {/* Food promo card */}
      <div className="max-w-4xl bg-white rounded-2xl p-8 mx-auto shadow-2xl flex items-center justify-between">

        {/* Left text section */}
        <div className="flex flex-col gap-3">
          <h2 className="text-gray-800 font-extrabold text-4xl drop-shadow-sm">
            FOOD DELIVERY
          </h2>
          <p className="text-gray-500 font-medium text-xl tracking-wide">
            FROM TOP RESTAURANTS NEAR YOU
          </p>

          <Link to="/Menu">
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition px-6 py-3 text-white rounded-xl text-lg font-semibold shadow-md">
              Explore Menu <FaArrowRight />
            </button>
          </Link>
        </div>

        {/* Right image */}
        <div>
          <img
            src={breakfast}
            alt="breakfast"
            className="w-64 object-contain animate-bounce-slow"
          />
        </div>
      </div>

    </div>
  )
}

export default HeroSection

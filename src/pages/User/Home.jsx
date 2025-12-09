import React from 'react'
import HeroSection from '../../Compponents/Hero/HeroSection'
import CategoryList from '../../Compponents/user/CategoryList'
import PopularFoodsList from '../../Compponents/user/PopularFoodList'
import RestaurantCard from '../../Compponents/user/RestaurentCard'
import restaurants from '../../data/foodData'
import WhyChooseCard from '../../Compponents/user/WhyChooseCard'
import { whyChooseUs } from '../../data/whychoose'
import Footer from '../../Compponents/Footer'

function Home() {
  return (
    <div className="bg-amber-50 overflow-hidden">
      {/* HERO SECTION */}
      <HeroSection />

      {/* CATEGORY SECTION */}
      {/* <section className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Categories</h2>
        <p className="text-gray-500 mb-4">Find food by your favourite category</p>
        <CategoryList />
      </section> */}
      

      {/* POPULAR FOODS */}
      <section className="max-w-6xl mx-auto mt-14 px-4">
        🔥
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Popular Foods</h2>
        <p className="text-gray-500 mb-6">Most ordered dishes this week</p>
        <PopularFoodsList />
      </section>

      {/* TOP RESTAURANTS */}
      <section className="bg-white mt-16 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold px-4 text-gray-800">Top Restaurants</h2>
          <p className="text-gray-500 px-4 mb-8">Best restaurants delivering near you</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 px-4">
            {restaurants.map((res) => (
              <RestaurantCard key={res.id} {...res} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto mt-14 px-4 pb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Why Choose Us</h2>
        <p className="text-gray-500 mb-8">We make ordering food fast, easy & reliable</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {whyChooseUs.map((item, i) => (
            <WhyChooseCard key={i} icon={item.icon} title={item.title} desc={item.desc} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default Home

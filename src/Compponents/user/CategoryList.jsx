import React from 'react'
import CategoryCard from './CategoryCard'
import { category } from '../../data/Catogory'

function CategoryList({ onCategoryClick }) {
  return (
    <div className="flex gap-10 overflow-x-auto py-6 px-6 scrollbar-hide justify-center">
      {category.map(cat => (
        
        <CategoryCard
          key={cat.name}
          name={cat.name}
          image={cat.image}
          onClick={() => onCategoryClick(cat.name)}
        />
       
      ))}
    </div>
  )
}

export default CategoryList

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const Explore = () => {
  const [searchValue]  = useState();

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-slate-300">
          <img src="../assets/icons/search.svg" alt="Search" width={25} height={25} />
          <Input placeholder="Search" type="text" className="explore-search" value={searchValue}/>
        </div>
      </div>
    </div>
  )
}

export default Explore
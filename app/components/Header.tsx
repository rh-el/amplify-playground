import React from 'react'

export const Header = () => {
  return (
    <nav className="p-4 flex justify-between items-center px-24 absolute w-full">
        <div id='home' className="flex gap-12">
          <a href="#home" className="">home</a>
          <a href="#sample" className="">sample selection</a>
          <a href="#playground" className="">playground</a>
        </div>
        <button className="border border-primary rounded-full px-4 py-1">about</button>
      </nav>
  )
}

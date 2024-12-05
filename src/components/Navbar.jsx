import React from 'react'

function Navbar() {
  return (
   <nav className='bg-slate-800 text-white flex justify-around px-4 py-2'>
    <div className="logo font-bold text-xl">
      <span className='text-green-700'>&lt;</span>
      Pass
      <span className='text-green-700'>keeper&gt;</span>
      </div>
    <ul>
        <li className='flex gap-5'>
            <a className=' hover:font-bold' href="">Home</a>
            <a className=' hover:font-bold' href="">About</a>
            <a className=' hover:font-bold' href="">Contact</a>
        </li>
    </ul>
   </nav>
  )
}

export default Navbar
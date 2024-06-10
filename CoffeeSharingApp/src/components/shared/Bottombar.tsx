import { bottombarLinks, sidebarLinks } from '@/constants/sidebarLinks';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function Bottombar() {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {
        bottombarLinks.map((link) => {
          const isActive = pathname == link.route;

          return (
            <Link
              to={link.route}
              key={link.label}
              className={`${isActive && 'bg-neutral-500/80 rounded-[10px]' } flex-center flex-col gap-1 p-2 transition`}>
              <img
                src={link.imgURL}
                alt={link.label}
                className={` h-8 w-8 ${isActive && 'invert-white'}`}
              />
              <p className="tiny-medium text-dark-5">{link.label}</p>
            </Link>
          )
        })
      }
    </section>
  )
}

export default Bottombar
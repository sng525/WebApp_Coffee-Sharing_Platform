import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants/sidebarLinks';
import { INavLink } from '@/types';
import { Button } from '../ui/button';

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar"  style={{ backgroundColor: '#A0937D' }}>
      <div className="flex flex-col gap-11">
        <Link to="/" className='flex gap-3 items-center justify-center'>
          <img
            src="/assets/images/coffee-icon.svg"
            alt="logo"
            width={80}
            height={80}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center justify-center">
          <img
            src={user.imageUrl || 'assets/images/profile-default.png'}
            alt="profile"
            className="h-14 w-14 rounded-full "
          />
          <div className="flex flex-col">
            <p className="body-bold">
              {user.name}
            </p>
            <p className="italic small-regular text-light3">
              @{user.username}
            </p>
          </div>
        </Link>

      <ul className="flex flex-col gap-2">
        {
          sidebarLinks.map((link: INavLink) => {
            const isActive = pathname == link.route;

            return (
              <li key={link.label} className={`leftsidebar-link ${
                isActive && 'bg-[#BB8760]'
              }`}>
                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                  <img 
                    src={link.imgURL}
                    alt={link.label}
                    className={` h-10 w-10 group-hover:invert-white ${isActive && 'invert-white'}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })
        }
      </ul>
      </div>
      
      <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
            <img src="../assets/icons/logout.svg" alt="logout" width={50} height={50} />
            <p className='small-medium lg:base-medium'>Logout</p>
          </Button>

    </nav>
  )
}

export default LeftSidebar
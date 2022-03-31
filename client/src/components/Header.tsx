import '../index.css';
import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import RightButtons from './HeaderComps/RigthButtons';
import { observer } from 'mobx-react-lite';
import UserPageLink from './HeaderComps/UserPageLink';
import { storeAnnotation } from 'mobx/dist/internal';
import { Context } from '../index';

function Header(){
    const {store} = useContext(Context)
  
    return(
        <>
            <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-cyan-500 to-sky-500 p-4 drop-shadow-lg">
              <div className="flex items-center flex-shrink-10 text-white mr-6">
                <span className="font-bold text-xl tracking-tight">Music WEB</span>
              </div>
              <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                  <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
              </div>
              <div className="w-full block flex-grow lg:flex lg:items-center lg:w-10">
                <div className="text-sm lg:flex-grow">
                  <Link to="/main" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Головна
                  </Link>
                  <Link to="/af" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Афіша
                  </Link>
                  <Link to="/events" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Події
                  </Link>
                  <Link to={"/user-events/" + store.user.id} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Мої події
                  </Link>
                  <UserPageLink/>
                </div>
              </div>
              <div>
                <RightButtons/>
              </div> 
            </nav>
        </>
    )
}

export default observer(Header)
import Tokenly from "@/components/other/svgs/Tokenly"
import NavbarText from "@/components/other/texts/NavbarText";
import AuthButton from "@/components/auth/AuthButton";
import React from "react";
import {IoHome, IoSearch} from "react-icons/io5";
import {FaInbox, FaPlus} from "react-icons/fa6";

const Navbar = () => {
  return (
      <nav>
        <div>
          <Tokenly />
          <div>
            <NavbarText title={'Feed'} icon={<IoHome className={'navbarIcon'} size={24} color={'#fbfbfb'} />} />
            <NavbarText title={'Explorer'} icon={<IoSearch className={'navbarIcon'} size={24} color={'#fbfbfb'} />} />
            <NavbarText title={'Create'} icon={<FaPlus className={'navbarIcon'} size={24} color={'#fbfbfb'} />} />
            <NavbarText title={'Notification'} icon={<FaInbox className={'navbarIcon'} size={24} color={'#fbfbfb'} />} />
          </div>
          <div>

          </div>
        </div>
      </nav>
  )
}

export default Navbar;

'use client';

import styles from "@/styles/scss/common/Navbar.module.scss";
import Tokenly from "@/components/other/svgs/Tokenly"
import NavbarText from "@/components/other/texts/NavbarText";
import React from "react";
import {IoChatbubbleEllipses, IoHome, IoSearch} from "react-icons/io5";
import {FaInbox, FaPlus} from "react-icons/fa6";
import Image from "next/image";
import ProfileDropdownStore from "@/stores/profileDropdownStore";
import ProfileDropdown from "@/components/other/dropdowns/ProfileDropdown";
import Backdrop from "@/components/other/filters/Backdrop";

const selectData = [
  { title: 'Feed', icon: <IoHome className={'navbarIcon'} size={24} color={'#fbfbfb'} /> },
  { title: 'Explorer', icon: <IoSearch className={'navbarIcon'} size={24} color={'#fbfbfb'} />},
  { title: 'Message', icon: <IoChatbubbleEllipses className={`navbarIcon`} size={24} color={'#fbfbfb'} />},
  { title: 'Create', icon: <FaPlus className={'navbarIcon'} size={24} color={'#fbfbfb'} />},
  { title: 'Notification', icon: <FaInbox className={'navbarIcon'} size={22} color={'#fbfbfb'} />},
]

const Navbar = () => {
  const { isOpen, toggle } = ProfileDropdownStore();

  return (
      <nav className={styles.navBar}>
        <div className={styles.navBarWrap}>
          <div className={styles.tokenlyLogo}>
            <Tokenly />
          </div>
          <div className={styles.navBarSelect}>
            {selectData.map((item, index) => (
                  <NavbarText key={index} title={item.title} icon={item.icon} index={index} />
            ))}
          </div>
          <>
            <Image src={'https://api.dicebear.com/7.x/identicon/svg?seed=0x64A6bE6cA52574F5f9E659B2cD762f1A4bf5a85b'}
                   alt={"profile-image"}
                   className={styles.navBarProfile}
                   width={50}
                   height={50}
                   onClick={toggle}
            />
            {isOpen && (
                <Backdrop isOpen={isOpen} toggle={toggle}>
                  <ProfileDropdown />
                </Backdrop>
            )}
          </>
        </div>
      </nav>
  )
}

export default Navbar;

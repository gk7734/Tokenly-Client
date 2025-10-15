import styles from '@/styles/scss/other/dropdowns/ProfileDropdown.module.scss';
import {Languages, LogOut, Settings, UserRoundPen} from "lucide-react";

const data = [
  { title: 'profile', icon: <UserRoundPen size={24} color={"white"} /> },
  { title: 'settings', icon: <Settings size={24} color={"white"} /> },
  { title: 'language', icon: <Languages size={24} color={"white"} /> },
  { title: 'logout', icon: <LogOut size={24} color={"white"} />},
]

const ProfileDropdown = () => {
  return (
      <div className={styles.profileDropdown} onClick={(e) => e.stopPropagation()}>
        <div className={styles.pdWrap}>
          {data.map((item, index) => {
            return (
                <div key={index} className={styles.textFlexBox} onClick={() => console.log(item.title)}>
                  {item.icon}
                  <h3 className={styles.titleText}>{item.title}</h3>
                </div>
            )
          })}
        </div>
      </div>
  )
}

export default ProfileDropdown;

import styles from "@/styles/scss/main/feed/Feed.module.scss";
import Image from "next/image";
import React from "react";
import FeedActionBar from "@/components/main/feed/FeedActionBar";

const Feed = () => {
  return (
      <div className={styles.feed}>
        <Image src={'https://api.dicebear.com/7.x/identicon/svg?seed=0x64A6bE6cA52574F5f9E659B2cD762f1A4bf5a85b'}
               alt={"profile-image"}
               className={styles.profileImage}
               width={36}
               height={36}
        />
        <div className={styles.feedFlexBox}>
          <h3 className={styles.profileName}>John Doe</h3>
          <div className={styles.feedWrap}>
            <img src={"https://photographylife.com/wp-content/uploads/2014/06/Nikon-D810-Image-Sample-6.jpg"} alt={"feed-image"} className={styles.feedImage} />
            <h2 className={styles.feedDescription}>저희팀은 AI의 시대에서 인간찬가를 외치며

              사람의 협업을 돕는 관리 툴을 만들고 있습니다. <br/><br/>
              저는 Aline.team이라는 개발 프로젝트 관리 툴을 만들고 있고, <br/>
              BCTO라는 프로토타입인 BCTO를 먼저 Product Hunt에 올려봤어요. <br/>
              3년의 노력 끝에 만족스러운 프로그램을 내놓았는데 반응이 무척 기대되네요.<br/><br/>
              더 많은 사람들에게 도달할 수 있도록 <br/>
              혹시 시간이 되신다면 프로덕트 헌트에서 <br/>
              저희 BCTO에 댓글이나 upvote 눌러주실 수 있나요?
            </h2>
            <FeedActionBar />
          </div>
        </div>
      </div>
  )
}

export default Feed;

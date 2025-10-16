import styles from "@/styles/scss/main/feed/FeedActionBar.module.scss"
import {Heart, MessageSquare, Share2} from "lucide-react";
import {useState} from "react";

const FeedActionBar = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
      <div className={styles.feedActionBar}>
        <Heart
          size={25.5}
          color={isLiked ? "#ff4d4d" : "white"}
          fill={isLiked ? "#ff4d4d" : "none"}
          className={styles.actionHeart}
          onClick={() => setIsLiked(!isLiked)}
        />
        <MessageSquare size={24} color={"white"} />
        <Share2 size={24} color={"white"} />
      </div>
  )
}

export default FeedActionBar;

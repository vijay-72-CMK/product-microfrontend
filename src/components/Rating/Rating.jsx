import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap"; // Import for Tooltip
import styles from "./rating.module.css";

const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className={`star ${styles.star} me-1`} />);
    }
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className={`star ${styles.star} half-star`} />
      );
    }
    return stars;
  };

  const renderTooltip = (props) => (
    <Tooltip id="rating-tooltip" {...props}>
      Average Rating: {rating}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="left" overlay={renderTooltip}>
      <div className={`${styles["rating-container"]} d-inline-block`}>
        {renderStars()}
      </div>
    </OverlayTrigger>
  );
};

export default Rating;

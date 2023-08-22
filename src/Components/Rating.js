import { useState } from "react";
const ratingContainer = {
  display: "flex",
  alignItems: "center"
};
const stars = {
  display: "flex",
  gap: "5px"
};
function Rating({
  color,
  size,
  maxLength = 5,
  messageArray = [],
  setParentRating
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function onMouseOver(val) {
    if (val < 0 || val > maxLength) return;
    setTempRating(val);
  }

  function onMouseLeave() {
    setTempRating(0);
  }
  function updateRating(val) {
    if (val < 0 || val > maxLength) return;
    setRating(val);
    setParentRating(val);
  }
  return (
    <div style={ratingContainer}>
      <div style={stars}>
        {Array.from({ length: maxLength }, (e, i) => (
          <Stars
            key={i}
            idx={i + 1}
            color={color}
            size={size}
            updateRating={updateRating}
            rating={rating}
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
            tempRating={tempRating}
          />
        ))}
      </div>
      <p style={{ paddingLeft: "10px", fontSize: "1.5rem" }}>
        {tempRating
          ? tempRating > 0 && messageArray.length >= tempRating
            ? messageArray[tempRating - 1]
            : tempRating
          : rating > 0 && messageArray.length >= rating
          ? messageArray[rating - 1]
          : rating}
      </p>
    </div>
  );
}

function Stars({
  color = "yellow",
  size = 48,
  idx,
  updateRating,
  rating,
  onMouseLeave,
  onMouseOver,
  tempRating
}) {
  const style = {
    color,
    height: `${size}px`,
    width: `${size}px`
  };
  const isFilled = tempRating ? tempRating >= idx : rating >= idx;
  return (
    <span
      style={style}
      onClick={() => updateRating(idx)}
      onMouseOver={() => {
        onMouseOver(idx);
      }}
      onMouseLeave={onMouseLeave}
    >
      {isFilled ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

export default Rating;

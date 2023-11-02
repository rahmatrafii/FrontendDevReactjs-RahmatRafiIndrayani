export const GenerateRateing = (rating, w = 20, h = 20) => {
  const stars = [];
  for (let j = 1; j <= Math.floor(rating); j++) {
    stars.push(
      <img
        key={`star-${j}`}
        src={`/icon/star.svg`}
        width={w}
        height={h}
        alt="star"
      />
    );
  }

  if (String(rating).includes(".")) {
    stars.push(
      <img
        key={`half-star`}
        src={`/icon/half-star.svg`}
        width={w}
        height={h}
        alt="star"
      />
    );
  }

  if (Math.ceil(rating) > 0) {
    for (let i = 1; i <= 5 - Math.ceil(rating); i++) {
      stars.push(
        <img
          key={`empety-star-${i}`}
          src={`/icon/empty-star.svg`}
          width={20}
          height={20}
          alt="star"
        />
      );
    }
  }
  return stars;
};

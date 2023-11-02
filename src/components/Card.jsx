import React from "react";
import { GenerateRateing } from "../services/generateRating";
import { Link } from "react-router-dom";
const Card = ({ item }) => {
  return (
    <div className="shadow-md relative rounded-md animate-slideup">
      <div className="w-full h-[200px] ">
        <img
          src={item?.photo?.images.original.url}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-2 ">
        <h3 className="text-xl mb-3">
          {item.name.length > 22 ? `${item.name.slice(0, 22)}...` : item.name}
        </h3>
        <div className="flex gap-5 mb-3">
          {GenerateRateing(Number(item.rating))}
        </div>
        <div className="w-full flex justify-between mb-7">
          <div className="text-sm flex gap-x-1">
            <p>{item.cuisine[0].name}</p> •{" "}
            <p className="">{item.price_level}</p>
          </div>
          <div className="flex items-center text-sm">
            {item.is_closed ? (
              <>
                <div className="w-3 h-3 rounded-full bg-red-600 mr-1" /> CLOSED
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-green-600 mr-1" /> OPEN
                NOW
              </>
            )}
          </div>
        </div>
      </div>
      <Link
        to={`/restaurant/${item.location_id}`}
        className="w-full flex items-center justify-center rounded-md bg-blue-800  py-3 text-white "
      >
        LEARN MORE
      </Link>
    </div>
  );
};

export default Card;

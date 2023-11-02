import React, { useEffect } from "react";
import Card from "./Card";
import { useState } from "react";
import Loading from "./Loading";
const Content = ({ data, setLimit, limit, priceRange, isOpen, isLoadMore }) => {
  const [dataNow, setDataNow] = useState();

  useEffect(() => {
    if (priceRange) {
      let newData = [];
      data?.map((item) => {
        const price = item?.price_level;
        const res = price?.split(" - ");
        if (res?.includes(priceRange)) {
          newData.push(item);
        }
      });
      setDataNow(newData);
    } else {
      setDataNow(data);
    }
  }, [][priceRange]);
  useEffect(() => {
    if (isOpen) {
      const dataIsOpen = dataNow?.filter((item) => !item.is_closed);
      setDataNow(dataIsOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    setDataNow(data);
  }, [limit]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 overflow-hidden gap-7">
        {dataNow?.map(
          (item) =>
            item.name && item.photo && <Card item={item} key={item.name} />
        )}
      </div>

      {!isLoadMore ? (
        <div
          className={`${
            dataNow?.length == 0 || !dataNow ? "hidden" : "flex"
          }  w-full py-5  justify-center`}
        >
          <button
            className="py-2 px-7 rounded bg-blue-700 text-white shadow-md"
            onClick={() => setLimit((prev) => prev + 10)}
          >
            Load More
          </button>
        </div>
      ) : (
        <Loading />
      )}

      {dataNow?.length == 0 || !dataNow ? (
        <div className="w-full py-10 text-center">
          <h1 className="text-2xl font-semibold">Restaurant not found.</h1>
        </div>
      ) : null}
    </div>
  );
};

export default Content;

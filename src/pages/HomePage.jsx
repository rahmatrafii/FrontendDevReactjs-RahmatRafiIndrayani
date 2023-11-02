import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import { getAllRestaurants } from "../services";
import Loading from "../components/Loading";
import CustomFilter from "../components/CustomFilter";
import { categoryList, priceList } from "../constant";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState(categoryList[0]);
  const [priceRange, setPriceRange] = useState(priceList[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const getAll = async () => {
    try {
      const data = await getAllRestaurants(category.key, limit);
      setData(data?.data);
      setLoading(false);
      setIsLoadMore(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsLoadMore(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setData([]);
    getAll();
  }, [category]);

  useEffect(() => {
    setIsLoadMore(true);
    getAll();
  }, [limit]);

  return (
    <main className="w-full ">
      <div className="px-5 py-3 ">
        <div className="mb-6 text-center">
          <h1 className="text-3xl lg:text-5xl  font-extrabold text-sky-400 mb-4">
            Restaurants
          </h1>
          <p className="text-sm text-slate-600 mb-5 max-w-md mx-auto">
            Selamat datang di tempat terbaik untuk menjelajahi cita rasa!
            Temukan pengalaman kuliner terbaik di setiap sudut kota dengan kami.
            Selamat menemukan restoran impian Anda!
          </p>
        </div>

        <div className="flex-wrap gap-2 flex items-center  gap-x-4 mb-10">
          <div>
            <h4 className="text-2xl font-semibold">Filter : </h4>
          </div>
          <div className="whitespace-nowrap bg-white py-2 px-3 text-left shadow-md sm:text-sm border">
            <input
              type="checkbox"
              id="opennow"
              name="opennow"
              className="rounded-full mr-1 cursor-pointer"
              checked={isOpen}
              onChange={() => setIsOpen((prev) => !prev)}
            />
            <label htmlFor="opennow" className="cursor-pointer">
              Open Now
            </label>
          </div>
          <CustomFilter
            options={categoryList}
            selected={category}
            setSelected={setCategory}
          />
          <CustomFilter
            options={priceList}
            selected={priceRange}
            setSelected={setPriceRange}
          />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <Content
            data={data}
            setLimit={setLimit}
            priceRange={priceRange.key}
            isOpen={isOpen}
            isLoadMore={isLoadMore}
            limit={limit}
          />
        )}
      </div>
    </main>
  );
};

export default HomePage;

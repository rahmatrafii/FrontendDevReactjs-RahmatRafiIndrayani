import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantDetails } from "../services";
import { GenerateRateing } from "../services/generateRating";
import { FaLocationDot } from "react-icons/fa6";
import Comments from "../components/Comment";
import Loading from "./../components/Loading";

const RestaurantDetailsPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getDetail = async () => {
    setLoading(true);
    try {
      const res = await getRestaurantDetails(id);
      setData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <section>
      <div className="relative h-[200px]">
        <img
          src={data?.photo?.images.original.url}
          alt={data?.name}
          className="w-screen absolute left-0 top-0 h-[200px] object-cover brightness-50 z-0"
        />
      </div>

      <div className="px-8 w-full">
        <div className="relative pb-14 top-[-150px] lg:top-0  ">
          <div className="w-[80%] lg:w-[440px] xl:w-[500px] border-[4px] border-white  rounded-md  mx-auto relative  lg:absolute  lg:top-[-150px] lg:translate-x-0 lg:right-5">
            <img
              src={data?.photo?.images.original.url}
              alt={data?.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className=" pt-7 lg:p-5 w-full lg:w-1/2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-7">
              {data?.name}
            </h1>
            <div className="flex flex-col lg:flex-row gap-2 text-sm md:text-base">
              <p className=" mb-5 py-1 px-2 bg-slate-200 rounded-sm w-max h-max whitespace-nowrap">
                {data?.price || data?.price_level}
              </p>

              <span className="hidden lg:flex">• </span>

              <div className="mb-5 flex items-center gap-2 flex-wrap">
                {data?.cuisine?.map((item) => (
                  <p
                    key={item.key}
                    className="py-1 px-2 bg-slate-200 rounded-sm w-max"
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-center text-lg gap-x-3 mb-5">
              <FaLocationDot />
              {data?.location_string}
            </div>
            <div className="text-lg flex gap-x-3 mb-5">
              <div className="flex gap-2">
                <p className="flex gap-1">
                  {" "}
                  {GenerateRateing(Number(data?.rating))}
                </p>
                <p>{data?.rating}</p>
              </div>{" "}
              <p>({data?.num_reviews} reviews)</p>
            </div>
            <p className="max-w-xl text-base text-slate-600">
              {data?.description}
            </p>
          </div>
        </div>
        <div>
          <Comments id={id} />
        </div>
      </div>
    </section>
  );
};

export default RestaurantDetailsPage;

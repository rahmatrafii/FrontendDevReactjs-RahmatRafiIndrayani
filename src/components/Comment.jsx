import React, { useEffect, useState } from "react";
import { GenerateRateing } from "../services/generateRating";
import { formatDate } from "../services/formatDate";
import Loading from "./Loading";
import { getAllComments } from "../services";

const Comment = ({ data }) => {
  return (
    <div className="py-5">
      <div className="flex items-start mb-3">
        <img
          src={data.user.avatar?.large?.url || data.user.avatar?.small?.url}
          alt=""
          className="h-[70px] w-[70px] rounded-full object-cover mr-3"
        />
        <div>
          <h3 className="text-lg font-semibold mb-1">
            {data.user.name || "people"}
          </h3>
          <p className="text-slate-600">{formatDate(data.published_date)}</p>
        </div>
      </div>
      <div className="max-w-4xl ">
        <div className="flex gap-x-1 mb-3">
          <p className="flex gap-x-1">{GenerateRateing(Number(data.rating))}</p>{" "}
          <p>({data.rating})</p>
        </div>
        <p className="text-slate-600">{data.text}</p>
      </div>
    </div>
  );
};

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getComments() {
    setLoading(true);
    const resComment = await getAllComments(id);
    setComments(resComment);
    setLoading(false);
  }
  useEffect(() => {
    getComments();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="py-5 mb-7">
        <h3 className="text-2xl font-bold ">All Rewiews :</h3>
      </div>
      {comments?.map((comment) => (
        <Comment data={comment} />
      ))}
    </div>
  );
};

export default Comments;

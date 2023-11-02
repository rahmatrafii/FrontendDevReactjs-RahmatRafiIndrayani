import axios from "axios";
const baseUrl = "https://travel-advisor.p.rapidapi.com/restaurants";

const options = {
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};

export const getAllRestaurants = async (category, limit = 20) => {
  const url = category
    ? `${baseUrl}/list?location_id=297704&combined_food=${category}&currency=USD&limit=${limit}&open_now=false&lang=en_US`
    : `${baseUrl}/list?location_id=297704&currency=USD&limit=${limit}&open_now=false&lang=en_US`;

  try {
    const { data } = await axios.get(url, options);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantDetails = async (location_id) => {
  const url = `${baseUrl}/get-details?location_id=${location_id}&currency=USD&lang=en_US`;
  try {
    const { data } = await axios.get(url, options);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllComments = async (location_id) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("location_id", location_id);
  encodedParams.set("language", "en_US");
  encodedParams.set("currency", "USD");

  const options = {
    method: "POST",
    url: "https://worldwide-restaurants.p.rapidapi.com/reviews",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    return response?.data.results.data;
  } catch (error) {
    console.error(error);
  }
};

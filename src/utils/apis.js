import axios from "axios";

export const loginRequest = async (body) => {
  try {
    let res = await axios.post(
      "https://api.stockcase.io/stockcase/api/v1/userLogin",
      {
        ...body
      }
    );
    return {
      status: "success",
      data: res.data
    };
  } catch (e) {
    return {
      status: "error",
      data: e.response.data
    };
  }
};
export const signUpRequest = async (body) => {
  try {
    let res = await axios.post(
      "https://api.stockcase.io/stockcase/api/v1/userSignUp",
      {
        ...body
      }
    );
    return {
      status: "success",
      data: res.data
    };
  } catch (e) {
    return {
      status: "error",
      data: e.response.data
    };
  }
};
export const getStockData = async (query = "") => {
  let res = await axios.post(
    "https://api.stockcase.io/stockcase/api/v1/getStockNews",
    {
      query
    }
  );
  return { status: "success", data: res.data.result };
};

export const searchStocks = async (v) => {
  let res = await axios.post(
    "https://api.stockcase.io/stockcase/api/v1/searchStocks",
    {
      query: v || ""
    }
  );
  return { status: "success", data: res.data.result };
};
export const getStockPrice = async (symbol) => {
  let res = await axios.post(
    "https://api.stockcase.io/stockcase/api/v1/getStockPrice",
    {
      symbol: symbol
    }
  );
  return res.data.result;
};
export const getUserInfo = async () => {
  try {
    let res = await axios.post(
      "https://api.stockcase.io/stockcase/api/v1/getUserInfo"
    );

    return {
      status: "success",
      data: res.data.result[0]
    };
  } catch (e) {
    return {
      status: "error",
      data: e.response.data
    };
  }
};
export const getBuckets = async () => {
  try {
    let res = await axios.post(
      "https://api.stockcase.io/stockcase/api/v1/getBuckets"
    );

    return {
      status: "success",
      data: res.data.bucket
    };
  } catch (e) {
    return {
      status: "error",
      data: e.response.data
    };
  }
};

export const getBucketNews = async (id) => {
  try {
    let res = await axios.post(
      "https://api.stockcase.io/stockcase/api/v1/getBucketNews",
      {
        bucket_id: id
      }
    );
    console.log("fninding bucket news", res);
    return { data: res.data.result, status: "success" };
  } catch (e) {
    return {
      status: "error",
      data: e.response.data
    };
  }
};

export const getBucketGraph = async (id) => {
  try {
    let res = await axios.post(
      "https://api.stockcase.io/stockcase/api/v1/getBucketGraph",
      {
        bucket_id: id
      }
    );
    console.log("fninding bucket graph", res);
    return { data: res.data, status: "success" };
  } catch (e) {
    return {
      status: "error",
      data: e.response.data
    };
  }
};

export const getBucketPrice = async (id) => {
  try {
    let res = await axios.post(
      "https://api.stockcase.io/stockcase/api/v1/getBucketPrice",
      {
        bucket_id: id
      }
    );
    console.log("fninding bucket price", res);
    return { data: res.data.result, status: "success" };
  } catch (e) {
    return {
      status: "error",
      data: e.response.data
    };
  }
};

export const getStockGraph = async (symbol) => {
  try {
    let res = await axios.post(
      "https://api.stockcase.io/stockcase/api/v1/getStockGraph",
      {
        symbol,
        range: "7"
      }
    );
    console.log("fninding stock graph", res);
    return { data: res.data, status: "success" };
  } catch (e) {
    return {
      status: "error",
      data: e.response.data
    };
  }
};

// export default {
//   async loginRequest(body) {
//     console.log("EDHAR PAHUNCHE WITH BODY", body);
//     let res = await axios.post(
//       "https://api.stockcase.io/stockcase/api/v1/userLogin",
//       {
//         ...body
//       }
//     );
//     console.log(res);
//     return res.data;
//   },
//   async getStockData(placeholder) {
//     let res = await axios.post(
//       "https://api.stockcase.io/stockcase/api/v1/getStockNews",
//       {
//         query: placeholder
//       }
//     );
//     return res.data;
//   },
//   async getStockPrice(symbol) {
//     let res = await axios.post(
//       "https://api.stockcase.io/stockcase/api/v1/getStockPrice",
//       {
//         symbol: symbol
//       }
//     );
//     return res.data;
//   },
//   async searchStocks(v) {
//     let res = await axios.post(
//       "https://api.stockcase.io/stockcase/api/v1/searchStocks",
//       {
//         query: v
//       }
//     );
//     return res.data;
//   },
//   async getBucketNews(id) {
//     let res = await axios.post(
//       "https://api.stockcase.io/stockcase/api/v1/getBucketNews",
//       {
//         bucket_id: id
//       }
//     );
//     return res.data;
//   },
//   async getBuckets(id) {
//     let res = await axios.post(
//       "https://api.stockcase.io/stockcase/api/v1/getBuckets",
//       {
//         user_id: id
//       }
//     );
//     return res.data;
//   },
//   async addBucket(stockCase, data, user_id) {
//     let res = await axios.post(
//       "https://api.stockcase.io/stockcase/api/v1/addBucket",
//       {
//         bucket_name: stockCase,
//         data: data,
//         user_id: user_id
//       }
//     );
//     return res.data;
//   },
//   async getEventSingle(eventId) {
//     let res = await axios.get("http://localhost:8000/events/" + eventId);
//     return res.data;
//   }
// };

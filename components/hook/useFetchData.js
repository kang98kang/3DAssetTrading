import { useState, useEffect } from "react";

export const useFetchData = (initialRequestData) => {
  const [data, setData] = useState([]);
  const [requestData, setRequestData] = useState(initialRequestData);

  const fetchData = (data) => {
    fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.data);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류가 발생했습니다: ", error);
      });
  };

  useEffect(() => {
    if (requestData) {
      fetchData(requestData);
    }
  }, [requestData]);

  return { data, setRequestData };
};

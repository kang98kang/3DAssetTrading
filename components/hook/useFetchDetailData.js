import { useState, useEffect } from "react";

export default function useFetchDetailData({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/search/${id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
        }

        const responseData = await response.json();

        if (responseData.modeling) {
          responseData.modeling = responseData.modeling.map(
            (filename) => `/api/minio/${filename.split("/").pop()}`
          );
        }

        setData(responseData);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다: ", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  return data;
}

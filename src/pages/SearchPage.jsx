import { useState } from "react";
import CardLoading from "../components/CardLoading";
import AxiosToastError from "../utils/AxiosToastError";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import { useEffect } from "react";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noData from "../assets/nothing here yet.webp"

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingCardArray = new Array(15).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation()
  const searchText = params?.search?.slice(3)
  console.log(params)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let response = await AxiosReq({
        ...SummaryApi.searchProduct,
        data: {
          search:searchText,
          page : page
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData((prev) => {
            return [...prev, ...responseData.data];
          });
        }

        setTotalPage(responseData.totalPage);
        console.log(responseData);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page,searchText]);


  const handleFetchMore =()=>{
    if(totalPage > page){
      setPage(prev => page + 1)
    }
  }

  return (
    <section className="bg-white  ">
      <div className="container mx-auto  p-4">
        <p className="font-semibold">Search Result : {data.length}</p>
        <InfiniteScroll dataLength={data.length}
        hasMore={true}
        next={handleFetchMore}
        >
          <div className="flex justify-center items-center">
            <div className="grid   grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-5 ">
              {data.map((p, index) => {
                return <CardProduct data={p} key={index} />;
              })}


           
                {/* Loading State */}
              {loading &&
                loadingCardArray.map((_, index) => {
                  return <CardLoading key={index} />;
                })}
            </div>
          </div>
        </InfiniteScroll>

        {
                !data[0] && !loading && (
                  <div className="mt-6 flex flex-col justify-center items-center w-fit mx-auto " >
                    <img src={noData} alt="No Data" 
                    className="w-full h-full max-w-sm max-h-s"
                    />
                    <p className="font-semibold my-2"> No Data found</p>
                  </div>
                                  )
              }
      </div>
    </section>
  );
};

export default SearchPage;

import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/FetchUserDetails";
import { setUserDetails } from "./Store/UserSlice";
import { useDispatch } from "react-redux";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/ProductSlice";
import AxiosReq from "./utils/Axios";
import SummaryApi from "./common/summaryApi";
import GlobalProvider, { useGlobalContext } from "./Provider/GlobalProvider";
import CartMobile from "./components/CartMobile";
function App() {
  const dispatch = useDispatch();

  const location = useLocation()
  console.log("Location" ,location)
  
  const fetchUser = async () => {
    const userData = await fetchUserDetails();

    dispatch(setUserDetails(userData?.data));
    
  };



  dispatch(setLoadingCategory(true));

  const fetchCategory = async () => {
    try {
      const response = await AxiosReq({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
        // setCategoryData(responseData.data);
      }
    } catch (error) {
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  // Fetch Sub Category

  const fetchSubCategory = async () => {
    try {
      const response = await AxiosReq({
        ...SummaryApi.getSubCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
        // setCategoryData(responseData.data);
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
     
  }, []);

  return (
    <>
      <GlobalProvider>
        <Header />
        <main className="min-h-[78vh]">
          <Outlet />
        </main>
        <Footer />
        <Toaster />

        {
          location.pathname !== '/Checkout' && (

          <CartMobile/>
          )
        }
      </GlobalProvider>
    </>
  );
}

export default App;

import { useState } from "react";
import { DisplayPriceInRuppes } from "../utils/DisplayPrice";
import { useGlobalContext } from "../Provider/GlobalProvider";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import AxiosReq from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'
const CheckOutPage = () => {
  const { totalPrice, totalSaved, totalQty , fetchCartItem } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state.addresses.addressList);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const  navigate = useNavigate()
  const cartItems = useSelector(state =>  state.cartItem.cart)
  
  const handleCashOnDelivery = async () => {
    try {
      let response = await AxiosReq({
        ...SummaryApi.cashOnDelivery,
        data: {
          list_item : cartItems ,
          totalAmt : totalSaved,
          addressId : addressList[selectedAddress]?._id,
          subTotalAmt : totalPrice,
        },
      });

      const {data : responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        if(fetchCartItem){
          fetchCartItem()
        }
        navigate('/success',{
          state:{
            text : "Order"
          }
        })

      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-blue-50 p-4 min-h-screen">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6 justify-center">
        {/* Address Section */}
        <div className="w-full lg:w-1/2 bg-white shadow-md overflow-y-auto rounded-lg p-5">
          <h3 className="text-lg font-semibold text-center mb-3">
            Choose Your Address
          </h3>

          {addressList.length > 0 ? (
            <div className="space-y-4">
              {addressList.map((address, index) => (
                <label
                  key={index}
                  htmlFor={`address-${index}`}
                  className={`${
                    address.status === false
                      ? "line-through text-gray-600 block "
                      : "block"
                  }`}
                >
                  <div
                    className={`border rounded-lg p-3 shadow-sm ${
                      selectedAddress === index ? "border-blue-500" : ""
                    }`}
                  >
                    <div className="flex justify-end items-center">
                      <input
                        type="radio"
                        id={`address-${index}`}
                        onChange={(e) =>
                          setSelectedAddress(parseInt(e.target.value, 10))
                        }
                        value={index}
                        name="address"
                        checked={selectedAddress === index}
                      />
                    </div>
                    <p className="font-semibold">{address.address_line}</p>
                    <p>
                      {address.city}, {address.state}, {address.country} -{" "}
                      {address.pincode}
                    </p>
                    <p className="text-gray-600">📞 {address.mobile}</p>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No address added yet.</p>
          )}

          <button
            onClick={() => setOpenAddress(true)}
            className="w-full border-2 border-dashed bg-blue-100 text-blue-600 rounded-lg py-3 mt-4 flex justify-center items-center font-semibold"
          >
            + Add Address
          </button>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-5">
          <h3 className="text-lg font-semibold text-center mb-3">Summary</h3>

          <div className="p-4 space-y-4">
            <h1 className="text-center border-b pb-2 font-semibold">
              Bill Details
            </h1>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg line-through text-gray-400">
                  {DisplayPriceInRuppes(totalSaved)}
                </span>
                <span className="font-bold text-lg text-green-600">
                  {DisplayPriceInRuppes(totalPrice)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Delivery Charge</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Items:</span>
                <span className="font-bold">{totalQty} Items</span>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="w-full flex flex-col gap-3 mt-4">
              <button className="bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
                Online Payment
              </button>
              <button
                onClick={handleCashOnDelivery}
                className="border-2 border-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Cash On Delivery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckOutPage;

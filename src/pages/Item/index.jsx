import axios from "axios";
import { useState } from "react";

const Item = () => {
 const [formData, setFormData] = useState({
  itemName: "",
  quantity: 0,
  unitPrice: 0,
  dateOfSubmission: "",
 });

 const handleInput = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
   ...prevData,
   [name]: value,
  }));
 };

 const handleSubmit = async () => {
  try {
   const response = await axios.post(
    `https://apis-technical-test.conqt.com/Api/Item-Supplier/Save-Items-Suppliers`,
    {
     itemDetails: {
      ...formData,
     },
     supplier: {},
    }
   );
   const data = await response.json();
   console.log("data", data);
  } catch (e) {
   console.log(e);
  }
 };

 return (
  <div className="flex flex-col justify-center items-center">
   <h1 className="font-bold text-2xl">Item Details</h1>
   <div className="p-8 bg-[#EBEEFD] grid grid-cols-2 gap-5 w-full text-sm mt-5 rounded-md">
    <div className="flex flex-col">
     <label htmlFor="itemName" className="font-medium mb-1">
      Item Name
     </label>
     <input
      type="text"
      name="itemName"
      id="itemName"
      placeholder="Enter Item Name"
      className="w-full p-2"
      value={formData?.itemName}
      onChange={handleInput}
     />
    </div>
    <div className="flex flex-col">
     <label htmlFor="quantity" className="font-medium mb-1">
      Quntity
     </label>
     <input
      type="text"
      name="quantity"
      id="quantity"
      className="w-full p-2"
      placeholder="Enter Quntity"
      value={formData.quantity}
      onChange={handleInput}
     />
    </div>
    <div className="flex flex-col">
     <label htmlFor="unitPrice" className="font-medium mb-1">
      Unit Price
     </label>
     <input
      type="text"
      name="unitPrice"
      id="unitPrice"
      placeholder="Enter Unit Price"
      className="w-full p-2"
      value={formData.unitPrice}
      onChange={handleInput}
     />
    </div>
    <div className="flex flex-col">
     <label htmlFor="dateOfSubmission" className="font-medium mb-1">
      Date of Submission
     </label>
     <input
      type="date"
      name="dateOfSubmission"
      id="dateOfSubmission"
      className="w-full p-2"
      placeholder="Enter Date of Submission"
      value={formData.dateOfSubmission}
      onChange={handleInput}
     />
    </div>
   </div>
   <div className="mt-8">
    <button
     type="submit"
     className="bg-[#007AFF] p-[12px h-[48px] w-[240px] rounded-[8px] text-white font-medium"
     onClick={() => {
      handleSubmit();
     }}>
     Save Changes
    </button>
   </div>
  </div>
 );
};

export default Item;

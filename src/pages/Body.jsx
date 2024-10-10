import axios from "axios";
import { useEffect, useState } from "react";

const Body = () => {
 const [displayForm, setDisplayForm] = useState("supplier");
 const [countryList, setCountryList] = useState([]);
 const [stateList, setStateList] = useState([]);
 const [cityList, setCityList] = useState([]);

 const [selectedCountryId, setselectdCountryId] = useState(0);
 const [selectedStateId, setSelectedStateId] = useState(0);

 const [itemDetails, setItemDetails] = useState({
  itemName: "",
  quantity: 0,
  unitPrice: 0,
  submissionDate: "",
  currency: "",
 });

 const [supplierDetails, setSupplierDetails] = useState({
  supplierName: "",
  companyName: "",
  phoneCode: "",
  phoneNumber: "",
  countryId: "",
  stateId: "",
  cityId: "",
  email: "",
 });

 const handleInput = (e) => {
  const { name, value } = e.target;
  setItemDetails((prevData) => ({
   ...prevData,
   [name]: value,
  }));
 };

 const handleInputSupplier = (e) => {
  const { name, value } = e.target;
  setSupplierDetails((prevData) => ({
   ...prevData,
   [name]: value,
  }));
 };

 console.log("itemDetails", itemDetails);
 console.log("supplierDetails", supplierDetails);

 const handleSubmit = async () => {
  try {
   const response = await axios.post(
    `https://apis-technical-test.conqt.com/Api/Item-Supplier/Save-Items-Suppliers`,
    {
     itemDetails: {
      ...itemDetails,
     },
     supplier: { ...supplierDetails },
    }
   );
   const data = await response.json();
   console.log("data", data);
  } catch (e) {
   console.log(e);
  }
 };

 useEffect(() => {
  const request = async () => {
   try {
    const response = await fetch(
     `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CountryList`
    );
    const data = await response.json();
    setCountryList(data.data.countyList);
   } catch (e) {
    console.log(e);
   }
  };
  request();
 }, []);

 useEffect(() => {
  const request = async () => {
   try {
    const response = await fetch(
     `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-SateList-By-Country?countryId=${selectedCountryId}`
    );
    const data = await response.json();
    setStateList(data.data.stateList);
   } catch (e) {
    console.log(e);
   }
  };
  if (selectedCountryId > 0) {
   request();
  }
 }, [selectedCountryId]);

 useEffect(() => {
  const request = async () => {
   try {
    const response = await fetch(
     `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CityList-By-Country-State?countryId=${selectedCountryId}&stateId=${selectedStateId}`
    );
    const data = await response.json();
    setCityList(data.data.cityList);
   } catch (e) {
    console.log(e);
   }
  };
  if (selectedCountryId > 0 && selectedStateId > 0) {
   request();
  }
 }, [selectedCountryId, selectedStateId]);

 //  useEffect(() => {
 //   if (selectedCountryId && countryList && countryList?.length > 0) {
 //    selectedCountryId(countryList?.[0]?.countryId);
 //   }
 //  }, [countryList]);

 return (
  <div>
   <div className="flex justify-center gap-4 py-4">
    <div className="flex items-center gap-1">
     <input
      type="checkbox"
      id="item"
      checked={displayForm === "item"}
      onChange={() => {
       setDisplayForm("item");
      }}
     />
     <label htmlFor="item">Item</label>
    </div>
    <div className="flex items-center gap-1">
     <input
      type="checkbox"
      id="supplier"
      checked={displayForm === "supplier"}
      onChange={() => {
       setDisplayForm("supplier");
      }}
     />
     <label htmlFor="supplier">Supplier</label>
    </div>
   </div>
   <div>
    <div className="flex flex-col justify-center items-center">
     <h1 className="font-bold text-2xl">Item Details</h1>
     <div className="p-8 bg-[#EBEEFD] grid grid-cols-2 gap-5 w-[1000px] text-sm my-5 rounded-md">
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
        value={itemDetails?.itemName}
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
        value={itemDetails.quantity}
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
        value={itemDetails.unitPrice}
        onChange={handleInput}
       />
      </div>
      <div className="flex flex-col">
       <label htmlFor="submissionDate" className="font-medium mb-1">
        Date of Submission
       </label>
       <input
        type="date"
        name="submissionDate"
        id="submissionDate"
        className="w-full p-2"
        placeholder="Enter Date of Submission"
        value={itemDetails.submissionDate}
        onChange={handleInput}
       />
      </div>
     </div>
     <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl">Supplier Details</h1>
      <div className="p-8 bg-[#EBEEFD] grid grid-cols-2 gap-5 w-[1000px] text-sm mt-5 rounded-md">
       <div className="flex flex-col">
        <label htmlFor="supplierName" className="font-medium mb-1">
         Supplier Name
        </label>
        <input
         type="text"
         name="supplierName"
         id="supplierName"
         placeholder="Enter Item Supplier Name"
         className="w-full p-2"
         value={supplierDetails.supplierName}
         onChange={handleInputSupplier}
        />
       </div>
       <div className="flex flex-col">
        <label htmlFor="companyName" className="font-medium mb-1">
         Company Name
        </label>
        <input
         type="text"
         name="companyName"
         id="companyName"
         className="w-full p-2"
         placeholder="Enter Company Name"
         value={supplierDetails.companyName}
         onChange={handleInputSupplier}
        />
       </div>
       <div className="flex flex-col">
        <label htmlFor="country" className="font-medium mb-1">
         Country
        </label>
        <select
         name="countryId"
         id="countryId"
         value={supplierDetails.countryId}
         className="p-2 bg-white"
         defaultChecked={(item) => {
          item?.countryId === selectedCountryId;
         }}
         onChange={(item) => {
          console.log("counter", countryList);
          const id = item.target.value;
          const currency = countryList?.find(
           (item) => item?.countryId === Number(id)
          )?.currency;
          const phoneCode = countryList?.find(
           (item) => item?.countryId === Number(id)
          )?.phonecode;
          setselectdCountryId(id);
          setItemDetails((prev) => ({
           ...prev,
           currency: currency,
          }));
          setSupplierDetails((prev) => ({
           ...prev,
           countryId: id,
           phoneCode: phoneCode,
          }));
         }}>
         {countryList?.map((item) => (
          <option key={item?.countryId} value={item?.countryId} selected={item}>
           {item?.name}
          </option>
         ))}
        </select>
       </div>
       <div className="flex flex-col">
        <label htmlFor="stateId" className="font-medium mb-1">
         State
        </label>
        <select
         name="stateId"
         id="stateId"
         className="p-2 bg-white"
         defaultChecked={(item) => {
          item?.stateId === stateList?.[0]?.stateId;
         }}
         value={supplierDetails.stateId}
         onChange={(item) => {
          setSelectedStateId(item.target.value);
          setSupplierDetails((prev) => ({
           ...prev,
           stateId: item.target.value,
          }));
         }}>
         {stateList?.map((item) => (
          <option key={item?.stateId} value={item?.stateId}>
           {item?.name}
          </option>
         ))}
        </select>
       </div>
       <div className="flex flex-col">
        <label htmlFor="cityId" className="font-medium mb-1">
         City
        </label>
        <select
         name="cityID"
         id="cityID"
         className="p-2 bg-white"
         defaultChecked={(item) => {
          item?.cityId === cityList?.[0]?.cityId;
         }}
         value={supplierDetails.cityId}
         onChange={(item) => {
          setSupplierDetails((prev) => ({
           ...prev,
           cityId: item.target.value,
          }));
         }}>
         {cityList?.map((item) => (
          <option key={item?.cityId} value={item?.cityId}>
           {item?.name}
          </option>
         ))}
        </select>
       </div>
       <div className="flex flex-col">
        <label htmlFor="email" className="font-medium mb-1">
         Email Address
        </label>
        <input
         type="email"
         name="email"
         id="emailAddress"
         className="w-full p-2"
         placeholder="Enter Email Address"
         value={supplierDetails.email}
         onChange={handleInputSupplier}
        />
       </div>
       <div className="flex flex-col">
        <label htmlFor="phoneNumber" className="font-medium mb-1">
         Phone Number
        </label>
        <input
         type="number"
         name="phoneNumber"
         id="phoneNumber"
         className="w-full p-2"
         placeholder="Enter Phone Number"
         value={supplierDetails.phoneNumber}
         onChange={handleInputSupplier}
        />
       </div>
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
   </div>
  </div>
 );
};

export default Body;

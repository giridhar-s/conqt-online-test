import { useEffect, useState } from "react";

const Supplier = () => {
 const [countryList, setCountryList] = useState([]);
 const [stateList, setStateList] = useState([]);
 const [selectedCountryId, setselectdCountryId] = useState(0);

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
  if (selectedCountryId && countryList && countryList?.length > 0) {
   selectedCountryId(countryList?.[0]?.countryId);
  }
 }, [countryList]);

 return (
  <div className="flex flex-col justify-center items-center">
   <h1 className="font-bold text-2xl">Supplier Details</h1>
   <div className="p-8 bg-[#EBEEFD] grid grid-cols-2 gap-5 w-[1000px] text-sm mt-5 rounded-md">
    <div className="flex flex-col">
     <label htmlFor="supplierName" className="font-medium mb-1">
      Supplier Name
     </label>
     <input
      type="text"
      name=""
      id="supplierName"
      placeholder="Enter Item Supplier Name"
      className="w-full p-2"
     />
    </div>
    <div className="flex flex-col">
     <label htmlFor="companyName" className="font-medium mb-1">
      Company Name
     </label>
     <input
      type="text"
      name=""
      id="companyName"
      className="w-full p-2"
      placeholder="Enter Company Name"
     />
    </div>
    <div className="flex flex-col">
     <label htmlFor="country" className="font-medium mb-1">
      Country
     </label>
     <select
      name="country"
      id="country"
      className="p-2 bg-white"
      defaultChecked={(item) => {
       item?.countryId === selectedCountryId;
      }}
      onChange={(item) => {
       console.log(item.target.value);
       setselectdCountryId(item.target.value);
      }}>
      {countryList?.map((item) => (
       <option key={item?.countryId} value={item?.countryId}>
        {item?.name}
       </option>
      ))}
     </select>
    </div>
    <div className="flex flex-col">
     <label htmlFor="state" className="font-medium mb-1">
      State
     </label>
     <select
      name="country"
      id="state"
      className="p-2 bg-white"
      defaultChecked={(item) => {
       item?.stateId === stateList?.[0]?.stateId;
      }}
      // onChange={(item) => {
      //  console.log(item.target.value);
      //  setselectdCountryId(item.target.value);
      // }}
     >
      {stateList?.map((item) => (
       <option key={item?.stateId} value={item?.stateId}>
        {item?.name}
       </option>
      ))}
     </select>
    </div>
    <div className="flex flex-col">
     <label htmlFor="city" className="font-medium mb-1">
      City
     </label>
     <input
      type="text"
      name=""
      id="city"
      placeholder="Enter City"
      className="w-full p-2"
     />
    </div>
    <div className="flex flex-col">
     <label htmlFor="emailAddress" className="font-medium mb-1">
      Email Address
     </label>
     <input
      type="email"
      name=""
      id="emailAddress"
      className="w-full p-2"
      placeholder="Enter Email Address"
     />
    </div>
   </div>
   <div className="mt-8">
    <button
     type="submit"
     className="bg-[#007AFF] p-[12px h-[48px] w-[240px] rounded-[8px] text-white font-medium">
     Save Changes
    </button>
   </div>
  </div>
 );
};

export default Supplier;

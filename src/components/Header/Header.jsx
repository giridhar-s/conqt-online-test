const Header = () => {
 return (
  <div>
   <div className="flex justify-between items-center bg-[#007AFF] w-full p-5">
    <div className="flex gap-2 items-center">
     <div className="w-[40px] h-[40px] rounded-full bg-white"></div>
     <h1 className="text-[20px] text-white font-bold">
      Inventory Management System
     </h1>
    </div>
    <p className="text-white">Home</p>
   </div>
  </div>
 );
};

export default Header;

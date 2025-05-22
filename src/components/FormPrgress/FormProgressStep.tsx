export default ({
  label,
  count,
  isNext,
  pageNumber,
}: {
  label: string;
  count: number;
  isNext: boolean;
  pageNumber: number;
}) => {
  return (
    <div className="w-fit flex flex-col items-center mr-[20px]  sm:mr-[112px] last-of-type:mr-0 relative ">
      <p
        className={` relative bg-[#D9D9D9] rounded-full w-[20px] h-[20px] flex items-center justify-center text-xs mb-2 ${
          pageNumber >= count ? "bg-[#FF9000] text-white" : ""
        }`}
      >
        {count}
      </p>

      <p className="text-sm text-nowrap font-medium absolute top-[25px] hidden sm:block">
        {label}
      </p>

      {isNext && (
        <div
          className={` w-[100px] h-[2px] absolute top-[7px] left-[30px] rounded-full hidden sm:block ${
            pageNumber - 1 >= count ? "bg-[#FF9000]" : "bg-[#D9D9D9]"
          } `}
        ></div>
      )}
    </div>
  );
};

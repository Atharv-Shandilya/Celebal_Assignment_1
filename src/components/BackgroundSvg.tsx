import CircleSvg from "./CircleSvg";

export default () => {
  return (
    <div>
      <div className="bg-[#FF9000] fixed left-0 right-0 top-1/2 bottom-0"></div>
      <div className="bg-[#FFE4C7] fixed left-0 right-0 top-0 bottom-1/2"></div>
      <CircleSvg
        w="300"
        h="300"
        pos="top-[40px] left-1/2 transform -translate-x-1/2 "
        deg="310"
      />
      <CircleSvg
        w="150"
        h="150"
        pos="top-1/2 -left-[75px] transform -translate-y-1/2 "
        deg="120"
      />
      <CircleSvg w="80" h="80" pos=" right-[50px] bottom-[50px]" deg="300" />
    </div>
  );
};

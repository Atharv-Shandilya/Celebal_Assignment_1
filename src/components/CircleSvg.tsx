export default ({
  w,
  h,
  pos,
  deg,
}: {
  w: string;
  h: string;
  pos: string;
  deg: string;
}) => {
  return (
    <div
      style={{
        width: w + "px",
        height: h + "px",
        background: `linear-gradient(${deg}deg, rgba(255,144,0,1) 0%, rgba(255,215,169,1) 70%, rgba(255,228,199,1) 90%)`,
      }}
      className={`rounded-full absolute ${pos}`}
    ></div>
  );
};

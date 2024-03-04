import { TailSpin } from "react-loader-spinner";

export const Loader = () => {
  return (
    <TailSpin
      height="80"
      width="80"
      color="#471ca9"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{ justifyContent: "center", marginTop: "10px" }}
      wrapperClass=""
      visible={true}
    />
  );
};

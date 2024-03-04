import { TailSpin } from "react-loader-spinner";

export const Loader = () => {
  return (
    <TailSpin
      height="48"
      width="48"
      color="#00bdd3"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{ justifyContent: "center", marginTop: "10px" }}
      wrapperClass=""
      visible={true}
    />
  );
};

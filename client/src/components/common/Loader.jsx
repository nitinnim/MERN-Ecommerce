import { RotatingLines } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}

export default Loader;

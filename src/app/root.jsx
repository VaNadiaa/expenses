import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <div id="main" className="p-10 md:mx-10">
        <div className="max-w-4xl md:max-w-6xl m-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Root;

import React from "react";
import { Triangle } from 'react-loader-spinner'
function Loading() {
  return (
    <div className="loader">
      
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="gray"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loading;

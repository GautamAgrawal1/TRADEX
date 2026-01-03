// import React from 'react';

// function Hero() {
//     return ( 
//         <div className='container p-5 mb-5'>
//             <div className='row text-center'>
//                 <img src='/media/images/homeHero.svg' alt='Hero Image' className='mb-5' />
//                 <h1 className='mt-5'>Invest in everything</h1>
//                 <p>Online platform to invest in stocks, derivatives, mutual funds, and more</p>
//                 <button className='p-2 btn btn-primary fs-5' style={{width:"20%",margin:"0 auto"}}>Signup Now</button>
//             </div>

//         </div>
//      );
// }

// export default Hero;

import React from "react";

function Hero() {
  const goToDashboard = () => {
    window.location.href =
      process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3000";
  };

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img
          src="/media/images/homeHero.svg"
          alt="Hero Image"
          className="mb-5"
        />

        <h1 className="mt-5">Invest in everything</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, and more
        </p>

        <div className="d-flex justify-content-center gap-3 mt-3">
          <button
            className="p-2 btn btn-primary fs-5"
            style={{ width: "20%" }}
          >
            Signup Now
          </button>

          <button
            className="p-2 btn btn-dark fs-5"
            style={{ width: "20%" }}
            onClick={goToDashboard}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;

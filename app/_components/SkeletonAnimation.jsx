import React from 'react'


function SkeletonAnimation({ width, height }) {

  
    return (
      <>
      
          <div
           
            className=
            {`
                animate-pulse
                bg-slate-200
                rounded-lg
                mb-2
              
              `}
            style={{width:width, height:height}}
          >
         
          </div>
     
      </>
    );
  }

export default React.memo(SkeletonAnimation)
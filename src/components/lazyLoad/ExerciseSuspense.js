


import React,{ Suspense }  from 'react';

const ExerciseSuspense = WrappedComponent => {
    return (props)=>{
        return (<Suspense fallback={<div></div>}>
        <WrappedComponent {...props} />
      </Suspense>);
    };
};

export default ExerciseSuspense;
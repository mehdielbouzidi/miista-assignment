import React from 'react'

type GridProps = {
    children: React.ReactNode;
};  

const Grid = (props: GridProps) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {props.children}
    </div>
  )
}

export default Grid
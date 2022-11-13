import React from 'react'

type ContainerProps = {
    children: React.ReactNode;
};  

const Container = (props: ContainerProps) => {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {props.children}
    </div>
  )
}

export default Container
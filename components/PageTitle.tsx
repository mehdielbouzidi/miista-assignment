import React from 'react'

const PageTitle = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {pageTitle}
    </h2>
  )
}

export default PageTitle
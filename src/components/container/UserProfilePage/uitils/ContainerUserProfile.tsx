import React from 'react'
import Leftbar from './Leftbar'
import ProfileContent from './ProfileContent'
import RightBar from './RightBar'

const ContainerUserProfile = () => {
  return (
    <div className='container-user-profile'>
      <Leftbar />
      <ProfileContent />
      <RightBar />
    </div>
  )
}

export default ContainerUserProfile
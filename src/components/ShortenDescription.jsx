/* eslint-disable react/prop-types */
import { useState } from 'react'

const ShortenDescription = ( {  description} ) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  }

  return (
    <>
      {
        showFullDescription ? description : `${description.substring(0,100)}...`
      }
      <button onClick={toggleDescription}>
        {showFullDescription ? 'Show less' : 'Show more'}
      </button>
    </>
  )
}

export default ShortenDescription;

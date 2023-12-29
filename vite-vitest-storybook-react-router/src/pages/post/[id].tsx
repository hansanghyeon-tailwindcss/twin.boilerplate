import React from 'react'
import { useParams } from 'react-router-dom';

const ID = () => {
	const params = useParams();
	const productId = params.id;
  return (
    <div>ID: {productId}</div>
  )
}

export default ID
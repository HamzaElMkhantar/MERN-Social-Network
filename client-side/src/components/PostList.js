import React, { useEffect, useState } from 'react'
import Post from './Post'

function PostList({posts}) {

    const [data , setData] = useState([]) ;
console.log(data)
    useEffect( () => {
        setData(posts)
    } , [posts])

  return (
    <div  className='postList row'>
        <div className='col--8 mx-auto'>
            {data &&
                data.map((post , index) => {
                    return <Post post={post && post} key={post && post._id} />
                })
            }
        </div>
        
    </div>
  )
}

export default PostList
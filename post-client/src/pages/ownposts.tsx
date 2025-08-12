import React from 'react'
import OwnPostCard from '../components/ownPostCard'
import { useGetOwnPosts } from '../logic/usePosts';

function OwnpostsPage() {
    const { data: posts } = useGetOwnPosts();
  
  return (
    <div> <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
      {posts?.map((post) => (
        <OwnPostCard key={post.postId} content={post.content} userName={post.userName} title={post.title} userId={post.userId} postId={post.postId} />
      ))}
    </div></div>
  )
}

export default OwnpostsPage
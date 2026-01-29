import React from 'react'
import { useGetLoggedInUser } from '../logic/useUsers';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/logutBtn';
import PostCard from '../components/postCard';
import { useGetAllPost } from '../logic/usePosts';
import { useLogout } from "../logic/useUsers";
import { useGetComments } from '../logic/useComments';


function Home() {

  const { data } = useGetLoggedInUser();
  const { data: posts } = useGetAllPost();
 

 
  const logout = useLogout();
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {data ? (
        <div>
          <h2>User Profile: {data.name}</h2>
          <p>Email: {data.email}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
      <LogoutButton />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
        {posts?.map((post) => (
          <PostCard key={post.postId} />
        ))}
      </div>
     

     
      <button onClick={logout}>
        Kilépés
      </button>

      <div>
        <input type="file" />
      </div>

    </div>
  )


}

export default Home
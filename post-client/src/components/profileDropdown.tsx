import React, { useState } from 'react'
import { useGetLoggedInUser } from "../logic/useUsers";
import { useGetAllPost } from "../logic/usePosts";
import LogoutButton from "./logutBtn";
import PostCard from "./postCard";

function ProfileDropdown() {
    const { data } = useGetLoggedInUser();
    const { data: posts } = useGetAllPost();
    const [isopen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isopen);
    }
    return (
        <div className='relative  ml-[100px]   '>

            <button onClick={handleOpen} className='cursor-pointer bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600'>
                {data? data.name : 'Profile'}
            </button>

            {isopen && (
                <div className='absolute flex flex-col justify-center mt-12 bg-red-400 items-center'>
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
                            <PostCard key={post.postId} content={post.content} userName={post.userName} title={post.title} userId={post.userId} postId={post.postId} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown
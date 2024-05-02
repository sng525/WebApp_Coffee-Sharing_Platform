import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useGetPostById } from '@/lib/react-query/queriesAndMutations';
import { formatTimeAgo } from '@/lib/utils';
import { Loader } from 'lucide-react';
import React from 'react'
import { Link, useParams } from 'react-router-dom';

const PostDetails = () => {

  const { id } = useParams();

  // Fetch the post details
  const { data: post, isPending } = useGetPostById(id || '')
  const { user } = useUserContext();


  const handleDeletePost  = () => {};

  return (
    // Fix the UI

    <div className="post_details-container">
      {isPending ? <Loader /> : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="post"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
                <img
                  src={post?.creator?.imageUrl || '/assets/images/coffee-icon.svg'}
                  alt="creator"
                  className="rounded-full w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-dark-1"> {post?.creator.name} </p>

                  <div className="flex-center gap-2 text-light-3 subtle-semibold lg:small-regular">
                    <p> {formatTimeAgo(post?.$createdAt)}</p>
                    <p> -- </p>
                    <p> {post?.location} </p>
                  </div>
                </div>

              </Link>

              <div className="flex-center gap-4">
                <Link to={`/update-post/${post?.$id}`} className={
                  `${user.id !== post?.creator.$id && 'hidden'}`
                }>
                  <img src="assets/icons/edit.svg" width={30} height={30}/>
                </Link>

                <Button onClick={handleDeletePost} variant="ghost" className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'}`}>
                  <img src="/assets/icons/delete.svg" alt="Delete" width={30} height={30} />
                </Button>

              </div>
            </div>
          </div>
        </div>
      )
      }

    </div >
  )
}

export default PostDetails
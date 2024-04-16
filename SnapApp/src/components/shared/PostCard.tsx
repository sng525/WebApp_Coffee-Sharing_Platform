import { Models } from "appwrite"
import { Link } from "react-router-dom"

type PostCardDrops = {
    post: Models.Document
}


const PostCard = ( { post } : PostCardDrops) => {
  return (
    <div className="post-card">
        <div className="flex-between">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${post.creator.$id}`}>
                    <img
                        src={post?.creator?.imageUrl || '/assets/images/profile-default.png'}
                        alt="creator"

                    />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default PostCard
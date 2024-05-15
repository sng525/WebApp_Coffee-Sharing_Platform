import Loader from "@/components/shared/Loader"
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";


const Home = () => {
  const {data: posts, isLoading: isFetchingPosts} = useGetRecentPosts();
  const { data: users, isLoading: isFetchingUsers} = useGetUsers();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home</h2>

          <div>
            {
              isFetchingPosts && !posts ? (
                <Loader />
              ) : (
                <ul className="flex flex-col flex-1 gap-9 w-full">
                  {
                    posts?.documents?.map((post: Models.Document) => (
                      <li key={post.$id} className="flex justify-center w-full"> <PostCard post={post} />
                      </li>
                    ))
                  }
                </ul>
              )
            }
          </div>
        </div>
      </div>

      <div className="rightsidebar">
            <div className="home-creators">
                <h2 className="h3-bold text-left w-full">Top Creators</h2>
            </div>

            <div>
                {
                    isFetchingUsers && !users ? (
                        <Loader />
                    ) : (
                        <div>
                            <ul className="grid grid-cols-2 gap-4 py-4 px-4">
                                {
                                    users?.documents?.map((user: Models.Document) => (
                                        <li key={user.accountId} className="user-card">
                                            <UserCard user={user} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }

            </div>

        </div>
    </div>
  )
}

export default Home
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useUserContext();
  const { data: posts, isLoading: isFetchingUserPosts } = useGetUserPosts(
    user.id
  );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <img
          src={user.imageUrl || "../assets/images/profile-default.png"}
          alt="profile"
          width={200}
          height={200}
          className="aspect-square rounded-full"
        />
        <div className="flex flex-col">
          <div className="flex flex-row flex-center px-5">
            <h1 className="h1-bold md:h2 bold text-left w-full">{user.name}</h1>
            <Link
              to={`/update-profile/${user.accountId}`}
              className="w-full flex flex-row px-1"
            >
              <Button type="button" className="shad-button_primary">
                <img src="../assets/icons/edit.svg" width={20} height={20} />
                <p>Edit Profile</p>
              </Button>
            </Link>
          </div>

          <p className="text-sm px-5">@{user.username}</p>

          <div className="grid grid-cols-3 py-5">
            <div className="px-5">
              <p className="text-xl text-blue-600">{posts?.total}</p>
              <p>Posts</p>
            </div>
            <div className="px-5">
              <p className="text-xl text-blue-600">15</p>
              <p>Followers</p>
            </div>
            <div className="px-5">
              <p className="text-xl text-blue-600">15</p>
              <p>Following</p>
            </div>
          </div>

          <div>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>

      <div>
        {isFetchingUserPosts && !!posts ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {posts?.documents.map((post: Models.Document) => (
              <li key={post.$id}>
                <Link to={`/posts/${post.$id}`} className="saves-card">
                  <img
                    src={post.imageUrl}
                    alt="post"
                    className="h-full w-full object-cover rounded-[30px]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
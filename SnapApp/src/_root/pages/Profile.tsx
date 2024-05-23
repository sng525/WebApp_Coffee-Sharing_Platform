import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useGetUserPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const { data : user } = useGetUserById(id || '');
  // const { data: posts, isLoading: isFetchingUserPosts } = useGetUserPosts(user.id);

  const { currentUser } = useUserContext();

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <img
          src={user?.imageUrl || "../assets/images/profile-default.png"}
          alt="profile"
          width={200}
          height={200}
          className="aspect-square rounded-full"
        />
        <div className="flex flex-col">
          <div className="flex flex-row flex-center px-5">
            <h1 className="h1-bold md:h2 bold text-left w-full">{user?.name}</h1>
            <Link
              to={`/update-profile/${user?.accountId}`}
              className="w-full flex flex-row px-1"
            >
              <Button type="button" className="shad-button_primary">
                <img src="../assets/icons/edit.svg" width={20} height={20} />
                <p>Edit Profile</p>
              </Button>
            </Link>
          </div>

          <p className="text-sm px-5">@{user?.username}</p>

          <div className="grid grid-cols-3 py-5">
            <div className="px-5">
              <p className="text-xl text-blue-600">{user?.posts.length}</p>
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
            <p>{user?.bio}</p>
          </div>
        </div>
      </div>

      <div className={`${user?.id !== currentUser.id && "hidden"}`}>
          <ul className="user-grid">
            {user?.posts.documents.map((post: Models.Document) => (
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
      </div>
    </div>
  );
};

export default Profile;
import React from 'react'
import Loader from './Loader'
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { useGetUsers } from '@/lib/react-query/queriesAndMutations';

const RightSideBar = () => {
    const { data: users, isLoading } = useGetUsers();

    return (
        <div className="rightsidebar">
            <div className="home-creators">
                <h2 className="h3-bold text-left w-full">Top Creators</h2>
            </div>

            <div>
                {
                    isLoading && !users ? (
                        <Loader />
                    ) : (
                        <ul>
                            {
                                users?.documents?.map((user: Models.Document) => (
                                    <li key={user.id} className="flex justify-center w-full">
                                        <div className="user-card">
                                            <div className="flex-between">
                                                <div className="flex items-center gap-3">
                                                    <Link to={`/profile/${user.$id}`}>
                                                        <img src={user.id.imageUrl || 'assets/images/default-profile.svg'} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }

            </div>

        </div>
    )
}

export default RightSideBar
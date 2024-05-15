import React from 'react'
import Loader from './Loader'
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { useGetUsers } from '@/lib/react-query/queriesAndMutations';
import { Button } from '../ui/button';

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
                        <div>
                            <ul className="grid grid-cols-2 gap-4 py-4 px-4">
                                {
                                    users?.documents?.map((user: Models.Document) => (
                                        <li key={user.accountId} className="user-card">
                                            <div>
                                                <Link to={`/profile/${user.accountId}`}>
                                                    <img src={user.imageUrl || 'assets/images/default-profile.svg'}
                                                        alt="avatar"
                                                        className="rounded-full w-20 h-20"
                                                    />
                                                </Link>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <p className="base-medium lg:body-bold text-dark-3"> {user.name} </p>
                                                <p className="base-small text-light-3"> @{user.username} </p>
                                            </div>

                                            <Button className="shad-button_follow py-5 px-5" >
                                                Follow
                                            </Button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default RightSideBar
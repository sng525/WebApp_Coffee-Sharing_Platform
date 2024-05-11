import { Models } from 'appwrite';
import React from 'react'
import Loader from './Loader';
import GrindPostList from '@/_root/pages/GrindPostList';

type SearchResultProps = {
  isSearching: boolean;
  searchedPosts: Models.Document[];
}

const SearchResults = ( {isSearching, searchedPosts} : SearchResultProps) => {
  if (isSearching) return <Loader />

  if (searchedPosts && searchedPosts.documents.length > 0) return <GrindPostList posts={searchedPosts.documents} />

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  )
}

export default SearchResults
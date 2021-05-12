import React from 'react'

const SearchBar = () => {
    return (
        <form className='flex flex-row'>
            <input type="text" className='px-8 py-4 border bg-white mr-4' />
            <button type="submit" className="px-2 py-4 uppercase text-blue-600 border-2 border-blue-600">Search</button>
        </form>
    )
}

export default SearchBar;

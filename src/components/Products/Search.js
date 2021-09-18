import React, {useState} from 'react'

function Search({onSearch}) {

    const [search, setSearch] = useState('')

    const onInputChange = (value)=>{
        setSearch(value);
        onSearch(value)
    }

    return (
        <>
            <input className="form-control my-3" value={search} onChange={e=>onInputChange(e.target.value)} placeholder="Search..."></input>
        </>
    )
}

export default Search

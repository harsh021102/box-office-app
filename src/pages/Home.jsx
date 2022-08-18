import React,{useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { apiGet } from '../misc/config'
import ShowGrid from '../components/show/ShowGrid'
import ActorGrid from '../components/actor/ActorGrid'
import { useLastQuery } from '../misc/custom-hooks'

const Home = () => {

  const [input,setInput] = useLastQuery('')
  const [results,setResults] = useState(null)
  const [searchOption,setSearchOption] = useState('shows')

  const isShowsSearch = searchOption === 'shows';

  const onInputChange =(event)=>{
    setInput(event.target.value)
  }

  const onSearch = async () =>{
    apiGet(`/search/${searchOption}?q=${input}`).then(result=>{
      setResults(result)
    })
    console.log(results);
  }

  const onKeyDown = (event) => {
    if(event.keyCode===13)
      onSearch()
  }

  const renderResults = () => {
    if(results && results.length === 0)
    {
      return <div>no results</div>
    }
    if(results && results.length > 0)
    {
      return results[0].show 
      ?( <ShowGrid data={results}/> )
      :( <ActorGrid data={results}/>)   
    }
  }

  const onRadioChange = (event) => {
    setSearchOption(event.target.value)
    console.log(searchOption);
  }

  return (
    <MainPageLayout >
      <input type="text" onKeyDown={onKeyDown} onChange={onInputChange} value={input} placeholder="Search for something"/>

      <div>
        <label htmlFor='shows-search'>
          Shows
          <input id="shows-search" type="radio" value="shows" checked={isShowsSearch} onChange={onRadioChange}/>
        </label>
        <label htmlFor='actors-search'>
          Actors
          <input id="actors-search" type="radio" value="people" checked={!isShowsSearch} onChange={onRadioChange}/>
        </label>
      </div>

      <button type="button" onClick={onSearch}>Search</button>
      {
        renderResults()
      }
    </MainPageLayout>
  )
}

export default Home
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import SearchResultHeader from "./SearchResultHeader";
import Footer from "./Footer";
import SearchedItemTemplate from "./SearchedItemTemplate";
import SearchedImageItemTemplate from "./SearchedImageItemTemplate";
import Pagination from "./Pagination";
import { Context } from "../utils/ContextApi";

const SearchResult = () => {
    const [result,setResult] = useState()
    const {query,startIndex} = useParams()  
    const {imageSearch} = useContext(Context)

    useEffect(()=>{
        fetchSearchResult()
    },[query,startIndex,imageSearch])

    const fetchSearchResult = () =>{
        let payload = {q:query,start:startIndex}
        if(imageSearch){
            payload.searchType = "image"
        }
        fetchDataFromApi(payload).then((res)=>{
            console.log(res)
            setResult(res)
        })
    }
    if(!result) return ;
    const { items,queries,searchInformation}= result
    return <div className="flex flex-col min-h-[100vh]">
        <SearchResultHeader />
        <main className="grow p-[12px] mb-0 md:pr-5 md:ml-20">
            <div className="flex text-sm text-[#70757a] mb-3">
                {`About ${searchInformation.formattedTotalResults} result in (${searchInformation.formattedSearchTime})`}
            </div>
            
          {!imageSearch ? (<>
            {items.map((item,index)=>{
                return(
                    <SearchedItemTemplate key={index} data={item} />
                )
               
            })}
            </>) : (
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
                    {items.map((item,index)=>{
                        return(
                            <SearchedImageItemTemplate key={index} data={item} />
                        )
            })}
                </div>
                )}
                 <Pagination queries={queries} />
        </main>
        <Footer />
    </div>;
};

export default SearchResult;

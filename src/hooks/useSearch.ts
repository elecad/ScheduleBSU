import {useState} from "react";

export interface Search {
    id: string,
    name: string,
    type: "g" | "t" | "a" | "q" | "nf"
}

type Labels = { smallQuery: Search[], notFound: Search[], errorQuery: Search[] }

const SearchLabels: Labels = {
    smallQuery: [{
        id: "",
        name: "Для поиска нужно более 3 символов...",
        type: "q"
    }],
    notFound: [{id: "", name: "Ничего не найдено", type: "nf"}],
    errorQuery: [{id: "", name: "Произошла ошибка...", type: "nf"}]
}
let controller = new AbortController();

export function useSearch() {

    const [searchList, setSearchList] = useState<Search[]>(SearchLabels.smallQuery)
    const [isSearchLoading, setIsSearchLoading] = useState(false)


    async function fetchSearch(query: string, signal: AbortSignal) {
        const URL = `https://beluni.ru/schedule/search?q=${query}`

        if (query.trim().length < 4) {
            setSearchList(SearchLabels.smallQuery);
            setIsSearchLoading(false)
            return
        }
        try {
            setIsSearchLoading(true)

            const response = await fetch(URL, {signal: signal});
            const list = await response.json() as Search[]
            if (!list.length) {
                setSearchList(SearchLabels.notFound);
                setIsSearchLoading(false)
                return
            }
            setSearchList(list);
            setIsSearchLoading(false)
        } catch {
            setSearchList(SearchLabels.errorQuery);
            setIsSearchLoading(false)
        }

    }

    return {searchList, isSearchLoading, fetchSearch}

    // const [searchResult, setSearchResult] = useState<SearchResult[]>([{
    //     id: "",
    //     name: "Для поиска нужно более 3 символов...",
    //     type: "q"
    // }])
    // const [isSearchLoading, setIsSearchLoading] = useState(false)
    //
    // const [query, setQuery] = useState("")
    // const [isVariantVisible, setIsVariantVisible] = useState(false)
    //
    //
    // async function getResult() {
    //     if (query.trim().length < 4) {
    //         setSearchResult([{id: "", name: "Для поиска нужно более 3 символов...", type: "q"}]);
    //         setIsSearchLoading(false)
    //         return
    //     }
    //     const URL = `https://beluni.ru/schedule/search?q=${query}`
    //     setIsSearchLoading(true)
    //     const response = await fetch(URL); // завершается с заголовками ответа
    //     const data = await response.json() as SearchResult[]
    //     if (!data.length) {
    //         setSearchResult([{id: "", name: "Ничего не найдено", type: "nf"}]);
    //         setIsSearchLoading(false)
    //         return
    //     }
    //     setSearchResult(data);
    //     setIsSearchLoading(false)
    // }
    //
    //
    // return {searchResult, getResult, isSearchLoading, query, setQuery, isVariantVisible, setIsVariantVisible}
}
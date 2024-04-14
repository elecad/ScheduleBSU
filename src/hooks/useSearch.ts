import {useState} from "react";

export interface SearchResult {
    id: string,
    name: string,
    type: "g" | "t" | "a" | "q" | "nf"
}

export function useSearch() {
    const [searchResult, setSearchResult] = useState<SearchResult[]>([{
        id: "",
        name: "Для поиска нужно более 3 символов...",
        type: "q"
    }])
    const [isSearchLoading, setIsSearchLoading] = useState(false)

    const [query, setQuery] = useState("")
    const [isVariantVisible, setIsVariantVisible] = useState(false)


    async function getResult() {
        if (query.trim().length < 4) {
            setSearchResult([{id: "", name: "Для поиска нужно более 3 символов...", type: "q"}]);
            setIsSearchLoading(false)
            return
        }
        const URL = `https://beluni.ru/schedule/search?q=${query}`
        setIsSearchLoading(true)
        const response = await fetch(URL); // завершается с заголовками ответа
        const data = await response.json() as SearchResult[]
        if (!data.length) {
            setSearchResult([{id: "", name: "Ничего не найдено", type: "nf"}]);
            setIsSearchLoading(false)
            return
        }
        setSearchResult(data);
        setIsSearchLoading(false)
    }


    return {searchResult, getResult, isSearchLoading, query, setQuery, isVariantVisible, setIsVariantVisible}
}
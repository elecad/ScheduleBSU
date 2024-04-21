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

            const response = await fetch(URL, {signal});
            const list = await response.json() as Search[]
            if (!list.length) {
                setSearchList(SearchLabels.notFound);
                setIsSearchLoading(false)
                return
            }
            setSearchList(list);
            setIsSearchLoading(false)
        } catch (e) {
            if (e.name == "AbortError")
                setSearchList([])
            else
                setSearchList(SearchLabels.errorQuery);
            setIsSearchLoading(false)
        }

    }

    return {searchList, isSearchLoading, fetchSearch}
}
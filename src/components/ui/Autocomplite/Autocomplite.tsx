import styles from './Autocomplite.module.css'
import {ButtonHTMLAttributes, FormEvent, useEffect, FocusEvent, useState, useCallback} from "react";
import ClassHelper from "classnames/bind";
import {SearchResult, useSearch} from "@/hooks/useSearch.ts";
import {CSSTransition} from "react-transition-group";
import './Transition.css'
import {debounce} from "@/helpers/Debounce.tsx";

const DELAY = 300;

interface AutocompliteProps extends ButtonHTMLAttributes<HTMLDivElement> {
}

const classNames = ClassHelper.bind(styles);

const typeIcons = {
    g: "groups",
    t: "person",
    a: "location_on",
    q: "question_mark",
    nf: "search_off" // Ничего не найдено
}

let controller = new AbortController();

function Autocomplite(props: AutocompliteProps) {
    const {searchList, fetchSearch, isSearchLoading} = useSearch()
    const [isListVisible, setIsListVisible] = useState(false)
    const [query, setQuery] = useState("")

    const inputHandler = useCallback((event: FormEvent<HTMLInputElement>) => {
        const inputElement = event.target as HTMLInputElement
        const text = inputElement.value
        setQuery(text)
    }, [])

    const debounceFetchSearch = useCallback(debounce(fetchSearch, DELAY), [])


    useEffect(() => {
        if (query) {
            controller.abort();
            controller = new AbortController()
            debounceFetchSearch(query, controller.signal)
        }
    }, [query])


    function changeListVisible(event: FocusEvent<HTMLInputElement>) {
        const newValue = event.type == "focus"
        setIsListVisible(newValue)
    }

    function goToNewSchedule(newSchedule: SearchResult) {
        console.log(`Переход к ${JSON.stringify(newSchedule)}`)
    }


    return (
        <div className={classNames("autocomplite")}>
            <div className={classNames("input-container")}>
                <input placeholder="Поиск..." autoComplete="none" onInput={inputHandler} onFocus={changeListVisible}
                       onBlur={changeListVisible}
                       value={query}/>
                {
                    isSearchLoading
                        ? <span className={classNames("loader")}></span>
                        : <span
                            className={classNames("material-icons-outlined", "search-icon")}>search</span>
                }
            </div>

            <CSSTransition classNames={"autocomplete-variants"} in={isListVisible} timeout={200} unmountOnExit
                           mountOnEnter>
                <div className={classNames("autocomplete-variants")}>
                    {/*Подсказки*/}
                    {searchList.map((el) =>
                        <div onClick={() => goToNewSchedule(el)} key={el.id}
                             className={classNames("autocomplete-variant", {"clickable-variant": el.id})}>
                            <span
                                className={classNames("material-icons-outlined", "variant-icon")}>{typeIcons[el.type]}</span>
                            <div>{el.name}</div>
                        </div>
                    )}

                </div>
            </CSSTransition>

        </div>
    );
}

export default Autocomplite;
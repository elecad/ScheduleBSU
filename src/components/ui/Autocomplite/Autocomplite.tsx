import styles from './Autocomplite.module.css'
import {ButtonHTMLAttributes, FormEvent, useEffect, FocusEvent} from "react";
import ClassHelper from "classnames/bind";
import {SearchResult, useSearch} from "@/hooks/useSearch.ts";
import {CSSTransition} from "react-transition-group";
import './Transition.css'

interface AutocompliteProps extends ButtonHTMLAttributes<HTMLDivElement> {
    searchPlaceholder: string,

}

const classNames = ClassHelper.bind(styles);

const typeIcons = {
    g: "groups",
    t: "person",
    a: "location_on",
    q: "question_mark",
    nf: "search_off" // Ничего не найдено
}

function Autocomplite({searchPlaceholder}: AutocompliteProps) {

    const {
        getResult,
        searchResult,
        isSearchLoading,
        query,
        setQuery,
        isVariantVisible,
        setIsVariantVisible
    } = useSearch()


    function inputHandler(event: FormEvent<HTMLInputElement>) {
        const inputElement = event.target as HTMLInputElement
        const text = inputElement.value
        setQuery(text)

    }

    useEffect(() => {
        if (query) {
            getResult()
        }
    }, [query])

    function focusHandler(event: FocusEvent<HTMLInputElement>) {
        setIsVariantVisible(true)
    }

    function blurHandler(event: FocusEvent<HTMLInputElement>) {
        setIsVariantVisible(false)
    }

    function goToNewSchedule(newSchedule: SearchResult) {
        console.log(`Переход к ${JSON.stringify(newSchedule)}`)
    }


    return (
        <div className={classNames("autocomplite")}>
            <div className={classNames("input-container")}>
                <input placeholder={searchPlaceholder} autoComplete="none" onInput={inputHandler} onFocus={focusHandler}
                       onBlur={blurHandler}
                       value={query}/>
                {
                    isSearchLoading
                        ? <span className={classNames("loader")}></span>
                        : <span
                            className={classNames("material-icons-outlined", "search-icon")}>search</span>
                }
            </div>

            <CSSTransition classNames={"autocomplete-variants"} in={isVariantVisible} timeout={200} unmountOnExit
                           mountOnEnter>
                <div className={classNames("autocomplete-variants")}>
                    {/*Подсказки*/}
                    {searchResult.map((el) =>
                        <div onClick={() => goToNewSchedule(el)}
                             className={classNames("autocomplete-variant", {"clickable-variant": el.id})}>
                        <span
                            className={classNames("material-icons-outlined", "variant-icon")}>{typeIcons[el.type]}</span>
                            <div>{el.name}</div>
                        </div>)}

                </div>
            </CSSTransition>

        </div>
    );
}

export default Autocomplite;
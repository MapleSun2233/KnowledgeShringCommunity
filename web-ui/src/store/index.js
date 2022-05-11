import { createStore } from "redux"
// 从本地存储中读取缓存状态，避免刷新时丢失状态
const initState = localStorage.getItem("state")!=null ? JSON.parse(localStorage.getItem("state")) : {
    isLogined:false,
    userInfo: {},
    searchType: "Article",
    searchKeyword: "",
    searchResult: [],
    token:""
}
const reducer = (state = initState, action) => {
    switch(action.type){
        case "setLoginStatus":
            return{
                ...state,
                isLogined:action.isLogined
            }
        case "setUserInfo":
            return{
                ...state,
                userInfo:action.userInfo
            }
        case "setSearchType":
            return{
                ...state,
                searchType:action.searchType
            }
        case "setSearchKeyword":
            return{
                ...state,
                searchKeyword:action.searchKeyword
            }

        case "setSearchResult":
            return{
                ...state,
                searchResult:action.searchResult
            }
        case "setToken":
            return{
                ...state,
                token:action.token
            }
        default:
    }
    return state // 这里不返回就没有初始状态
}
const store = createStore(reducer);
export default store;
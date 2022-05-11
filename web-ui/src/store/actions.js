const setLoginStatus = (status)=>{
    return{
        type:"setLoginStatus",
        isLogined:status
    }
}
const setUserInfo = (userInfo)=>{
    return{
        type:"setUserInfo",
        userInfo:userInfo
    }
}
const setSearchType = (searchType)=>{
    return{
        type:"setSearchType",
        searchType:searchType
    }
}
const setSearchKeyword = (searchKeyword)=>{
    return{
        type:"setSearchKeyword",
        searchKeyword:searchKeyword
    }
}
const setSearchResult = (searchResult)=>{
    return{
        type:"setSearchResult",
        searchResult:searchResult
    }
}
const setToken = (token)=>{
    return{
        type:"setToken",
        token:token
    }
}
export {
    setLoginStatus,
    setUserInfo,
    setSearchType,
    setSearchKeyword,
    setSearchResult,
    setToken
}
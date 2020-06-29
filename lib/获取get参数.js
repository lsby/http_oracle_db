import getUrlParams from "get-url-params";

export default _ => {
    var get参数 = getUrlParams();
    get参数 = Object.keys(get参数).map(a => ({
        [decodeURIComponent(a)]: get参数[a]
    })).reduce((s, a) => Object.assign(s, a), {});
    return get参数
}

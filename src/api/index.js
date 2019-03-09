import axios from "axios";
//  http://localhost:4000/sliders
// 增加默认请求路径
axios.defaults.baseURL = "http://localhost:4000";
// 获取轮播图数据
export let getSliders = ()=>{
    // 返回一个promsie对象 
    return axios.get("/sliders");
}   

//getSliders().then()
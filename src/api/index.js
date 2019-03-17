import axios from "axios";
//  http://localhost:4000/sliders
// 增加默认请求路径
axios.defaults.baseURL = "http://localhost:4000";

// 设置拦截器
axios.interceptors.response.use((res)=>{
    return res.data;
});
// 获取轮播图数据
export let getSliders = ()=>{
    // 返回一个promsie对象 
    return axios.get("/sliders");
}  

// 获取热门图书信息
export let getHotBook = ()=>{
    // 返回一个promsie对象 
    return axios.get("/hot");
} 

export let getAll = () => {
    return axios.all([getSliders(),getHotBook()]);
}

// 获取所有图书
export let getAllBooks = ()=>{
    // 返回一个promsie对象 
    return axios.get("/getAllBooks");
}  

export let pagination = (index)=>{
    // 返回一个promsie对象 
    return axios.get(`/page?index=${index}`);
}

// 删除某一本图书
export let removeBook = (id)=>{
    // 返回一个promsie对象 
    return axios.delete(`/book?id=${id}`);
}  

// 获取某本书
export let getOneBook = (id)=>{
    // 返回一个promsie对象 
    return axios.get(`/book?id=${id}`);
}

/* 修改某本书*/
export let updateBook = (id,data) => {
      return axios.put(`/book?id=${id}`,data);
}

// 增加一本书
export let addBook = (data) => {
      return axios.post("/book",data)
}




//getSliders().then()
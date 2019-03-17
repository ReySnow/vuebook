let http = require("http");
let fs = require("fs");
let url = require("url");

let sliders = require("./index.js");
console.log(sliders);

// 封装方法 读取文件数据
function read(cb) {
    fs.readFile("./books.json","utf8",(err,data)=>{
        if (err || data.length === 0) {
              cb([]); 
        } else {
              cb(JSON.parse(data));
        }  
    });
}

// 封装写入文件
function write(data,cb) {
    fs.writeFile("./books.json",JSON.stringify(data),cb)
}
const pageSize = 5;
// 获取轮播图  /sliders
http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.setHeader("X-Powered-By",' 3.2.1')
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    //console.log(url.parse(req.url));
    if (req.method == "OPTIONS") return res.end(""); 
    let {pathname,query} = url.parse(req.url,true);
    let id = parseInt(query.id);
    console.log(id);
    // delete请求  
    console.log(req.method);
    switch(req.method) {
        case "GET":
        if (pathname === "/sliders") {
            res.setHeader("Content-Type","application/json;charset=utf8");
            res.end (JSON.stringify(sliders));
        }
        if (pathname === "/hot") {        
                read(function(books) {
                    // []或有数据
                    books = books.reverse().slice(0,6);
                    res.end(JSON.stringify(books));
                });      
        }
        if (pathname === "/getAllBooks") {
            read(function(books) {
                res.end(JSON.stringify(books));
            });
        } 
        if (pathname === "/page") {
            // 拿到前台传递的值
            let index =  parseInt(query.index) || 0;
            console.log(index);
            let hasMore = true;
            read(function(books) {
                let result = books.reverse().slice(index,index+pageSize);
                console.log(result);
                if (books.length<=index+pageSize) {
                    hasMore = false;
                }
                res.end(JSON.stringify({hasMore,books:result}));
            });
        }
        if (pathname === "/book") {
            read(function(books) {
                let book =  books.find(item=>item.bookId===id); 
                if (!book) book = {};
                res.end(JSON.stringify(book));
            });
        }

              break;
        case "POST":
              let str2 = "";
              req.on("data",chunck=> {
                 str2 += chunck; 
              });
              req.on("end",()=>{
                  let book = JSON.parse(str2);
                  read(function(books) {
                     book.bookId = books.length?books[books.length-1].bookId+1:1;
                     books.push(book);
                     console.log(books);
                     write(books,function() {
                          // 
                          res.end(JSON.stringify(book));
                     });
                  })
              });
              break;
        case "DELETE":
              read(function(books) {
                  //console.log(typeof query.id);
                  books = books.filter(item=>item.bookId !==id);
                  write(books,function() {
                      res.end(JSON.stringify({}));// 删除成功后返回空对象
                  });
              })
              break;
        case "PUT":
              let str = "";
              req.on("data",chunck=>{
                  str += chunck;
              })
              req.on("end",()=>{
                  let book = JSON.parse(str);
                  read(function(books) {
                    books = books.map(item=>{
                          if (item.bookId === id) {
                              return book;
                          }
                          return item;
                      })
                      write(books,function() {
                        res.end(JSON.stringify(book));
                    })
                  });         
              })
              break;            

    }
   

}).listen(4000);
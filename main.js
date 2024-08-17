let title =document.getElementById("title")
let price =document.getElementById("price")
let taxes =document.getElementById("taxes")
let ads =document.getElementById("ads")
let discount =document.getElementById("discount")
let total =document.getElementById("total")
let count =document.getElementById("count")
let category =document.getElementById("category")
let submit =document.getElementById("submit")
let mood="creat"
let tmp



// console.log(titel,price,taxes,ads,discount,total,count,category,submit)

//get total
function getTotal(){
    if(price.value !=''){
    let result=(+price.value + +taxes.value + +ads.value)- +discount.value
    total.innerHTML =result;
    total.style.background='#040'
    }else{
        total.innerHTML=""
        total.style.background='#830900'
    }
}


//create product
let datapro;
if(localStorage.product != null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
}
submit.onclick=function(){
    let newpro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(title.value !=""&&price.value !=""&&category.value !=""&&newpro.count<100)
    {if(mood==='creat'){
        if(newpro.count>1){
            for(let i=0;i<newpro.count;i++){
                datapro.push(newpro)
                
            }
        }else{
            datapro.push(newpro)
        }
    
    }else{
        datapro[tmp]=newpro
        mood='create'
        submit.innerHTML='create'
        count.style.display='block'
    }
    cleardata()

}
    
    localStorage.setItem('product',  JSON.stringify(datapro))

    showdata()
}

//clear inputs


function cleardata(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    total.innerHTML=''
    count.value=''
    category.value=''
    discount.value=''

}


//read

function showdata(){
    getTotal()
    let table=''
    console.log(datapro)
    for(let i=0;i< datapro.length;i++){
    table+=`
    <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatedata(${i}) "id="update">update</button></td>
        <td><button onclick="deletedata(${i})" id="delate">delate</button></td>
    </tr>
    `
    }
    document.getElementById('tbody').innerHTML=table
    let btndelete=document.getElementById('deleteall')
    if(datapro.length>0){
        btndelete.innerHTML=`<button onclick="deleteAll()">Delete All(${datapro.length})</button>`
    }else{
        btndelete.innerHTML =''
    }
}
showdata()



//delete
function deletedata(i){
    datapro.splice(i,1)
    localStorage.product=JSON.stringify(datapro)
    showdata()
} 

function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    showdata()

}

//count




//uptade


function updatedata(i){
    title.value=datapro[i].title
    price.value=datapro[i].price
    ads.value=datapro[i].ads
    taxes.value=datapro[i].taxes
    discount.value=datapro[i].discount
    category.value=datapro[i].category
    getTotal()
    count.style.display='none'
    submit.innerHTML='Uptade'
    mood='uptade'
    tmp=i
    scroll({
        top:0,
        behavior:'smooth',
    })
}




//search


// let searchmood="title"

// function getsearchmood(){
//     console .log(id)
// }


let searchmood='title'


function getsearchmood(id)
{
    let search= document.getElementById("search")
    if(id=="searchtitle"){
        searchmood="title"
        search.placeholder ="search by title"
    }else{
        searchmood='category'
        search.placeholder ="search by category"
    }
    search.focus()
    search.value=""
    showdata()
    // console.log(searchmood)

}


function searchData(value){
let table=""

    if(searchmood=="title")
    {
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].title.includes(value)){
            table+=`
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updatedata(${i}) "id="update">update</button></td>
                        <td><button onclick="deletedata(${i})" id="delate">delate</button></td>
                    </tr>
                    `
            }
        }
    }else{
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].category.includes(value)){
            table+=`
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updatedata(${i}) "id="update">update</button></td>
                        <td><button onclick="deletedata(${i})" id="delate">delate</button></td>
                    </tr>
                    `
            }
        }
        }
        document.getElementById('tbody').innerHTML=table
    }








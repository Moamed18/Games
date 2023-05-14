
    



let links=Array.from(document.querySelectorAll(".nav-link"))
let gamesBox = document.querySelector("#gamesBox")
let gamesSecthion = document.querySelector("#gamesSecthion")
let detailsBox = document.querySelector("#detailsBox")
 let searchInput=document.querySelector('#searchInput')
  let looding = document.querySelector('.looding')
  let looding2 = document.querySelector('.looding2')

let icon



const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8142fe05c8msh272057761820e7fp1b945cjsn597eadf1d39e',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

links.forEach(element => {
    element.addEventListener("click", function () {
         cate = this.getAttribute("cate")
        currentPage=1
        btn1.classList.replace('d-inline','d-none')

        getGames(cate,currentPage)
        links.forEach(ele => {
            ele.classList.remove("active")
        })
        this.classList.add("active")
    })
})

let cate ="mmorpg"
let pageSize =40
let totalPages
let currentPage = 1;

getGames(cate,currentPage)

let ArrayForSearch=[]
async function getGames(cate,page) {
    looding.classList.replace('d-none','d-flex')
    let res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cate}`, options)
    let data = await res.json();
    console.log(data);
    ArrayForSearch=data
    // console.log(data);

    totalPages=Math.ceil(data.length/pageSize)
    
if(totalPages==1){
    btn2.classList.replace('d-inline','d-none')

   }else if(currentPage==totalPages){
    btn2.classList.replace('d-inline','d-none')

   }else{
    btn2.classList.replace('d-none','d-inline')

   }

    const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageItems = data.slice(startIndex, endIndex);

    display(pageItems)
    // looding.classList.replace('d-flex','d-none')



}


let btn1 =document.querySelector('#x1')
let btn2 =document.querySelector('#x2')
btn1.addEventListener('click',()=>{
    showPreviousPage()
})
btn2.addEventListener('click',()=>{
    showNextPage()
})


function showNextPage() {
  if (currentPage < totalPages) {

    currentPage++;
    console.log(totalPages);
    
    getGames(cate,currentPage)
    btn1.classList.replace('d-none','d-inline')
    
}



}

function showPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    getGames(cate,currentPage)  }

    if(currentPage+1 ==totalPages){
        btn2.classList.replace('d-none','d-inline')
    
    }
    if(currentPage==1){
        btn1.classList.replace('d-inline','d-none')

    }
}





function display(list) {
    let temp = ``;
    list.forEach(ele => {
        let videoPath = ele.thumbnail.replace("thumbnail.jpg", "videoplayback.webm"); /// https://www.freetogame.com/g/540/thumbnail.jpg

        temp += `
        <div class="col-xl-3 mx-auto col-lg-4  col-md-6 col-8 "  onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)">
                <div class="item wow bounceIn shadow-lg rounded-3 overflow-hidden" gameID="${ele.id}">
                    <div class="position-relative">
                        <img src="${ele.thumbnail}" class="w-100 opacity-75" alt="">
                    
                        <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                            <source src="${videoPath}">
                        </video>

                        </div>
                    <div class="gamesInfo py-2 px-3 bg-light">
                        <div class="d-flex align-items-start justify-content-between ">
                            <p class="fw-bolder text-truncate">${ele.title}</p>
                            <span class=" btn btn-sm btn-outline-danger">free</span>
                        </div>
                        <p class="text-center fw-lighter text-truncate">${ele.short_description}</p>
                        <div class="d-flex align-items-start justify-content-between">
                            <span class="btn btn-sm btn-outline-danger">${ele.genre}</span>
                            <span class="btn btn-sm btn-outline-danger text-truncate">${ele.platform}</span>
                        </div>
                    </div>
                </div>
            </div>
        
        `

    })
    gamesBox.innerHTML = temp;
    looding.classList.add("d-none")

    let cards = Array.from(document.querySelectorAll(".item"))
    mody(cards)
}



searchInput.addEventListener("keyup",()=>{
    let searchKey=searchInput.value.toLowerCase()
console.log(searchKey);
let NewData = ArrayForSearch.filter((elemnt)=>elemnt.title.toLowerCase().includes(searchKey))

if(searchInput.value.length >0){
    btn1.classList.replace('d-inline','d-none')
    btn2.classList.replace('d-inline','d-none')
}else{
    getGames(cate,currentPage)

}

display(NewData)
})



function mody(cards) {
    cards.forEach(ele => {
        ele.addEventListener("click", function () {
            let gameId = this.getAttribute("gameID")
            gamesSecthion.classList.add("d-none")
            detailsBox.classList.replace("d-none", "d-flex")
            getOne(gameId);
        })
    })
}


async function getOne(gameId) {
    looding2.classList.replace('d-none','d-flex')

    let res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options)
    let data = await res.json();


    displayDetails(data)
    looding2.classList.replace('d-flex','d-none')

}

function displayDetails(data) {
    let temp = `

    
    
   
    <div class="card-img-overlay wow bounceIn    d-flex align-items-center justify-content-center  position-relative" style="background-image: url(${data.screenshots[0].image});">
        <div
            class="icon fs-2 bg-secondary bg-opacity-75  rounded-circle mx-auto d-flex justify-content-center align-items-center ">
            <i class="fa-solid fa-xmark"></i>
        </div>
      <div class="col-12 col-md-10 col-lg-8   bg-opacity-75 bg-black text-white p-5">
      <h5 class="card-title fs-1 pb-4 fw-lighter mt-5">Title:${data.title}</h5>
      <p class="card-text">Category: <span class="btn btn-sm btn-info">${data.genre}</span></p>
      <p class="card-text">Platform: <span class="btn btn-sm btn-info">${data.platform}</span></p> 
      <p class="card-text">Status: <span class="btn btn-sm btn-info">${data.status}</span></p>            
      <p class="card-text">${data.description}</p>
      <a href="${data.game_url}" target="blank" class="btn btn-outline-info">click</a>
      </div>
    </div>
  

    `;
    document.getElementById("detailsBox").innerHTML = temp
    icon = document.querySelector(".icon")
    exiet(icon)

}

function exiet(icon) {
    icon.addEventListener("click", function () {
        gamesSecthion.classList.replace("d-none", "d-block")
        detailsBox.classList.replace("d-flex", "d-none")

    })
}

new WOW().init();


function startVideo(event) {
    const videoEl = event.target.querySelector("video"); // card ---> video
    videoEl.classList.remove("d-none");
    videoEl.muted = true;
    videoEl.play();
}

function stopVideo(event) {
    const videoEl = event.target.querySelector("video");
    videoEl.classList.add("d-none");
    videoEl.muted = true;
    videoEl.pause();
}




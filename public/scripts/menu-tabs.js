const menuTabs=document.querySelector(".menu-tabs"),menuTabSection=document.querySelector(".menu-tab-content"),searchCategory=document.getElementById("search"),categoryBtns=document.querySelectorAll(".menu-tab-item");function changeValue(e,t){if(t.target.classList.contains("menu-tab-item")&&!t.target.classList.contains("active")){t.target.getAttribute("data-category");menuTabs.querySelector(".active").classList.remove("active"),t.target.classList.add("active"),searchCategory.value=e.innerHTML,console.log(e.innerHTML)}}window.onload=()=>{document.getElementById("defaultCategory").click()};for(const e of categoryBtns)e.addEventListener("click",changeValue);

let brands = document.getElementById("brands");
let topheader = document.getElementById("topheader");
let headerlogo = document.getElementById("headerlogo");
let mainmenulinks = document.getElementById("mainmenulinks");
let searchbtn = document.getElementById("searchbtn");
let controls = document.getElementById("controls");
let offcanvasmenux = document.getElementById("offcanvasmenux");

async function fetchHeader() {
  try {

    // Header
    const response = await axios.get('http://localhost:3000/header');
    response.data["topHeader"]["brands"].forEach(element => {
      brands.innerHTML += `
      <a class="brand" href="#"><img src="${element.src}" alt=""></a>
      `;
    });

    response.data["topHeader"]["menuLinks"].forEach(element => {
      topheader.innerHTML += `
      <a class="text-decoration-none text-dark menulink" href="">${element}</a>
      `;
    });

    headerlogo.innerHTML += `<img class="" src="${response.data["mainHeader"]["logo"].src}" alt="">`;

    response.data["mainHeader"]["categories"].forEach(element => {
      mainmenulinks.innerHTML += `
      <li><a class="text-decoration-none text-dark category" href="">${element}</a></li>
      `;

      offcanvasmenux.innerHTML += `
      <li><a class="text-decoration-none text-dark category h3" href="">${element}</a></li>
      `;
    });

    searchbtn.innerHTML += `
    <a class="search d-flex justify-content-center align-content-center">
          <img class="rounded-5 w-75" src="${response.data["mainHeader"]["controls"][0].src}" alt="">
        </a>
    `;

    response.data["mainHeader"]["controls"].forEach(element => {
      if (element.type !== "menu" && element.type !== "search") {
        controls.innerHTML += `
        <a class="control rounded-circle d-flex justify-content-center align-content-center" href="#">
            <img class="w-100" src="${element.src}" alt="">
          </a>
        `;
      }
      else if (element.type === "menu" && element.type !== "search") {
        controls.innerHTML += `
        <a class="control rounded-circle d-flex justify-content-center align-content-center d-md-none d-flex"
          type="button" data-bs-toggle="offcanvas" data-bs-target="#demo" href="#">
          <img class="w-100" src="${element.src}" alt="">
        </a>
        `;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

let slidescontainer = document.getElementById("slidescontainer");
let collections = document.getElementById("collections");
let product = document.getElementById("product");
let shoptitle = document.getElementById("shoptitle");
let classicsproducts = document.getElementById("classicsproducts");
let swiperslides = document.getElementById("swiperslides");
let headermenu = document.getElementById("headermenu");
let categoriesmenu = document.getElementById("categoriesmenu");


async function fetchBody() {
  try {
    const response = await axios.get('http://localhost:3000/body');
    response.data["sections"][0]["slides"].forEach(element => {
      if (element.mediaType === 'video') {
        slidescontainer.innerHTML += `
      <div class="swiper-slide position-relative d-flex justify-content-center align-items-end">
          <video user-select-none muted autoplay src="${element.src}"></video>
          <div
            class="titleanddescriptionbtn mb-5 text-white position-absolute d-flex flex-column justify-content-center align-items-center">
            <div class="title">
              <p class="m-0 p-0">${element.title}</p>
            </div>
            <div class="description">
              <p>${element.description}</p>
            </div>
            <button type="button" class="btn bg-white rounded rounded-5">${element.buttonText}</button>
          </div>
        </div>
      `;
      } else {
        slidescontainer.innerHTML += `
      <div class="swiper-slide position-relative d-flex justify-content-center align-items-end">
          <img class="" src="${element.src}" alt="">
          <div
            class="titleanddescriptionbtn  mb-5 text-white position-absolute d-flex flex-column justify-content-center align-items-center">
            <div class="title">
              <p class="m-0 p-0">${element.title}</p>
            </div>
            <div class="description">
              <p>${element.description}</p>
            </div>
            <button type="button" class="btn bg-white rounded rounded-5">${element.buttonText}</button>
          </div>
        </div>
      `;
      }
    });
    initializeMainSwiper();

    response.data["sections"][1].items.forEach(element => {

      collections.innerHTML += `
      <div class="collection position-relative w-50 d-flex gap-2 justify-content-start align-items-end">
        <img class="w-100 d-none d-lg-flex" src="${element.srcDesktop}" alt="">
        <img class="w-100 d-flex d-lg-none" src="${element.srcMobile}" alt="">
        <div
          class="titleanddescriptionbtn m-5 text-white position-absolute d-flex flex-column justify-content-center align-items-start">
          <div class="title">
            <p class="m-0 p-0">${element.title}</p>
          </div>
          <div class="description">
            <p>${element.description}</p>
          </div>
          <button type="button" class="btn bg-white rounded rounded-5">${element.buttonText}</button>
        </div>
      </div>
      `;
    });

    product.innerHTML += `
      <div class="titleanddescriptionbtn m-5 text-black d-flex flex-column justify-content-center align-items-center">
        <div class="modelname">
          <p>${response.data["sections"][2].modelName}</p>
        </div>
        <div class="title">
          <p class="m-0 p-0">${response.data["sections"][2].title}</p>
        </div>
        <div class="description">
          <p>${response.data["sections"][2].description}</p>
        </div>
        <button type="button" class="btn bg-black text-white rounded rounded-5">${response.data["sections"][2].buttonText}</button>
      </div>
      `;

    product.innerHTML += `
      <video class="w-100 h-100" user-select-none muted autoplay src="${response.data["sections"][2].src}"></video>
      `;

    shoptitle.innerHTML += `
    <p>${response.data["sections"][3].title}</p>
    `;

    response.data["sections"][3].products.forEach(element => {
      swiperslides.innerHTML += `
    <div class="swiper-slide"><img src="${element.src}" alt=""></div>
    `;
    });
    response.data["sections"][3].products.forEach(element => {
      swiperslides.innerHTML += `
    <div class="swiper-slide"><img src="${element.src}" alt=""></div>
    `;
    });

    response.data["sections"][4].categories.forEach(element => {
      headermenu.innerHTML += `
      <a class="text-decoration-none text-dark menulink" href="">${element}</a>
      `;
    });

    response.data["sections"][4].fcategories.forEach(category => {
      // Create category column div
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'category text-decoration-none text-dark menulin d-flex flex-column justify-content-center align-items-start gap-2';

      let categoryHTML = `
    <a class="text-decoration-none text-black" href="">${category.name}</a>
  `;

      category.subcategories.forEach(subcategory => {
        categoryHTML += `
      <a class="text-decoration-none" href="">${subcategory}</a>
    `;
      });

      categoryDiv.innerHTML = categoryHTML;

      categoriesmenu.appendChild(categoryDiv);
    });

    // console.log(response.data["sections"][4].fcategories[0]);

  } catch (error) {
    console.error('Error fetching body data:', error);
  }
}

let footermenuone = document.getElementById("footermenuone");
let footermenutwo = document.getElementById("footermenutwo");
let footermenuthree = document.getElementById("footermenuthree");
let footermenufour = document.getElementById("footermenufour");

let collapseone = document.getElementById("collapseone");
let collapsetwo = document.getElementById("collapsetwo");
let collapsethree = document.getElementById("collapsethree");
let collapsefour = document.getElementById("collapsefour");
let footerinfo = document.getElementById("footerinfo");

async function fetchFooter() {
  const response = await axios.get('http://localhost:3000/footer');
  response.data.menus[0].links.forEach(element => {
    footermenuone.innerHTML += `
    <a class="text-decoration-none" href="">${element}</a>
    `;

    collapseone.innerHTML += `
    <a class="text-decoration-none" href="">${element}</a>
    `;

  });

  response.data.menus[1].links.forEach(element => {
    footermenutwo.innerHTML += `
    <a class="text-decoration-none" href="">${element}</a>
    `;

    collapsetwo.innerHTML += `
    <a class="text-decoration-none" href="">${element}</a>
    `;
  });

  response.data.menus[2].links.forEach(element => {
    footermenuthree.innerHTML += `
    <a class="text-decoration-none" href="">${element}</a>
    `;

    collapsethree.innerHTML += `
    <a class="text-decoration-none" href="">${element}</a>
    `;
  });

  response.data.menus[3].links.forEach(element => {
    footermenufour.innerHTML += `
    <a class="text-decoration-none" href="">${element}</a>
    `;

    collapsefour.innerHTML += `
    <a class="text-decoration-none" href="">${element}</a>
    `;
  });

  response.data.legalLinks.forEach(element => {
    footerinfo.innerHTML+=`
    <a class="text-decoration-none menulink" href="">${element}</a>
    `;
  });
  // console.log(response.data.legalLinks)
}




function initializeMainSwiper() {
  const progressCircle = document.querySelector(".autoplay-progress svg");
  const progressContent = document.querySelector(".autoplay-progress span");
  new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: { delay: 10000, disableOnInteraction: false },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        progressCircle.style.setProperty("--progress", 1 - progress);
        progressContent.textContent = `${Math.ceil(time / 1000)}s`;
      }
    }
  });
}

function initializeSecondarySwiper() {
  new Swiper(".mySwipertwo", {
    loop: true,
    breakpoints: { /*...*/ }
  });
}

fetchHeader();
fetchBody();
initializeSecondarySwiper(); // If this Swiper has static content
fetchFooter();
let rowData = document.getElementById('rowData');
let searchWord = document.getElementById('searchWord');
let search = document.getElementById('search');

let userPosts = [];

// *********** get Data Movie link ****************
async function getDataMovie (movieCategory)
{
  let response = await fetch (`https://api.themoviedb.org/3/${movieCategory}?api_key=d5547c716b4941d289c01aa48f690c5b`)
  let result = await response.json();
  userPosts = result.results;
  displayItems ()
}
getDataMovie('trending/all/day')

// ************** display Items ****************
function displayItems () {
  var cartona = "";

  for(var i=0 ; i<userPosts.length ; i++)
  {
    let title = userPosts[i].original_title;

    cartona+=
    `
    <div class="col-md-4">
    <div class="movie-item">
      <img src="https://image.tmdb.org/t/p/w500${userPosts[i].poster_path}" class="w-100 pic" alt="cover-Movie">
      <div class="layer">
      <div class="info">
        <h2>${ (title == undefined) ? userPosts[i].original_name : userPosts[i].original_title }</h2>
        <p>${userPosts[i].overview}</p>
        <p>rate : ${userPosts[i].vote_average}</p>
        <p>${userPosts[i].release_date}</p>
      </div>
      </div>
    </div>
  </div>
    `;
  }
  rowData.innerHTML = cartona;
}

// **************** open & close Side Nav bar ****************
$('.open-close').click(function () {
  let currentWidth = $('#BlackNav').outerWidth()
  if($('#whiteNav').css('left') == '0px')
  {
    $('.open-close').addClass('fa-close');
    $('#BlackNav').animate({'left' : currentWidth} , 100);
    $('#whiteNav').animate({'left' : currentWidth} , 100)
    new WOW().init();
  }
  else 
  {
    // $('ul').addClass('zoomOutDown');
    // new WOW().init();
    $('.open-close').removeClass('fa-close');
    $('.open-close').addClass('fa-align-justify');
    $('#BlackNav').animate({'left' : '0px'} , 200);
    $('#whiteNav').animate({'left' : '0px'} , 200)
    
    new WOW().init();
  }
})

// **************** click any item get attr put function getDataMovie ****************
$('.link-movie').click(function () {
  let currentLink = $(this).attr('attrLink');
  getDataMovie (currentLink)
})

// *********** contact Us **************
$('.link-movie').click(function () {
  let currentUrl = $(this).attr('href');
  let currentOffset = $(currentUrl).offset().top;
  $('body,html').animate({scrollTop:currentOffset},500)
})

// ************* Search input number two (search in same Page) ***********
$('#searchWord').blur(function (){
  $('#searchWord').css({'textAlign' : 'left' , 'color' : '#fff'})
})
searchWord.addEventListener('keyup' , getMovies)
function getMovies()
{
  let searchTerm = searchWord.value;
  $('#searchWord').css({'textAlign' : 'left' , 'color' : '#495057'})
  var cartona = "";
  for( var i=0 ; i<userPosts.length ; i++)
  {
    if(userPosts[i].original_title?.toLowerCase().includes(searchTerm.toLowerCase()) || userPosts[i].original_name?.toLowerCase().includes(searchTerm.toLowerCase()))
    {
      let title = userPosts[i].original_title;
      cartona+=
      `
      <div class="col-md-4">
      <div class="movie-item">
        <img src="https://image.tmdb.org/t/p/w500${userPosts[i].poster_path}" class="w-100 pic" alt="cover-Movie">
        <div class="layer">
        <div class="info">
          <h2>${ (title == undefined) ? userPosts[i].original_name : userPosts[i].original_title }</h2>
          <p>${userPosts[i].overview}</p>
          <p>rate : ${userPosts[i].vote_average}</p>
          <p>${userPosts[i].release_date}</p>
        </div>
        </div>
      </div>
    </div>
      `;
    }
  }
  rowData.innerHTML=cartona;
}

// ************* Search input number one (search in ALL Movies) ***********

let posts = [];
async function getDataMovieSearch (word)
{
  let response = await fetch (`https://api.themoviedb.org/3/search/movie?query=${word}&api_key=d5547c716b4941d289c01aa48f690c5b&page=2`)
  let result = await response.json();
  posts = result.results;
  console.log(posts);
  diplayDataSearch()
}

$('#search').blur(function (){
  $('#search').css({'textAlign' : 'left' , 'color' : '#fff'})
})
search.addEventListener('keyup' , function () {
  let searchTerm = search.value;
  $('#search').css({'textAlign' : 'left' , 'color' : '#495057'})
  getDataMovieSearch(searchTerm)
})

function diplayDataSearch()
{
  
  var cartona = "";
  for( var i=0 ; i<posts.length ; i++)
  {
      let title = `https://image.tmdb.org/t/p/w500${posts[i].poster_path}`
      let urlDone =`https://image.tmdb.org/t/p/w500${posts[i].poster_path}`
      cartona+=
      `
      <div class="col-md-4">
      <div class="movie-item">
        <img ${ (title == null) ? src="image/pic.jpg" : `src="${urlDone}"` } class="w-100 pic" alt="cover-Movie">
        <div class="layer">
        <div class="info">
          <h2>${posts[i].original_title}</h2>
          <p>${posts[i].overview}</p>
          <p>rate : ${posts[i].vote_average}</p>
          <p>${posts[i].release_date}</p>
        </div>
        </div>
      </div>
    </div>
      `;
  }
  rowData.innerHTML=cartona;
}

//******************  Rejex Input ******************* */
$('.inputTwo').blur(function (){
  $(this).css({'textAlign' : 'left' , 'color' : '#fff' ,'fontSize' : '17px' ,'fontWeight' : '700'})
})
$('.inputTwo').focus(function () {
  if ( checkVaildFullName () )
  {
    fullNameAlert.classList.add('d-none')
  }
  else
  {
    fullNameAlert.classList.remove('d-none')
  }
})

//---------- userName -------
let fullName =document.getElementById('fullName');
let fullNameAlert = document.getElementById('fullNameAlert');

fullName.addEventListener('input' , checkVaildFullName)
function checkVaildFullName ()
{
  $("#fullName").css({'textAlign' : 'left' })
  var validName = false;
  var fullNameRejex = /^[A-za-z0-9]+$/ 
  if(fullNameRejex.test(fullName.value) == true)
  {
    fullNameAlert.classList.add('d-none')
    validName = true;
  }
  else{
    fullNameAlert.classList.remove('d-none')
    validName = false;
  }
  return validName;
}


//---------- Email -------
let email =document.getElementById('email');
let emailAlert = document.getElementById('emailAlert');

email.addEventListener('input' , checkVaildEmail)
function checkVaildEmail ()
{
  $("#email").css({'textAlign' : 'left' , 'color' : '#495057'})
  var emailRejex = /^[A-Za-z0-9_]{3,20}@[a-zA-Z]{3,10}\.[a-zA-Z]{2,3}$/ 
  if(emailRejex.test(email.value) == true)
  {
    emailAlert.classList.add('d-none')
  }
  else{
    emailAlert.classList.remove('d-none')
  }
}
//---------- phone -------
let phone =document.getElementById('phone');
let phoneAlert = document.getElementById('phoneAlert');

phone.addEventListener('input' , checkVaildphone)
function checkVaildphone ()
{
  $("#phone").css({'textAlign' : 'left' , 'color' : '#495057'})
  var phoneRejex = /^(002|02|010|011|012|015)[0-9]{8}$/ 
  if(phoneRejex.test(phone.value) == true)
  {
    phoneAlert.classList.add('d-none')
  }
  else{
    phoneAlert.classList.remove('d-none')
  }
}

//---------- Age -------
let age =document.getElementById('age');
let ageAlert = document.getElementById('ageAlert');

age.addEventListener('input' , checkVaildAge)
function checkVaildAge ()
{
  $("#age").css({'textAlign' : 'left' , 'color' : '#495057'})
  var ageRejex = /^([1-9][0-9]|100|1)$/ 
  if(ageRejex.test(age.value) == true)
  {
    ageAlert.classList.add('d-none')
  }
  else{
    ageAlert.classList.remove('d-none')
  }
}


//---------- Pass -------
let pass =document.getElementById('pass');
let passAlert = document.getElementById('passAlert');

pass.addEventListener('input' , checkVaildPass)
function checkVaildPass ()
{
  $("#pass").css({'textAlign' : 'left' , 'color' : '#495057'})
  var passRejex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ 
  if(passRejex.test(pass.value) == true)
  {
    passAlert.classList.add('d-none')
  }
  else{
    passAlert.classList.remove('d-none')
  }
}

//-------- Re Pass -------
let rePass =document.getElementById('rePass');
let rePassAlert = document.getElementById('rePassAlert');

rePass.addEventListener('input' , checkVaildRePass)
function checkVaildRePass ()
{
  $("#rePass").css({'textAlign' : 'left' , 'color' : '#495057'})
  if(rePass.value == pass.value)
  {
    rePassAlert.classList.add('d-none')
  }
  else{
    rePassAlert.classList.remove('d-none')
  }
}

//********* wow small screen********* */
window.mobileCheck = function() {
  if(isMobile || isTablet) {
    $('.wow').addClass('wow-removed').removeClass('wow');
  } else {
    $('.wow-removed').addClass('wow').removeClass('wow-removed');
  }
}
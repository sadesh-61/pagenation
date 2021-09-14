var heading=document.createElement("h1");
heading.innerText="pagination";
document.body.append(heading);

//Creating a paragraph tag to contain the users info table
var database = document.createElement("p");
database.setAttribute("id", "demo");
document.body.append(database);

//Pagination container
var container = document.createElement("div");
container.setAttribute("class", "container");
document.body.append(container);

//Creating pagination buttons
var pageNumbers = document.createElement("p");
pageNumbers.setAttribute("class", "pagination");
container.append(pageNumbers);
pageNumbers.innerHTML=" <a href='javascript:change_page(1)' class='pageButton'>&laquo;</a>"+
                        "<a href='javascript:previous_page()' class='pageButton'>Prev</a>"+
                        "<a href='javascript:change_page(1)' class='pageButton active'>1</a>"+
                        "<a href='javascript:change_page(2)' class='pageButton'>2</a>"+
                        "<a href='javascript:change_page(3)' class='pageButton'>3</a>"+
                        "<a href='javascript:change_page(4)' class='pageButton'>4</a>"+
                        "<a href='javascript:change_page(5)' class='pageButton'>5</a>"+
                        "<a href='javascript:change_page(6)' class='pageButton'>6</a>"+
                        "<a href='javascript:change_page(7)' class='pageButton'>7</a>"+
                        "<a href='javascript:change_page(8)' class='pageButton'>8</a>"+
                        "<a href='javascript:change_page(9)' class='pageButton'>9</a>"+
                        "<a href='javascript:change_page(10)' class='pageButton'>10</a>"+
                        "<a href='javascript:next_page()'>Next</a>"+
                        "<a href='javascript:change_page(5)'>&raquo;</a>";

//Initial view button to display first page
var viewButton=document.createElement("h2");
viewButton.innerHTML="<a href='javascript:view()' class='view'>View users list</a>";
document.body.append(viewButton);

/*---------------------------------------------------------------------------------------------*/

//Javascript functions - get user data, display the date according to page numbers

//Getting json data from the link
var request = new XMLHttpRequest();
request.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
var requestdata = [];
request.send();
request.onload = () => {
  requestdata = JSON.parse(request.response);
};

//Initializing some prior variables
var total_users = 100;
var current_page = 1;
var user_per_page = 10;
var number_pages = 10;

//Function to initially view the first page
function view(){
  change_page(1);
  document.querySelector(".view").style.visibility = "hidden";
  document.querySelector(".pagination").style.visibility = "visible"; 
}

//Function to view data respective to page number
function change_page(page) {

    //Highlighting the active page
    var current = document.getElementsByClassName("active");
    if (current.length > 0) { 
        current[0].className = current[0].className.replace(" active", "");
    }    
    var btns = document.querySelectorAll(".pageButton");
    var arr = [...btns];
    arr[page+1].className += " active";


    page= parseInt(page);
    if (page < 1) {
        page = 1;
    }
    if (page > number_pages) {
        page = number_pages;
    }
    
    //Creating a table to view the features of every user in a clear format
    let text =
        "<table class = 'table' border='0'> <thead class='heading'><td><label>#</label></td><td><label>Name</label></td><td><label>Email</label></td></thead>";
    for (let i = (page - 1) * user_per_page;    i < page * user_per_page && i < total_users; i++) {
            text += "<tr><td>"+ 
            requestdata[i].id +
            ".</td><td>" +
            requestdata[i].name +
            "</td><td>" +
            requestdata[i].email.toLowerCase() +
            "</td></tr>";
    }
    text += "</table>";
    document.getElementById("demo").innerHTML = text;
    curent_page = page;
}

//Function to view previous page
function previous_page() {
    
  if (current_page > 1) {
    current_page--;;
    change_page(current_page);
  }
}

//Function to view next page
function next_page() {
  if (current_page < number_pages) {
    current_page++;
    change_page(current_page);
  }
}
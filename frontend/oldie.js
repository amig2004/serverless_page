//prepare object template
var data = {
    "posts": [
        {
            "title":    "Tytuł posta nr1",
            "date":     "2020-03-24",
            "link":     "post-nr1"
        },
        {
            "title":    "Post numer 2",
            "date":     "2020-03-25",
            "link":     "post-nr-2"
        },
        {
            "title":    "Tytuł posta nr 3",
            "date":     "2020-03-26",
            "link":     "post-numer-3"
        }
    ]
}

// testing json api endpoint
var _endpoint = "https://api.npoint.io/a7d7d29d33c1058d36a7";

//div handler
var block = document.getElementById("links")

// table definig hlinks names
var hlinks = ["prod", "test", "funcs", "realm", "exhib", "archive"];

// push a elements containing theese links to main div
for (var i=0; i<hlinks.length; i++){
    console.log("Pushing link: " + hlinks[i]);
    // create temporary element and set up it"s attributes
    let element = document.createElement("a");
    element.setAttribute("href", hlinks[i]);
    element.innerHTML = "Idz do » " + hlinks[i] + "\n";
    //push it to main div
    block.appendChild(element);
}

var block = document.getElementById("posts")

// generating links out of json
for (var i = 0; i < data.posts.length; i++) {
    console.log("JSON object no " + i);
    
    //temporary element
    let element = document.createElement("a");
    element.setAttribute("href", data.posts[i].link);
    element.innerHTML = data.posts[i].date + " » " + data.posts[i].title;
    //push element
    block.appendChild(element)
}

class Post {
    constructor(record){
        //create temporary representation element to operate on
        this.block = document.createElement("div");
        this.fields = {
            "title" : document.createElement("h1"),
            "author" : document.createElement("a"),
            "cats" : document.createElement("a"),
            "date" : document.createElement("h4"),
            "body"  : document.createElement("div")
        }
        this.separator = " - ";

        // pass data from received record to elements
        this.fields.title.innerHTML = record.title;

        this.fields.author.innerHTML = record.author;
        this.fields.cats.innerHTML = record.cats;
        
        // form up h4 containing author, date and categories
        this.fields.date.appendChild(this.fields.author + this.separator +  record.date + this.separator + this.fields.cats);

        this.fields.body.innerHTML = record.body;
        console.log('Post element created: ')
        console.log(this.block)
    }

    // render summary version for main site
    formPost() {
        // append child elemes for "block" temporary element in class
        console.log('Assembling post...')
        this.fields.forEach(
            function(field) {
                console.log('adding element: ' + field)
                this.block.appendChild(field)
            }
        );
    }

    // render whole version for post watchout
    renderPost() {
        return this.block;
    }
}


//listing posts from endpoint
var obtained = fetch(_endpoint)
// fetch promise (?!) object
.then(function(val) {
    return val.json()
})  
// pass json-converted data
.then(function(data) {
    console.log('Data obtained:')
    console.log(data)
    return data;
});

// add it to current DOM
for(var cnt = 0; cnt < data.length; cnt++) {
    let current = new Post(data[i]);
    current.formPost();
    current.renderPost();
}

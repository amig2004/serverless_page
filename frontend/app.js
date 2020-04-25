class Post {
    constructor(title, date, author, category, link, body){
        this.title = title;
        this.date = date;
        this.author = author;
        this.category = category
        this.body = body;
        this.link = link;
    }

    static stripBody(text) {
        // shorten given text value to 300 char or a few more
        console.log('Stripping text')
        // if text is shorter than 300 chars -> return whole
        if (text.length <= 300) {
            return text;
        }
        else if (text[300] == ' ') {
            // if the 300th character is space -> return text slice to 300
            return text.slice(0,300);
        } 
        else {
            let cnt = 300;
            // killswitch -> max 50 chars to avoid inf loop somehow...
            while(cnt < 330) {
                //until space found -> increase counter
                if (text[cnt] == ' ') {
                    return text.slice(0,cnt);
                }
                else {
                    cnt++;
                }
            }
        }        
    }

    // parse given tag and its value into html element
    static parseTag(tag, value) {
        let currElem = document.createElement(tag);
        if (tag == 'img') {
            currElem.src = value;
        }
        else {
            currElem.innerHTML = value;
        }
        
        return currElem;
    }

    // parse json that is being returned from backend into 
    static parseBodyJSON(bodyObj) {
    /*  PROTOTYPE OF BACKEND RETURN
            "body": [
                {"p": "some text"}, -> translates into <p>some text</p>
                {"img": "image.png"}, -> translates into <img src="image.png" />
                {"P": ""},
                {"img": ""}
            ]
            and so on going
        */
        // create root object
        let rootElement = document.createElement('div');
        console.log(bodyObj)
        console.log('Body access: ' + bodyObj.body[0])
        console.log(bodyObj.body[0].p)
        
        // iterate over body 
        // for (let element in bodyObj.body) {
        //     // create html element, based on element key
        //     console.log("Elem: " + element[0])
        //     console.log('New tag: ' + Object.keys(element));
        //     console.log(typeof(element[0]));
        //     console.log('---------------')
            
        //     //let currentElement = this.parseTag(element[0], body[element]);
            
        //     //append element to root
        //     //rootElement.appendChild(currentElement);
        //     }

        for (let j = 0; j < bodyObj.body.length; j++) {
            let tag = Object.keys(bodyObj.body[j]);
            console.log("New tag: " + tag);
            console.log("Tag value : " + bodyObj.body[j][tag])

            let currentElement = this.parseTag(tag, bodyObj.body[j][tag]);

            rootElement.appendChild(currentElement);
            
        }
        

        return rootElement;
    }


    renderShort(){
        // render shorthand version, with usage of onclick events
        let main = document.createElement('div');
        main.classList.add('post');

        // post content fields
        let content = {
            'title': document.createElement('h1'),
            'date' : document.createElement('span'),
            'author' : document.createElement('span'),
            'categories' : document.createElement('span'),
            'body' : document.createElement('div'),
            'link': document.createElement('a')
        };

        // insert classes for styling
        content.title.classList.add('title');   
        content.date.classList.add('date');
        content.author.classList.add('author');
        content.categories.classList.add('category');
        content.body.classList.add('main');
        content.link.classList.add('post-link');
        
        // insert data to temporary object
        content.title.innerHTML = this.title;   
        content.date.innerHTML = this.date;
        content.author.innerHTML = this.author;
        content.categories.innerHTML = this.categories;


        let text = Post.stripBody(this.body[0].p);
        console.log(text);
        console.log(text.length)
        content.body.innerHTML = text;
        
        content.link.innerHTML = 'Czytaj więcej »';
        content.link.href = this.link;


        // summarize data and return prepared object
        for (let section in content) {
            console.log(section);
            console.log(typeof(section));
            main.appendChild(content[section]);
        }
        
        return main
    }

    render(){
        let main = document.createElement('div');
        main.classList.add('post');

        let content= {
            'title': document.createElement('h1'),
            'date' : document.createElement('span'),
            'author' : document.createElement('span'),
            'categories' : document.createElement('span'),
            'body' : document.createElement('div')
        }

        // insert classes for styling
        content.title.classList.add('title');   
        content.date.classList.add('date');
        content.author.classList.add('author');
        content.categories.classList.add('category');
        content.body.classList.add('main');

        // insert data to temporary object
        content.title.innerHTML = this.title;   
        content.date.innerHTML = this.date;
        content.author.innerHTML = this.author;
        content.categories.innerHTML = this.categories;
        content.body.innerHTML = this.body;


        // summarize data and return prepared object
        for (let section in content) {
            main.appendChild(content[section]);
        }
        
        return main
    }
}


class App {
    constructor(){
        // data fetching and access mgmt
        this.endpoint = '';
        this.key = undefined;
        this.error = undefined;

        // DOM declarations 
        this.rootElement = document.getElementById('main');
        this.posts = [];

        // fetch data from backend
        this.fetchData()
    }

    // fetching data from backend
    fetchData() {
        let data = fetch(this.endpoint)

        for(let record in data.posts) {
            this.addPost(record)
        }

    }
    // insert new post object to this.posts table
    addPost(record) {
        this.posts.push(
            new Post(
                record.title,
                record.date,
                record.author,
                record.category,
                record.link,
                record.body
            )
        )
    }

    // empty the root element's innerhtml value
    clearRoot(){
        this.rootElement.innerHTML = '';
    }

    // render list of posts shorthands
    showPostList(){
        // clear root element
        this.clearRoot()
        // for every ppost in list fexecute rendershort method
        for(let j= 0; j<this.posts.length; j++){
            let elem = this.posts[j].renderShort();
            this.rootElement.appendChild(elem);
        }
    }

    // Render single post on website
    showPost(id){
        this.clearRoot()
        this.posts[id].render()
    }
}


window.onload = function() {
    // init app and display post list
    // var app = new App();
    // app.postList();

    // var test = new Post(
    //     'Testing post 1',
    //     '2020-04-19',
    //     'Andrzej',
    //     'testing cat',
    //     'test-link-1',
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec rhoncus sapien, eu commodo tortor. Vestibulum convallis pulvinar metus ut luctus. Aenean commodo ullamcorper lorem ac elementum. Donec maximus urna ut enim blandit dictum tempor sit amet libero. Phasellus pharetra ut lectus quis egestas. Sed viverra porta mauris. Curabitur malesuada egestas lacus, nec cursus nulla viverra id. Maecenas sollicitudin malesuada enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse iaculis, massa fermentum tempus molestie, metus justo cursus sem, vitae viverra risus dolor a libero.Duis accumsan augue enim, et pulvinar turpis tempus tempor. Sed eleifend posuere suscipit. Cras leo lacus, laoreet vel ex at, blandit bibendum nulla. Suspendisse enim urna, pulvinar vel faucibus facilisis, tempor eget nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras bibendum eu leo ac mollis. In at tellus justo. Vivamus quis dui interdum, pharetra ex quis, ullamcorper libero.Pellentesque quis vulputate lectus, eget elementum mi. Curabitur vel diam purus. Donec eget ipsum tortor. Phasellus iaculis eget ante a viverra. Praesent vehicula, enim eget feugiat iaculis, eros eros malesuada ligula, ac porttitor elit tellus ut arcu. Pellentesque eu velit sed elit ornare efficitur sed ut elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum nec aliquam odio. Cras ac nulla nec ipsum aliquam eleifend. Curabitur dignissim vitae mauris quis scelerisque. Duis scelerisque non odio id commodo. Praesent finibus libero sed dui mollis, nec consequat justo egestas. Praesent blandit nunc a blandit efficitur. Donec ullamcorper eget metus non accumsan. Ut pharetra arcu a imperdiet dignissim. Integer eu elit sit amet mi eleifend fermentum.Donec lacinia quis ligula non fermentum. Sed est dolor, porttitor et dignissim a, rhoncus id felis. Aliquam posuere, urna vel egestas dictum, urna lorem bibendum lacus, blandit fermentum sapien erat id magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam quis scelerisque augue. Donec nec elit nec eros cursus accumsan. Phasellus fringilla ex nec fringilla mattis. Nullam dapibus purus at tristique dictum. Fusce feugiat nisi a sagittis pellentesque. Etiam nec aliquet lectus. Sed ut libero vitae eros cursus condimentum at vitae ligula. Fusce auctor nec ante aliquet tristique. Duis nec mauris ac lectus gravida tincidunt vel at sapien. Suspendisse vel fermentum purus. In vel enim elit. ',
        
    // );

    // document.getElementById('main').appendChild(test.renderShort());

    // document.getElementById('main').appendChild(test.render());

    var samepleData = {
        "body" : [
            {"p": "Lorem ipsum"},
            {"img": "test_imt1.png"},
            {"p": "Lorem ipsum 2"},
            {"span": "test span"},
            {"span": "test span1"},
            {"blockquote": "this is testing quote 1. quite logner than usual, right?"},
            {"img": "test_imt2.png"},
        ]
    }


    let sampleRecord = {
        "title": 'Testuje pierwszego posta',
        "date" : " 2020-04-25",
        "author": "Andrzej",
        "category": "Felieton",
        "link": "testuje-pierwszego-posta",
        "body" : [
            {"p": "Lorem ipsum dolor sit amet, that exist in first and testing paragraph, jsut to see if text cutting is correclty set up. Everything should be cut up to a given point when, the length of this text exceeds thershold set up directly in a code. And form of this element should be tested within code."},
            {"img": "test_imt1.png"},
            {"p": "Lorem ipsum 2"},
            {"span": "test span"},
            {"span": "test span1"},
            {"blockquote": "this is testing quote 1. quite logner than usual, right?"},
            {"img": "test_imt2.png"},
        ]
    }

    let sampleRecord1 = {
        "title": 'Testuje drugiego posta',
        "date" : " 2020-04-25",
        "author": "Andrzej",
        "category": "Felieton",
        "link": "testuje-drugiego-posta",
        "body" : [
            {"p": "Lorem ipsum dolor sit amet, that exist in first and testing paragraph, jsut to see if text cutting is correclty set up. Everything should be cut up to a given point when, the length of this text exceeds thershold set up directly in a code. And form of this element should be tested within code."},
            {"img": "test_imt1.png"},
            {"p": "Lorem ipsum 2"},
            {"span": "test span"},
            {"span": "test span1"},
            {"blockquote": "this is testing quote 1. quite logner than usual, right?"},
            {"img": "test_imt2.png"},
        ]
    }


    var app = new App();
    app.addPost(sampleRecord);
    app.addPost(sampleRecord1);

    // console.log(app.posts)
    // let htmobj = app.posts[0].renderShort();

    // app.rootElement.appendChild(htmobj);

    app.showPostList();


    // var parseRes = Post.parseBodyJSON(samepleData);



//     console.log(parseRes)
//     console.log(typeof(parseRes))

//     document.getElementById('main').appendChild(parseRes);

//     console.log('Testing access: ' + Object.keys(samepleData.body[0]))
}
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
            return text + '...';
        }
        else if (text[300] == ' ') {
            // if the 300th character is space -> return text slice to 300
            return text.slice(0,300)+ '...';
        } 
        else {
            let cnt = 300;
            // killswitch -> max 50 chars to avoid inf loop somehow...
            while(cnt < 330) {
                //until space found -> increase counter
                if (text[cnt] == ' ') {
                    return text.slice(0,cnt)+ '...';
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
        console.log('Body access: ' + bodyObj)
        
        
        // iterate over body 
        // for (let element in bodyObj) {
        //     // create html element, based on element key
        //     console.log("Elem: " + element[0])
        //     console.log('New tag: ' + Object.keys(element));
        //     console.log(typeof(element[0]));
        //     console.log('---------------')
            
        //     //let currentElement = this.parseTag(element[0], body[element]);
            
        //     //append element to root
        //     //rootElement.appendChild(currentElement);
        //     }

        for (let j = 0; j < bodyObj.length; j++) {
            let tag = Object.keys(bodyObj[j]);
            console.log("New tag: " + tag);
            console.log("Tag value : " + bodyObj[j][tag])

            let currentElement = this.parseTag(tag, bodyObj[j][tag]);

            rootElement.appendChild(currentElement);
            
        }
        console.log("body root: " + rootElement)
        console.log(rootElement.innerHTML)
        console.log(typeof(rootElement))

        return rootElement.innerHTML;
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
        content.body.innerHTML = Post.parseBodyJSON(this.body);


        // summarize data and return prepared object
        for (let section in content) {
            main.appendChild(content[section]);
        }
        
        return main
    }
}

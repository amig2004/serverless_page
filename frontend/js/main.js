class App {
    constructor(){
        // data fetching and access mgmt
        this.endpoint = '';
        this.key = undefined;
        this.error = undefined;
        this.menu = false;

        // DOM declarations 
        this.rootElement = document.getElementById('main');
        this.posts = [];

        // fetch data from backend
        //this.fetchData()
    }

    // fetching data from backend
    fetchData() {
        let data = fetch(this.endpoint)
    
        // handle server response
        data
            .then(function(response) {
                // format response to json
                return response.json();
            })  
            .then(function(formResp){
                // create posts basing on given response
                for (let record of formResp.posts){
                    this.addPost(record);
                }
            })
            .catch(function(response) {
                return new Error("Server connection error")
            })
            .finally(function(response){
                // potentially turn off loading screen
                // dispaly postList view
                this.showPostList();
            })

    }
    // insert new post object to this.posts table
    addPost(record) {
        this.posts.unshift(
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

    addClickHandler(){

    }

    // Render single post on website
    showPost(id){
        this.clearRoot()
        let elem = this.posts[id].render()
        this.rootElement.appendChild(elem);
    }

}

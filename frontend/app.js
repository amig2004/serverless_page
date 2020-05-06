

window.onload = function() {
    // init app and display post list
    

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
            {"p": "Lorem ipsum dolor sit amet, that exist in first and testing paragraph, jsut to see if text cutting is correclty set up. Everything should be cut up to a given point when, the length of this text exceeds thershold set up directly in a code. And form of this element should be tested within code. Anything that exceeds the threshold should be cut in the main view and showed back again in detailed view. I hope this is ognna work without any problems, right?"},
            {"img": "D:\\projects\\serverless page\\assets\\photo-moto.jpg"},
            {"p": "Lorem ipsum 2 is not as long first para, but still worth to see how does it works..."},
            {"span": "test these one longer span, should be ok"},
            {"span": "test this one shorter span"},
            {"blockquote": "this is testing quote 1. quite logner than usual, right?"},
            {"img": "test_imt2.png"},
        ]
    }


    var app = new App();
    
    // insert data to app strucutre
    app.addPost(sampleRecord);
    app.addPost(sampleRecord1);

    // insert event listeners to post buttons
    // const postBtns = document.getElementsByClassName('post-link');
    // console.log('BTN handlers: ')
    // console.log(postBtns)

    //event listener to detect which post was clicked
    document.addEventListener("click", function(e){
        if (e.target.classList[0] === "post-link") {
            console.log('POST OPENED: ' + e.target.name)
            app.showPost(1)
        }

        else if (e.target.classList[0] === "logo") {
            console.log("MAIN SITE OPENED")
            app.showPostList()
        }
    })

    app.showPostList();


    

// handle menu trigger
const menuTrigger = document.getElementById('trigger');
const menuElement = document.getElementById('idblock');
menuTrigger.addEventListener('click', function() {
    menuElement.classList.toggle('menu-show');
    menuTrigger.classList.toggle('menu-trigger-acitve')
});

}


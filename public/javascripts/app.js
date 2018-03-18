var url = "/";
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
});

primus.on('data', function message(data) {
    // console.log('Received a new message from the server', data);
    var liveBoard = document.querySelector(".emoji__live");
    if(liveBoard){
        console.log(data);
        var emotion = data.emotion;
        var emotionElement = document.querySelector(".emo__"+emotion);
        var zoom = emotionElement.dataset.zoom;
        if(zoom < 500) {
            var newFontPercentage = zoom * 1.04;
            emotionElement.style.fontSize = newFontPercentage + "%";
            emotionElement.dataset.zoom = newFontPercentage;
        }        
    }
});

// clicking on an emoji should send an even to the primus server
if(document.querySelector(".emoji__home")){
    document.querySelector(".emoji__home").addEventListener("click", function(e){
        
        var lastVote = localStorage.getItem("voted");
        if(lastVote){
            var lastVoteDate = new Date(lastVote);
            var now = new Date();
            var diff = parseInt( (now-lastVoteDate) / 1000 / 60 ) ;
            if(diff < 5)
            {
                //return false;
            }
        }
        
        localStorage.setItem('voted', new Date());
        var target = e.target;
        var emotion = target.dataset.emo;
        if(emotion != undefined){
            primus.write({ emotion: emotion });
        }
        e.preventDefault();
    });
}

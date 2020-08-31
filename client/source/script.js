const socket = io();
const cont = document.querySelector('#container');


socket.on('tweet', function (tweet) {
    if (!isReply(tweet.tweet) === true) {
        console.log(tweet);
        var tweetbody = {
            'text': tweet.tweet.text,
            'userScreenName': "@" + tweet.tweet.user.screen_name,
            'userImage': tweet.tweet.user.profile_image_url_https,
            'userDescription': tweet.tweet.user.description,
        };
        try {
            if(tweet.tweet.entities.media[0].media_url_https) {
                tweetbody['image'] = tweet.tweet.entities.media[0].media_url_https;
            }
        } catch(err) { }
        console.log(tweetbody.text);
        var p = document.createElement('p');
        p.innerHTML = tweetbody.text;
        cont.appendChild(p);
    }
});

function isReply(tweet) {
    if ( tweet.retweeted_status
        || tweet.in_reply_to_status_id
        || tweet.in_reply_to_status_id_str
        || tweet.in_reply_to_user_id
        || tweet.in_reply_to_user_id_str
        || tweet.in_reply_to_screen_name )
        return true
}




/*
var socket = io();
var tweetArray = [];
var index = 0;


socket.on('connect', function (data) {
    console.log('connected');
})

const socket = io();
const cont = document.querySelector('#container');


socket.on('tweet', function (tweet) {
    console.log(tweet.tweet);
    var tweetbody = {
        'text': tweet.tweet.text,
        'userScreenName': "@" + tweet.tweet.user.screen_name,
        'userImage': tweet.tweet.user.profile_image_url_https,
        'userDescription': tweet.tweet.user.description,
    }
    try {
        if (tweet.tweet.entities.media[0].media_url_https) {
            tweetbody['image'] = tweet.tweet.entities.media[0].media_url_https;
        }
    } catch (err) {
    }
    tweetArray.unshift(tweetbody);
});


socket.on('allTweet', function (tweet) {
    console.log(tweet);
    tweetArray = tweet;
    loopArray();
});


function loopArray() {
    if (tweetArray.length > index) {
        $(".img-container").removeClass('noimage');
        var currentTweet = tweetArray[index];
        index++;
        $('#user-name').html(currentTweet.userScreenName);
        $('#user-description').html(currentTweet.userDescription);
        $('#content').html(currentTweet.text);
        $("#user-image").attr("src", currentTweet.userImage);
        if (currentTweet.image) {
            $("#image").attr("src", currentTweet.image);
        } else {
            $(".img-container").addClass('noimage');
        }
    } else {
        index = 0;
    }
    setTimeout(loopArray, 10000);
}
*/

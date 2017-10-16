//
// All required modules
var twit = require("twit");
var config = require("./config.js");
var Twitter = new twit(config);
var fs = require('fs');
// 
// post a tweet with media 
// traffic_sign _6.PNG
function TweetTrafficSign(trafficSign){
	
	var b64content = fs.readFileSync('./images/'+trafficSign, { encoding: 'base64' });
	 
	// first we must post the media to Twitter 
	Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
	  // now we can assign alt text to the media, for use by screen readers and 
	  // other text-based presentations and interpreters 
	  var mediaIdStr = data.media_id_string;
	  var altText = "Traffic Sign.";
	  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
	 
	  Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
		if (!err) {
		  // now we can reference the media and post a tweet (media will attach to the tweet) 
		  var params = { status: '#Traffic \n\n #TrafficSign \n\n #LearnTrafficSigns', media_ids: [mediaIdStr] };
	 
		  Twitter.post('statuses/update', params, function (err, data, response) {
			console.log("Tweet Success!");
		  });
		}
	  });
	});
}

setInterval(function(){
	var index = Math.floor(Math.random() * 6) + 1;
	var trafficImage = "traffic_sign _"+index+".PNG";
	TweetTrafficSign(trafficImage);
}, 30*60*1000);
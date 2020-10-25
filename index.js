const Twitter = require('twitter');
const Sheet = require('./sheet')

(async function(){
      // connect to twitter via api  -> enter credentials
      const client = new Twitter({
            consumer_key: 'BNLJPT9yO9Qc1O4YFdWoIZaoQ',
            consumer_secret: '0O9s3HLK2AabbcWuDJNP3eJV5fojNoD3EhrkTSbI7eim4ow241',
            access_token_key: '1319779339022585856-jBorsyKl4gWeXu5TsSbWVZei5OgZaL',
            access_token_secret: 'KHHJDjC9qMJxKu8shzZ9eXMP6yEghTukG8Zn81WTw9tKI'
      });

      // pull next tweet from google spead sheet
      const sheet = new Sheet()
      await sheet.load();
      const quotes = await sheet.getRows();
      console.log(quotes[0].quote)

      //send tweet
      client.post('statuses/update', {status},  function(error, tweet, response) {
         if(error) throw error;
      //    console.log(tweet);  // Tweet body.
      //    console.log(response);  // Raw response object.
      });

      // remove quote from spreadsheet
      await quotes[0].delete()

      // console.log()
})()



// TODO: Generate buttons for array items
$(document).ready(function() {
    var topics = ['Russell Wilson', 'Seahawks', 'Russell Westbrook', 'Seattle Sonics', 'Allen Iverson', 'Boise State', 'Sounders', 'Soccer', 'Cristiano Ronaldo', 'Borussia Dortmund', 'Bayern Munich', 'Manchester United', 'Doug Baldwin', 'Lebron James'];
    function createHtmlButtons() {
        for (let i = 0; i < topics.length; i++) {
            // var buttonDiv = $('<div>').addClass('buttonText')
            var a = $('<button>');
            a.addClass('btn btn-primary btn-lg');
            a.attr('data-name', topics[i]);
            a.attr('id', 'topicButtons');
            a.text(topics[i]);
        
            $('.gifButtonArray').append(a);
            // buttonDiv.append(a);
            // console.log(a);
        }
    }
    createHtmlButtons();

    // TODO: if button clicked for certain GIF type, display 10 GIFs for that category
    $(document).on('click', '#topicButtons', function(event) {
        var searchInput = $(this).attr("data-name");
        // api key used to query the giphy url
        var apiKey = 'Sa76H1kYiJwFnZVm1ICYt8jFr8ukfLKj';
        //query url with apikey, topics array, limit, and rating parameters set
        var queryUrl = 'https://api.giphy.com/v1/gifs/search?q=' + searchInput + '&limit=10&api_key=' + apiKey;
        console.log(queryUrl);
        
        //query the db using above query url
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var data = response.data[i].images;
                var p = $('<p>').css('font-family', '"Poppins", sans-serif').text('Rating: ' + rating);
                var animated = data.fixed_height.url;
                var still = data.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                searchDiv.prepend(p);
                searchDiv.append(image);
                $('#results').prepend(searchDiv);

            }
        })
    })
        
    //function to add input by user into a button
    $('#searchButton').on('click', function(event){
        event.preventDefault();
        //pulls text from input box
        var newCategory = $('#enter-text-box').val().trim();
        
        //adds user input to topics array 
        topics.push(newCategory);
        
        //generates button user input
        createHtmlButtons();
        return false;
    })

    //determines behavior on click of each gif
    $(document).on('click', '.searchImage', function() {
        var state = $(this).attr('data-state'); 
        if (state == 'still') {
            //animates gif if click while still
            $(this).attr('src', $(this).data('animated'));
            $(this).attr('data-state', 'animated');
        } else {
            //makes gif stop animation
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');            
        }
    })

})
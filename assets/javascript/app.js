// TODO: Generate buttons for array items
$(document).ready(function() {
    //array of topics
    var topics = ['Russell Wilson', 'Seahawks', 'Russell Westbrook', 'Seattle Sonics', 'Allen Iverson', 'Boise State', 'Sounders', 'Soccer', 'Cristiano Ronaldo', 'Borussia Dortmund', 'Bayern Munich', 'Manchester United', 'Doug Baldwin', 'Lebron James'];
    function createHtmlButtons() {
        for (let i = 0; i < topics.length; i++) {
            // $('.gifButtonArray').empty();
            var a = $('<button>');
            //add classes and attributes to each button from array
            a.addClass('btn btn-primary btn-lg');
            a.attr('data-name', topics[i]);
            a.attr('id', 'topicButtons');
            a.text(topics[i]);
        
            //append each button from array to the gifButtonArray div
            $('.gifButtonArray').append(a);
            $('#enter-text-box').empty();
        }
    }
    createHtmlButtons();

    // TODO: if button clicked for certain GIF type, display 10 GIFs for that category
    $(document).on('click', '#topicButtons', function(event) {
        $('#results').empty();
        var searchInput = $(this).attr("data-name");
        // api key used to query the giphy url
        var apiKey = 'Sa76H1kYiJwFnZVm1ICYt8jFr8ukfLKj';
        //query url with apikey, topics array, limit, and rating parameters set
        var queryUrl = 'https://api.giphy.com/v1/gifs/search?q=' + searchInput + '&limit=10&api_key=' + apiKey;
        
        //query the db using above query url
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            
            //pan through each query and select data 
            for (let i = 0; i < response.data.length; i++) {
                //builds a bootstrap card and assigns it to a variable
                var rating = response.data[i].rating;
                var data = response.data[i].images;
                var p = $('<p>').css('font-family', '"Poppins", sans-serif').text('Rating: ' + rating);
                var animated = data.fixed_height.url;
                var still = data.fixed_height_still.url;
                //build bootstrap cards for each image, assign individual still and animated properties
                var image = $('<img class="card-img-top">')
                            .attr('src', still)
                            .attr('data-still', still)
                            .attr('data-animated', animated)
                            .attr('data-state', 'still')
                            .addClass('searchImage');

                var searchDiv = $('<div class="card" style="width: 300px;">')
                    .append(image)
                    .append(p);
                    
                $('#results').prepend(searchDiv);

            }
        })
    })
        
    //function to add input by user into a button
    $('#searchButton').on('click', function(event){
        $('.gifButtonArray').empty();
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
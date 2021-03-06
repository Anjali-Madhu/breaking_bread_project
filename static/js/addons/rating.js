var ratingValue;
var postType = -99;
var postId = -99;

$(function(){
  $('form[name=reportRecipe]').submit(function(){
    $.post($(this).attr('action'), $(this).serialize(), function(response) {
     if(response.success) {
        swal("Recipe reported to admin", "We will get back to you soon", "success")
        closeForm();
     }
    }, 'json');
    return false;
  });
});

$(function(){
  $('form[name=reportComment]').submit(function(){
    $.post($(this).attr('action'), $(this).serialize(), function(response) {
     if(response.success) {
        swal("Comment reported to admin", "We will get back to you soon", "success")
        closeForm();
     }
    }, 'json');
    return false;
  });
});

$(document).ready(function(){
  /* 1. Visualizing things on Hover - See next part for action on click */ 
  $('#stars li').on('mouseover', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
   
    // Now highlight all the stars that's not after the current hovered star
    $(this).parent().children('li.star').each(function(e){
      if (e < onStar) {
        $(this).addClass('hover');
      }
      else {
        $(this).removeClass('hover');
      }
    });
    
  }).on('mouseout', function(){
    $(this).parent().children('li.star').each(function(e){
      $(this).removeClass('hover');
    });
  });
  
  
  /* 2. Action to perform on click */
  $('#stars li').on('click', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently selected
    var stars = $(this).parent().children('li.star');
    
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
    
    // JUST RESPONSE (Not needed)
    ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
    console.log(ratingValue);
    var msg = "";
    if (ratingValue > 1) {
        msg = "Thanks! You rated this " + ratingValue + " stars.";
        console.log(msg);
    }
    else {
        msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
        console.log(msg);
    }
    responseMessage(msg);
    
  });
  
      
  
});


function responseMessage(msg) {
  $('.success-box').fadeIn(200);  
  $('.success-box div.text-message').html("<span>" + msg + "</span>");
}

function addReview(recipeId) {
  var message =  $('#message').val();
  //  call uploadrecipe url in django
   $.ajax({
    url: '/breakingbread/reviews/' + recipeId,
    data: {
        'message' : message,
        'rating' : ratingValue
    },
    dataType: 'json',
    success: function (data) {
        if(data.success) {
          location.reload();
        }

      }
});
}
//Report section

//open report popup
function openForm(type,id){
  
  postType = type;
  postId = id;
  if(postType==0)
      {document.getElementById("reportForm").style.display = "block";}
  else
      {document.getElementById(postId).style.display = "block";}
}

// close report popup
function closeForm() {
    if(postType==0)
      {document.getElementById("reportForm").style.display = "none";}
  else
      {document.getElementById(postId).style.display = "none";}
  
}





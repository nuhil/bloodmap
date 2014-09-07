Parse.initialize("kZ6KW0ZZud5ZY8l6qBwJphHV6rBwzzhiHEwS9TV7", "wKyOvv9aL3Yg7kBwmWfIYlWFHIBSA9aosK1Bf3CP");

$(document).ready(function () {
	var currentUser = Parse.User.current();
	if (currentUser) {
	    console.log(currentUser);
	    $('#fetchedEmail').html(currentUser.get('email'));
	    $('.bloodmap-sign-box').hide();
	} else {
	    console.log(currentUser);
	    $('.bloodmap-profile').hide();
	    $('.bloodmap-sign-box').show();
	}

	$('#sign-up-form').bootstrapValidator().on('success.form.bv', function(e) {
        // Prevent submit form
        e.preventDefault();
        var $form     = $(e.target);
        var email = $('#signup-email').val();
        var username = $('#signup-email').val();
        var password = $('#signup-password').val();

        var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", email);
		 
		user.signUp(null, {
		  success: function(user) {
		    console.log("Success: " + user.id);
		    $form.find('.alert').removeClass().addClass('alert alert-success').html('সাইন আপ সম্পন্ন হয়েছে। এখন পাসের ট্যাবে সাইন ইন করতে পারেন!').show();
		  },
		  error: function(user, error) {
		  	$form.find('.alert').removeClass().addClass('alert alert-danger').html('কিছু একটা সমস্যা হয়েছে। ভিন্ন তথ্য দিয়ে আবার চেষ্টা করুন').show();
		    console.log("Error: " + error.code + " " + error.message);
		  }
		});
    });

	$('#sign-in-form').bootstrapValidator().on('success.form.bv', function(e) {
        // Prevent submit form
        e.preventDefault();
        var $form     = $(e.target);
        var email = $('#email').val();
        var password = $('#password').val();

		Parse.User.logIn(email, password, {
		  success: function(user) {
		    console.log(user);
		    $form.find('.alert').removeClass().addClass('alert alert-success').html('সাইন ইন সম্পন্ন হয়েছে।').show();
		    location.reload();
		  },
		  error: function(user, error) {
		    console.log("Error: " + error.code + " " + error.message);
		    $form.find('.alert').removeClass().addClass('alert alert-danger').html('কিছু একটা সমস্যা হয়েছে। ভিন্ন তথ্য দিয়ে আবার চেষ্টা করুন').show();
		  }
		});
    });

    $('#sign-out').click (function () {
    	Parse.User.logOut();
    	if(Parse.User.current() == null) {
    		$('.bloodmap-profile').hide('slow');
    		$('.bloodmap-sign-box').show();
    	}
    });
});

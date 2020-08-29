$(document).ready(function() {
   
    //Login handler
    $("#loginButton").on("click", function(ev) {
        ev.preventDefault();     
        var loginUserName = $("#signinUsername").val().trim();
        var loginPass = $("#signinPassword").val().trim();  
        var errDiv = $("#loginErr");        
        
        let loginUser = {
            user_name: loginUserName,
            password: loginPass
        }
              
        $.post("/api/login", loginUser)
            .then((res) => {
            
              window.location.replace("/library");
              // If there's an error, log the error
            })
            .catch(err => {
              console.log(err);
              errDiv.empty();
                $(errDiv.append('<p class="loginErrorDiv">Error logging in - Username or password incorrect</p>'));
            })       
    });
    
    
    //New User submit in modal
    $("#newUserSubmit").on("click", function(ev) {
        ev.preventDefault();
        
        //Grab input fields
        var userName = $("#userName").val().trim();
        var password = $("#password").val().trim();
        var firstName = $("#firstName").val().trim();
        var lastName = $("#lastName").val().trim();
        //var secAnswer = $("#secAnswer").val().trim();
        
        var signUpBody = $("#signupErr");

        if (userName.length < 5 || userName.length > 20) {
            signUpBody.empty();
            $(signUpBody.append('<p style="color: red; text-align: left;">Username must be between 5 and 20 characters</p>'));
        } else if(password.length < 8){
            signUpBody.empty();
            $(signUpBody.append('<p style="color: red; text-align: left;">Password should be at least 8 characters</p>'));
        } else if (firstName.length === 0) {
            signUpBody.empty();
            $(signUpBody.append('<p style="color: red; text-align: left;">Sorry first name cannot be empty</p>'));  
        } else if (lastName.length ===0){
            signUpBody.empty();
            $(signUpBody.append('<p style="color: red; text-align: left;">Sorry last name cannot be empty</p>'));
        } 

        //lines 69 to 72 are for the forgot password functionality
        // else if (secAnswer.length === 0) {
        //     signUpBody.empty();
        //     $(signUpBody.append('<p style="color: red; text-align: left;">Sorry the security question answer cannot be empty</p>'));
        // }
        
        var newUser = {
            user_name: userName,
            password: password,
            first_name: firstName,
            last_name: lastName,
            //security_answer: secAnswer
        }
        
        //Send new user info to the api route
        $.ajax({
            method: "POST",
            url: "/api/users/",
            data: newUser
          }).then(function(data) {
              console.log(data);
              console.log("Succesfully created new user!");
              location.reload();
            }).catch(function(err) {
                //console.log(err);
                var errCode = err.responseJSON.original.code;
                if (errCode === "ER_DUP_ENTRY") {
                    signUpBody.empty();
                    $(signUpBody.append('<p style="color: red; text-align: left;">Username must be unique</p>'));
                }   
            });       
            
            
        //Clear input fields
        $("#userName").val("");
        $("#password").val("");
        $("#firstName").val("");
        $("#lastName").val("");
        //$("#secAnswer").val("");   
    });

    // event handler to add new book
    $("#addNewBook").on("click", function(ev) {
        ev.preventDefault();
        console.log("new book add")
        let bookTitle = $("#bookTitle").val().trim();
        let authorName = $("#bookAuthor").val().trim();
        let bookLink = $("#bookLink").val().trim();
           
        
        var newBook = {
            book_title: bookTitle,
            author: authorName,
            book_link: bookLink
        }
        
        //Send new user info to the api route
        $.ajax({
            method: "POST",
            url: "/api/library",
            data: newBook
          }).then(function(data) {
            location.reload();
            });
            
            
        //Clear input fields
        $("#bookTitle").val("");
        $("#bookAuthor").val("");
        $("#bookLink").val("");        
    });
    
    
    //Event handler to delete book
    $(".deleteBook").on("click", function (ev) {
        ev.preventDefault();
        let id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/library/" + id
        }).then(function(){
            location.reload();
        })
        
    });

    // event handler for deletiing the account
    $(".deleteAccountBtn").on("click", function(ev){
        ev.preventDefault();     

        let id =$(this).data("id")
    
        $.ajax({
            method: "DELETE",
            url: "/api/users"
        }).then(function(data){
            window.location.replace("/logout");
        });
        
    });

    //Event handler to edit book
    $(".editBookBtn").on("click", function(ev) {
        ev.preventDefault();
        let id = $(this).data("id");

        let bookTitle = $("#bookTitle" + id).val().trim();
        let authorName = $("#bookAuthor" + id).val().trim();
        let bookLink = $("#bookLink" + id).val().trim();

        var updatedBook = {
            book_title: bookTitle,
            author: authorName,
            book_link: bookLink
        }

        $.ajax({
            method: "PUT",
            url: "api/users/" + id,
            data: updatedBook
            }).then(function(data){

            location.reload();
        });

        $("#bookTitle" + id).val("");
        $("#bookAuthor" + id).val("");
        $("#bookLink" + id).val("");
    })
  
});

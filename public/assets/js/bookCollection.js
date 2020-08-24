$(document).ready(function() {

    //Login info
    $("#loginButton").on("click", function(ev) {
        ev.preventDefault();     
        var loginUserName = $("#signinUsername").val().trim();
        var loginPass = $("#signinPassword").val().trim();  
        
        
        let loginUser = {
            user_name: loginUserName,
            password: loginPass
        }
        
        
        $.post("/api/login", loginUser)
            .then(() => {
              window.location.replace("/library");
              // If there's an error, log the error
            })
            .catch(err => {
              console.log(err);
            });
        
    });
    
    
    $.get("/api/user_data").then(data => {
        $(".member-name").text(data.email);
      });
    
    
    //New User submit in modal
    $("#newUserSubmit").on("click", function(ev) {
        ev.preventDefault();
        
        //Grab input fields
        var userName = $("#userName").val().trim();
        var password = $("#password").val().trim();
        var firstName = $("#firstName").val().trim();
        var lastName = $("#lastName").val().trim();
        
        var newUser = {
            user_name: userName,
            password: password,
            first_name: firstName,
            last_name: lastName
        }
        
        //Send new user info to the api route
        $.ajax({
            method: "POST",
            url: "/api/users/",
            data: newUser
          }).then(function(data) {
              console.log("Succesfully created new user!");
              location.reload();
            });           
            
        //Clear input fields
        $("#userName").val("");
        $("#password").val("");
        $("#firstName").val("");
        $("#lastName").val("");   
    });

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
    
    
    //Login User and Password
    $("#loginButton").on("click", function(ev) {
        ev.preventDefault();
        
        //Grab input fields
        var userName = $("#signinUsername").val().trim();
        var password = $("#signinPassword").val().trim();
        
        var user = {
            user_name: userName,
            password: password,
        }
        
        //Send new user info to the api route
        $.ajax({
            method: "GET",
            url: "/api/users/",
            data: user
          }).then(function(data) {
              console.log("Signing in!");
            });   
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


    //Event handler to edit book
    $(".editBookBtn").on("click", function(ev) {
        ev.preventDefault();
        let id = $(this).data("id");

        let bookTitle = $("#bookTitle" + id).val().trim();
        let authorName = $("#bookAuthor" + id).val().trim();
        let bookLink = $("#bookLink" +id).val().trim();

        var updatedBook = {
            book_title: bookTitle,
            author: authorName,
            book_link: bookLink
        }

        $.ajax({
            method: "PUT",
            url: "api/library/" + id,
            data: updatedBook
            }).then(function(data){

            location.reload();
        });

        $("#bookTitle" + id).val("");
        $("#bookAuthor" + id).val("");
        $("#bookLink" + id).val("");
    })

   
});

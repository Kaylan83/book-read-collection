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
                $.ajax({
                    method: "GET",
                    url: "/api/library",
                }).then(function(data) {
                    console.log("Book library data" , data);
                }); 
                        })
                        .catch(err => {
                        console.log(err);
                        });
                
                
              window.location.replace("/library");
              // If there's an error, log the error
              //Get call for the library list
            
        
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
        var bookTitle = $("#bookTitle").val().trim();
        var authorName = $("#bookAuthor").val().trim();
        var bookLink = $("#bookLink").val().trim();
        
        
        
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
    
    
    

   
});

$(document).ready(function() {
    
    
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
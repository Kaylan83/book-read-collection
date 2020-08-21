$(document).ready(function() {
    
    
    //New User submit in modal
    $("#newUserSubmit").on("click", function(ev) {
        ev.preventDefault();
        console.log("ner user click")
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
            });
            
            
        //Clear input fields
        $("#userName").val("");
        $("#password").val("");
        $("#firstName").val("");
        $("#lastName").val("");
            
    });
    
    

    
});
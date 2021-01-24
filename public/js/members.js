$(document).ready(function () {
    // Toggle the side navbar
    $(".sidenav").sidenav();

    // Toggle Dark mode
    $(".switch label input").change(function () {
        if (this.checked) {
            // Dark Mode ON
            $("body").css("background-color", "#212121");
            $("body").css("color", "white");
            $("#nav-mobile").css("background-color", "#000000");
            $("#searchBarDiv input").removeClass("white");
            $("#searchBarDiv input").addClass("black");
            $("#searchBarDiv button i").removeClass("grey-darken-3-text");
            $("#searchBarDiv button i").addClass("white-text");
            $("#logo span").removeClass("black-text");
            $("#logo span").addClass("white-text");
            $("#nav-mobile li h5").removeClass("black-text");
            $("#nav-mobile li h5").addClass("white-text");
            $("#nav-mobile li h6").removeClass("black-text");
            $("#nav-mobile li h6").addClass("white-text");
            $("#nav-mobile li a").removeClass("black-text");
            $("#nav-mobile li a").addClass("white-text");
            $(".switch label").removeClass("black-text");
            $(".switch label").addClass("white-text");
            $("#navLinks li a").removeClass("black-text");
            $("#navLinks li a").addClass("white-text");
            $(".sidenav-trigger i").removeClass("black-text");
            $(".sidenav-trigger i").addClass("white-text");
        } else {
            // Dark Mode OFF
            $("body").css("background-color", "#f5f5f5");
            $("body").css("color", "#424242");
            $("#nav-mobile").css("background-color", "#bbdefb");
            $("#searchBarDiv input").removeClass("black");
            $("#searchBarDiv input").addClass("white");
            $("#searchBarDiv button i").removeClass("white-text");
            $("#searchBarDiv button i").addClass("grey-darken-3-text");
            $("#logo span").removeClass("white-text");
            $("#logo span").addClass("black-text");
            $("#nav-mobile li h5").removeClass("white-text");
            $("#nav-mobile li h5").addClass("black-text");
            $("#nav-mobile li h6").removeClass("white-text");
            $("#nav-mobile li h6").addClass("black-text");
            $("#nav-mobile li a").removeClass("white-text");
            $("#nav-mobile li a").addClass("black-text");
            $(".switch label").removeClass("white-text");
            $(".switch label").addClass("black-text");
            $("#navLinks li a").removeClass("white-text");
            $("#navLinks li a").addClass("black-text");
            $(".sidenav-trigger i").removeClass("white-text");
            $(".sidenav-trigger i").addClass("black-text");
        }
    });


    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.email);
    });


})

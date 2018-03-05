(function () {

    if (!IsLogin()) {
        console.log("no login");
        window.location.href = window.pageRoot+"/login.html";
    };
    console.log("login");
})();
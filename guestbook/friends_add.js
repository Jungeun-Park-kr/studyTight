function showAddfriendsPopup() {
    var popupWidth = 500;
    var popupHeight = 400;
    var popupX = (document.body.offsetWidth / 2) - (popupWidth / 2);
    var popupY = (document.body.offsetHeight / 2) - (popupHeight / 2);
    var url = "friends_add.html";
    var name = "friends add popup"
    var option = "width =" + popupWidth + ", height =" + popupHeight + ", left" + popupX + ", top=" + popupY + "";
    window.open(url, name, option);
}

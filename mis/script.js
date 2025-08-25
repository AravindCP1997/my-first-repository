function showOrHide(){
    var header = event.target.parentElement;
    var hidebutton = event.target;
    var subtotal = event.target.previousElementSibling;
    var content = header.nextElementSibling;
    if (content.style.display == 'none'){
        content.style.display = 'flex';
        subtotal.style.opacity = 0;
        hidebutton.innerText = '-'
    } else {
        content.style.display = 'none';
        subtotal.style.opacity = 1;
        hidebutton.innerText = '+'
    };
}
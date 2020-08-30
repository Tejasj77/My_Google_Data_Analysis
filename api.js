const bt = document.querySelector('naav');
document.addEventListener('click',function(){
    console.log("We are here");
    let insta = fetch('Installs.json');
    console.log(insta);

})

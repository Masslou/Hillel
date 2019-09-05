const btn = document.getElementById('addBtn');
const div = document.getElementById('div');
const list = document.querySelectorAll('#list > li');

document.querySelector('#list > li').addEventListener('click', onBtnClick);

btn.addEventListener('click', onBtnClick);

function onBtnClick(e) {
    console.log('clicked', e, this);
    e.target.classList.toggle('clicked');
}


function onDivClick(e) {
    console.log('div',e.target, this)
}


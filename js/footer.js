// add dynamically updating year to footer
function todaysDate() {
    const d = new Date().getFullYear();
    document.getElementById('current-year').textContent = d;
}

todaysDate();
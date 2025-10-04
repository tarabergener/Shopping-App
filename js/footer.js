function todaysDate() {
    const d = new Date().getFullYear();
    document.getElementById('current-year').textContent = d;
}

todaysDate();
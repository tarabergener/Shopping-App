function changeLoginStatus() {
    const loggedin = true;
    const account_name = "Isaac";

    const nav = document.getElementById("account-links");

    if(loggedin) {
        nav.innerHTML = `
            <a title="Click to manage account" href="/account/">
             Welcome, ${account_name}!
            </a>
            <a title="Click to logout" href="/account/logout">Logout</a>
        `;
    } else {
        nav.innerHTML = `
            <a title="Click to logout" href="/account/login">My Account</a>
        `;
    }
}
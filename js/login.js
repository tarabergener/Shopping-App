// Change login status from loggedin to loggedout
function changeLoginStatus() {
    const loggedin = true;
    const account_name = "Isaac"; // test variable

    const nav = document.getElementById("account-links");
    // if loggedin show 'Account' pathand change login to logout
    if(loggedin) {
        nav.innerHTML = `
            <a title="Click to manage account" href="/account/">
             Welcome, ${account_name}!
            </a>
            <a title="Click to logout" href="/account/logout">Logout</a>
        `;
    } else { // else no Account link and button reads login
        nav.innerHTML = `
            <a title="Click to logout" href="/account/login">My Account</a>
        `;
    }
}
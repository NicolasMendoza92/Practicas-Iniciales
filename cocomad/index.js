function navbarMenu() {
    let x = document.getElementById("myNavbar");
    if (x.className === "barranav") {
      x.className += " responsive";
    } else {
      x.className = "barranav";
    }
  }
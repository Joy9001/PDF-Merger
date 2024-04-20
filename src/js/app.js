let navLinks = document.querySelectorAll(".nav_link");

navLinks.forEach((element) => {
    element.addEventListener("click", () => {
        let currActive = document.querySelector('.nav_link.active');
        if (currActive) {
            currActive.classList.remove('active');
        }
    })
});

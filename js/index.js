const panels = document.querySelectorAll('.panel') // panels for featured recipes

// display each panel
panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active') // change active status to panel that is selected
    })
})

// remove active status from previous panel
function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}
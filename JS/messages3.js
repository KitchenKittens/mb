//36人分の変数を宣言（ループで）
const people = [];
for (let i=1; i<=36; i++){
    const person = {
        id: i.toString(),
        modalId: `easyModal${i}`,
        closeClass: `Close${i}`
    };

    people.push(person);
}

// Function to handle modal open
function modalOpen(modal) {
    modal.style.display = 'block';
}
  
// Function to handle modal close
function modalClose(modal) {
modal.style.display = 'none';
}
  
// Function to handle outside click to close modal
function outsideClose(e, modal) {
if (e.target === modal) {
    modalClose(modal);
}
}
  
// Iterate over the people array
people.forEach(person => {
    // Get the elements based on the person's ID
    const buttonOpen = document.getElementById(`modalOpen${person.id}`);
    const modal = document.getElementById(person.modalId);
    const buttonClose = document.getElementsByClassName(person.closeClass)[0];

    // Add event listeners for opening and closing the modal
    buttonOpen.addEventListener('click', () => {
        modalOpen(modal);
    });

    buttonClose.addEventListener('click', () => {
        modalClose(modal);
    });

    // Add event listener for closing the modal when clicking outside
    document.addEventListener('click', (e) => {
        outsideClose(e, modal);
    });
});
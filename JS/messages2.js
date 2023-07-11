//Each person
const people = [
    {id: "1", modalId:"easyModal1", closeClass: "Close1"},
    {id: "2", modalId:"easyModal2", closeClass: "Close2"},
    {id: "3", modalId:"easyModal3", closeClass: "Close3"},
    {id: "4", modalId:"easyModal4", closeClass: "Close4"},
    {id: "5", modalId:"easyModal5", closeClass: "Close5"},
    {id: "6", modalId:"easyModal6", closeClass: "Close6"},
    {id: "7", modalId:"easyModal7", closeClass: "Close7"},
    {id: "8", modalId:"easyModal8", closeClass: "Close8"},
    {id: "9", modalId:"easyModal9", closeClass: "Close9"},
    {id: "10", modalId:"easyModal10", closeClass: "Close10"},
    {id: "11", modalId:"easyModal11", closeClass: "Close11"},
    {id: "12", modalId:"easyModal12", closeClass: "Close12"},
    {id: "13", modalId:"easyModal13", closeClass: "Close13"},
    {id: "14", modalId:"easyModal14", closeClass: "Close14"},
    {id: "15", modalId:"easyModal15", closeClass: "Close15"},
    {id: "16", modalId:"easyModal16", closeClass: "Close16"},
    {id: "17", modalId:"easyModal17", closeClass: "Close17"},
    {id: "18", modalId:"easyModal18", closeClass: "Close18"},
    {id: "19", modalId:"easyModal19", closeClass: "Close19"},
    {id: "20", modalId:"easyModal20", closeClass: "Close120"},
    {id: "21", modalId:"easyModal21", closeClass: "Close21"},
    {id: "22", modalId:"easyModal22", closeClass: "Close22"},
    {id: "23", modalId:"easyModal23", closeClass: "Close23"},
    {id: "24", modalId:"easyModal24", closeClass: "Close24"},
    {id: "25", modalId:"easyModal25", closeClass: "Close25"},
    {id: "26", modalId:"easyModal26", closeClass: "Close26"},
    {id: "27", modalId:"easyModal27", closeClass: "Close27"},
    {id: "28", modalId:"easyModal28", closeClass: "Close28"},
    {id: "29", modalId:"easyModal29", closeClass: "Close29"},
    {id: "30", modalId:"easyModal30", closeClass: "Close30"},
    {id: "31", modalId:"easyModal31", closeClass: "Close31"},
    {id: "32", modalId:"easyModal32", closeClass: "Close32"},
    {id: "33", modalId:"easyModal33", closeClass: "Close33"},
    {id: "34", modalId:"easyModal34", closeClass: "Close34"},
    {id: "35", modalId:"easyModal35", closeClass: "Close35"},
    {id: "36", modalId:"easyModal36", closeClass: "Close36"}
];

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
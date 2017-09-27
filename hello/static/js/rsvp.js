function initializeInputs(){
  Array.from(document.getElementsByClassName('input_box')).forEach(element => {
    element.onblur = event => {
      let parent = event.target.parentNode;
      if (event.target.value && !parent.classList.contains('input_filled')) {
        parent.classList.add('input_filled')
      } else {
        parent.classList.remove('input_filled')
      }
    }
  })
}

function initializeRadioButtons(){
  Array.from(document.getElementsByClassName('radio_label')).forEach(element => {
    element.onclick = event => {
      event.target.previousElementSibling.checked = true
    }
  })
}

function submit(){
  const name = document.getElementById('first_name').value +
               document.getElementById('last_name').value

  const available = document.getElementById('availability_no').checked ? 'no' : 'yes'
  let food;

  if (document.getElementById('food_chicken')){
    food = 'chicken'
  } else if (document.getElementById('food_fish')){
    food = 'fish'
  } else {
    food = 'steak'
  }

  fetch('/rsvp', { method: 'POST', body:`${name}, ${available}, ${food}`})
    .then(response => {
      if (response.status > 200 || response.status < 300){
        if (available === 'no'){
          console.log("We're so sorry you won't be able to join us, thank you for letting us know.")
        } else {
          console.log("Thank you for deciding to join us in our celebration")
        }
      } else {
        console.log('Fuuuuuuck')
      }
    })
}

window.onload = () => {
  initializeInputs()
  initializeRadioButtons()
  document.getElementById('submit').onclick = submit
}

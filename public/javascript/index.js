const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {

  document.getElementById('fetch-all').addEventListener('click', function getAllCharactersFromApi () {
    charactersAPI.getFullList()
    .then(res => {
      let allCharacters = res.data;
      
      allCharacters.forEach(character => {


        let cardToClone = document.querySelector(".character-card").cloneNode(true);

        let placeToCloneCard = document.querySelector(".screen-info");
        placeToCloneCard.appendChild(cardToClone);


        cardToClone.querySelector(".name").textContent = character.name;
        cardToClone.querySelector(".occupation").textContent = character.occupation;
        if (character.cartoon === true) {
          cardToClone.querySelector(".cartoon").textContent = "Yes";
        } else {
          cardToClone.querySelector(".cartoon").textContent = "Nope";
        }
        cardToClone.querySelector(".weapon").textContent = character.weapon;
      });

      })

  });






  document.getElementById('fetch-one').addEventListener('click', function getOneCharacterFromApi () {
    
    let id = document.querySelector(".operation input").value
    
    charactersAPI.getOneRegister(id)
    
    .then(res => {
      let chosenCharacter = res.data;

        document.querySelector(".name").textContent = chosenCharacter.name;
        document.querySelector(".occupation").textContent = chosenCharacter.occupation;
        if (chosenCharacter.cartoon === true) {
          document.querySelector(".cartoon").textContent = "Yes";
        } else {
          document.querySelector(".cartoon").textContent = "Nope";
        }
        document.querySelector(".weapon").textContent = chosenCharacter.weapon;
    })
  })






  document.getElementById('delete-one').addEventListener('click', function deleteCharacterFromApi () {

    let id = document.querySelector(".delete input").value
    
    charactersAPI.deleteOneRegister(id)
      .then(document.querySelector(".delete-one").setAttribute('class','background-green'))
      .catch(
        (error) => {
          console.log(error)
          document.querySelector("#delete-one").setAttribute('class','background-red')
        }
        )

  });





  document.getElementById('new-character-form').addEventListener('submit', function createCharacterFromApi (e) {

        e.preventDefault();

        let inputs = document.querySelectorAll(".field input")

        let name = inputs[0].value
        let occupation = inputs[1].value
        let weapon = inputs[2].value
        let cartoon = inputs[3].checked

        console.log(cartoon)


        charactersAPI.createOneRegister({name, occupation, weapon, cartoon})
          .then(res => {
            document.getElementById('new-character-form').reset()
          })
          .catch(err => console.log(err))

  });






  document.getElementById('edit-character-form').addEventListener('submit', function editCharacterFromApi (e) {

    e.preventDefault();     

        let inputs = document.querySelectorAll(".update-field input")

        let id = inputs[0].value
        let name = inputs[1].value
        let occupation = inputs[2].value
        let weapon = inputs[3].value
        let cartoon = inputs[3].checked

        let info = {name, occupation, weapon, cartoon}

        console.log(info);

        charactersAPI.updateOneRegister(id, info)
          .then(res => {
            document.querySelector("#send-data-update").setAttribute('class','background-green2');
            document.getElementById('edit-character-form').reset()
          })
          .catch((error) => {
            console.log(error)
            document.querySelector("#send-data-update").setAttribute('class','background-red2')
          })

  });



  document.querySelector('.ipad-home-btn').addEventListener('click', function(){
    document.querySelector('.ipad-screen').setAttribute('class', 'home-screen') 
  })

  document.querySelector('#ipadscreen').addEventListener('click', function() {
    document.querySelector('#ipadscreen').removeAttribute('class', 'home-screen')
    document.querySelector('#ipadscreen').setAttribute('class', 'ipad-screen')

  })






});
  
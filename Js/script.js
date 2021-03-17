let btn = document.getElementById('btn')
let chang = document.getElementById('chng')
let add = document.getElementById('add')
let chosen = document.getElementById('chosen')

let count = true
const favorites = []

chosen.onchange = () => {
    let city = document.getElementById('getCity')
    
    var selectedOption = chosen.options[chosen.selectedIndex];
    city.value = selectedOption.text
}

add.onclick = () => {
    var text = document.getElementById('getCity').value;
    var value = document.getElementById('getCity').value;

    var newOption = new Option(text, value);
    if(!favorites.includes(text) && text != ''){
        favorites.push(text)
        chosen.options[chosen.options.length]=newOption;
    }
}

btn.onclick = () => {
    let city = document.getElementById('getCity').value

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c5ebacb75f4fe7205f532ee7f9cc0fdf`)
    .then((resp) => {
        return resp.json()
    })
    .then((data) => {
        console.log(data);

        let grad = (data.main.temp - 273)
        let faren = (grad - 32)/9*5

        document.querySelector('.city').textContent = data.name;

        if(count){
            document.querySelector('.temp').innerHTML = Math.round(grad) + '&deg;';
        }else{
            document.querySelector('.temp').innerHTML = Math.round(faren) + '&deg;F';
        }

        document.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`
    
        chang.onclick = () => {
            count = !count
            if(count){
                document.querySelector('.temp').innerHTML = Math.round(grad) + '&deg;';
            }else{
                document.querySelector('.temp').innerHTML = Math.round(faren) + '&deg;F';
            }
        }
    })
    .catch((err) => {
        console.log(err);
        document.querySelector('.city').textContent = 'City';
        document.getElementById('getCity').value = "City not found!"
    })
}

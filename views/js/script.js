//When the page loads, it refreshes all the input fields
window.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        input.value = ''
    });
});


// const centerCol = document.querySelector('.center-col')
// const homeBtns = centerCol.querySelectorAll('button')
// const register = document.getElementById('register')
// const logIn = document.getElementById('log-in')


// const registerCol = document.querySelector('.col-left')
// const logInCol = document.querySelector('.col-right')

// const showMenu = (e) => {
//     const btn = e.target

//     if (btn === register) {
//         registerCol.classList.add('active')
//         centerCol.style.transform = 'scale(0)'
//     }

//     if (btn === logIn) {
//         logInCol.classList.add('active')
//         centerCol.style.transform = 'scale(0)'
//     }
// }

// homeBtns.forEach(btn => {
//     btn.addEventListener('click', showMenu)
// });

// const closeMenu = () => {
//     logInCol.classList.remove('active')
//     registerCol.classList.remove('active')
//     centerCol.style.transform = 'scale(1)'
// }

// const closeBtn = document.querySelectorAll('.fa-times')
// closeBtn.forEach(btn => {
//     btn.addEventListener('click', closeMenu)
// })


//Open Weather Map Api
const API_KEY = '91df9304e3bf55afa8fdc7beb778a94b'
const searchBar = document.getElementById('search-bar')
const searchBtn = document.getElementById('search-city')
const fiveDayBtn = document.querySelector('.five-day-btn')


const getWeatherData = async (city) => {
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`)
    const data = await resp.json()
    return data
}

getWeatherData()


const fiveDayWeather = async (city) => {
    const url = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
    const dataFiveDay = await url.json()
    return dataFiveDay

}
fiveDayWeather()

displayweatherData = (city) => {
    console.log(city)
    const countryName = city.name
    const country = city.sys.country
    const imageName = city.weather[0].icon;
    const weatherDeg = Math.round(city.main.temp)
    const description = city.weather[0].description
    const wind = city.wind.speed
    const pressure = city.main.pressure
    const humidity = city.main.humidity
    const minTemp = city.main.temp_min
    const maxTemp = city.main.temp_max
    document.querySelector('.container-mine h3').innerHTML = `${countryName}, ${country}`
    document.querySelector('.container-mine img').src = `https://openweathermap.org/img/wn/${imageName}@2x.png`
    document.querySelector('.container-mine p').innerHTML = description
    document.querySelector('.container-mine h2').innerHTML = `${weatherDeg} &deg;C`
    document.querySelector('.wind').innerHTML = `<i class="fas fa-wind"></i>${wind}km/h`
    document.querySelector('.humidity').innerHTML = `<i class="fas fa-tint"></i>${humidity}%`
    document.querySelector('.pressure').innerHTML = `<i class="fas fa-thermometer-half"></i>${pressure}mBar`
    document.querySelector('.min-temp').innerHTML = `<i class="fas fa-temperature-low"></i> ${minTemp}&deg;C`
    document.querySelector('.max-temp').innerHTML = `<i class="fas fa-temperature-high"></i> ${maxTemp}&deg;C`


    document.querySelector('.app-details').classList.remove('none');
}

displayFiveDays = (city) => {
    console.log(city)

    const daysContainer = document.querySelector('.days')
    const days = city.list
    console.log(days)


    for (let i = 0; i < days.length; i += 8) {
        const oneDay = days[i];
        const dayCollection =
            `
                            <div class="load-days">

                                <p>${oneDay.dt_txt.slice(0, 10)}</p>
                                <img src=https://openweathermap.org/img/wn/${oneDay.weather[0].icon}.png>

                                <span class="temp-align">
                                    <img src="./img/cold.svg">
                                    <h6>${oneDay.main.temp_min}&deg;C</h6>
                                </span>

                                <span class="temp-align">
                                    <img src="./img/hot.png" class="hot-img">
                                    <h6>${oneDay.main.temp_max}&deg;C</h6>
                                </span>
                                
                                <p>${oneDay.weather[0].description}</p>
                            </div>
                        `
        daysContainer.innerHTML += dayCollection

    }

}



const Fdeg = document.getElementById('fahrenheit')
const showFahrenheit = (weatherDeg) => {
    const fahrenheit = Math.round((weatherDeg * 9 / 5) + 32)
    return fahrenheit
}
Fdeg.addEventListener('click', showFahrenheit)

// getCurrentWeather().then(response => {
//     console.log(response);
// }).catch(e => {
//     console.log(e);
// });


searchBtn.addEventListener('click', (e) => {

    getWeatherData(searchBar.value)
        .then((data) => {
            displayweatherData(data)
            // fiveDayWeather(data)
        })
        .catch((error) => {
            //displayweatherData(city)
            document.querySelector('.app-details').classList.remove('none');
            document.querySelector('.app-details').innerText = `Insert a valid city!`
            console.log(error)
            getWeatherData(searchBar.value)
        })

})
searchBar.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        getWeatherData(searchBar.value)
            .then((data) => {
                displayweatherData(data)
                // fiveDayWeather(data)
            })
            .catch((error) => {
                //displayweatherData(city)
                document.querySelector('.app-details').classList.remove('none');
                document.querySelector('.app-details').innerText = `Insert a valid city!`
                console.log(error)
                getWeatherData(searchBar.value)
            })
    }
})

//Display 5 day forecast listener
fiveDayBtn.addEventListener('click', () => {
    fiveDayWeather(searchBar.value)
        .then((data) => {
            displayFiveDays(data)
        })
    // .catch((error) => {
    //     //displayweatherData(city)
    //     document.querySelector('.app-details').classList.remove('none');
    //     document.querySelector('.app-details').innerText = `Insert a valid city!`
    //     console.log(error)
    //     getWeatherData(searchBar.value)
    // })
})

const cels = document.querySelector('.cels')
const windSpeed = document.querySelector('.wind-speed')
const measure = document.querySelector('.measure')
const measureSpeed = document.querySelector('.speed')
const arrowRotate = document.querySelector('.arrow1')
const arrowRotate2 = document.querySelector('.arrow2')

cels.addEventListener('click', (ev) => {
    if (ev.target = cels) {
        measure.classList.toggle('open')
        arrowRotate.classList.toggle('rotate')
    }
})
windSpeed.addEventListener('click', (ev) => {
    if (ev.target = windSpeed) {
        measureSpeed.classList.toggle('open')
        arrowRotate2.classList.toggle('rotate')
    }
})



// async function get() {
//     const API_KEY = `c586bc419b157115cb2d89f611b77117`
//     const url = `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${API_KEY}`

//     const sss = await fetch(url)
//     const ss = await sss.json()
//     console.log(ss)
// }
// get()

// function getTime() {

//     let currentDate = new Date().toLocaleString('en-Us'); //Gets the time

//     const arrayOfWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//     const dateObj = new Date();
//     const weekdayNumber = dateObj.getDay();
//     const weekdayName = arrayOfWeekdays[weekdayNumber]; //day of week

//     const appTime = document.querySelector('.app-time')
//     let time = `
//                 <p>${currentDate}</p>
//                 <p>${weekdayName}</p>
//                 `
//     appTime.innerHTML = time

//     console.log(currentDate)
// }
// getTime();

//Form Validation
// const form = document.getElementsByTagName('form')[0]
// const username = document.getElementById('username')
// const email = document.getElementById('email')
// const password = document.getElementById('password')
// const passwordTwo = document.getElementById('password-two')

// form.addEventListener('submit', (e) => {
//     e.preventDefault()

//     formValidation()
// })

// const formValidation = (e) => {
//     const usernameValue = username.value.trim()
//     const emailValue = email.value.trim()
//     const passwordValue = password.value.trim()
//     const passwordTwoValue = passwordTwo.value.trim()


//     //if username is empty throw an error
//     if (usernameValue === '') {
//         setErrorFor(username, 'Username cannot be blank!')
//     } else {
//         setSuccessFor(username)
//     }

//     //if email is empty
//     if (emailValue === '') {
//         setErrorFor(email, 'Email cannot be blank!')
//         //check to see if email is valid with a regex
//     } else if (!isEmail(emailValue)) {
//         setErrorFor(email, 'Email is not valid')
//     } else {
//         setSuccessFor(email)
//     }


//     if (passwordValue === '') {
//         setErrorFor(password, 'Password cannot be blank!')
//     } else if (passwordValue.length < 6) {
//         setErrorFor(password, 'Password cannot be shorter than 6 characters!')
//     } else {
//         setSuccessFor(password)
//     }


//     if (passwordTwoValue === '') {
//         setErrorFor(passwordTwo, 'Confirm Password cannot be blank!')
//     } else if (passwordValue !== passwordTwoValue) {
//         setErrorFor(passwordTwo, 'Passwords do not match!')
//     } else {
//         setSuccessFor(passwordTwo)
//     }
// }

// function setErrorFor(input, message) {
//     const formField = input.parentElement
//     const small = formField.querySelector('small')

//     small.innerText = message
//     formField.className = 'form-field error'

// }
// setErrorFor()

// function setSuccessFor(input) {
//     const formField = input.parentElement;
//     formField.className = 'form-field success'
// }

// //Check to see if email is valid with Regex
// function isEmail(email) {
//     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         .test(email);
// }

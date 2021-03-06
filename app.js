const requestUrl = 'http://www.reddit.com/search.json?q='
const container = document.querySelector('.container')
const body = document.querySelector('body')
const directions = document.getElementById('directions')
const bottom = document.querySelector('.bottom')
const restart = document.querySelector('.restart')
let counter = 0
let isRunning = true
const stopButton = document.createElement('button')
stopButton.classList.add('reset')
const input = document.getElementById('input')


     

const fetchResult = (searchTerm) => {
    fetch(requestUrl + searchTerm)

    .then((responseData)=>{
        return responseData.json()
    })
    .then((jsonData) => {
       //add loading message
        directions.innerText='loading...'
        //isolate the children array so we can run the map function through it
        let children = jsonData.data.children
       //gives a new array of thumbnails
       const thumbNails = children.map((child)=>{
        return child.data.url
        })
     
        //function to filter out items that have url images
        const filterPics = (str) => {
            if(str.includes('.jpg')){
                return true
            } else {
                return false
            }
        }
        //creates a new array with items that have url images
        let actualImages = thumbNails.filter(filterPics)

   
        const addImage = (arr) => {
            let newImage = arr
            let pic = document.createElement('img')
            pic.classList.add('photo')
            pic.setAttribute("src", newImage)
            container.appendChild(pic)

            clearButton()
       
            stopButton.innerText = 'Reset'
            bottom.appendChild(stopButton)
            stopButton.addEventListener('click', reset)
        }

        const clearPhoto = () => {
            while (container.firstChild) {
                 container.removeChild(container.firstChild)
            }
        }

        const clearButton = () => {
            while (bottom.firstChild) {
                 bottom.removeChild(bottom.firstChild)
            }
            while (restart.firstChild) {
                restart.removeChild(restart.firstChild)
            }
        }

     
        const slideshow = () => {
            input.disabled = true
            if (isRunning) {
                directions.innerText=''
                ++counter
                if (counter >= actualImages.length) {
                    counter = 0
                }
                clearPhoto()
                addImage(actualImages[counter])
            }
        }

        const reset = () => {
            input.disabled = false
            clearInterval(interval)
            clearPhoto()
            bottom.removeChild(stopButton)
            input.value = ''
            directions.innerText = 'Type in a Reddit search term to display popular images in a slideshow!'
        }

        let interval = setInterval(slideshow, 3000)
    })

    .catch((err)=> {
        console.log(err)
    })
}

document.addEventListener('DOMContentLoaded', ()=> {
    form.addEventListener('submit', (event)=>{
        event.preventDefault()
        console.log('user input is:', input.value)
        fetchResult(input.value)
    })
})


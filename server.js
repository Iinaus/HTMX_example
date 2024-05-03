import express from 'express';
import dotenv from 'dotenv';

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

dotenv.config()


// Handle GET request to fetch users
app.get("/users", async (req, res) => {
    
    setTimeout(async () => {
        const limit = +req.query.limit || 10

        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
        const users = await response.json()

        res.send(`
            <h1 class="text-2xl font-bold my-4">Users</h1>
            <ul>
                ${users.map((user) => `<li>${user.name}</li>`).join('')}
            </ul>    
        `)
    }, 2000)    
})

// Handle POST request for temp conversion
app.post("/convert", (req, res) => {
    setTimeout(() => {
        const fahrenheit = parseFloat(req.body.fahrenheit)
        const celcius = (fahrenheit - 32)*(5 / 9)

        res.send(`
            <p>
                ${fahrenheit} degrees Fahrenheit is equal to ${celcius} degrees Celcius
            </p>
        `)
    }, 2000)
})

let counter = 0

// Handle GET request for polling example
app.get("/poll", (req, res) => {
    counter++

    const data = {value: counter}

    res.json(data)
})

let currentTemperature = 20

//Handle GET request for weather app
app.get("/get-temperature", (req, res) => {
    currentTemperature += Math.random() * 2 - 1 // Random temp change
    res.send(currentTemperature.toFixed(1) + "C")

})

const contacts = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Doe', email: 'jane@example.com' },
    { name: 'Alice Smith', email: 'alice@example.com' },
    { name: 'Bob Williams', email: 'bob@example.com' },
    { name: 'Mary Harris', email: 'mary@example.com' },
    { name: 'David Mitchell', email: 'david@example.com' },
  ];

//Handle POST request for user search
app.post("/search", (req, res) => {
    const searchTerm = req.body.search.toLowerCase()

    if (!searchTerm) {
        return res.send('<tr></tr>')
    }

    const searchResults = contacts.filter((contact) => {
        const name = contact.name.toLowerCase()
        const email = contact.email.toLowerCase()

        return name.includes(searchTerm) || email.includes(searchTerm)
    })

    setTimeout(() => {
        const searchResultHtml = searchResults.map((contact) => 
            `<tr>
                <td><div class="my-4 p-2">${contact.name}</div></td>
                <td><div class="my-4 p-2">${contact.email}</div></td>
            </tr>`)
            .join("")

        res.send(searchResultHtml)
    }, 1000)
})

//Handle POST request for user search from jsonplaceholder
app.post("/search/api", async (req, res) => {
    const searchTerm = req.body.search.toLowerCase()

    if (!searchTerm) {
        return res.send('<tr></tr>')
    }

    const response = await fetch(`https://jsonplaceholder.typicode.com/users?`)
    const contacts = await response.json()

    const searchResults = contacts.filter((contact) => {
        const name = contact.name.toLowerCase()
        const email = contact.email.toLowerCase()

        return name.includes(searchTerm) || email.includes(searchTerm)
    })

    setTimeout(() => {
        const searchResultHtml = searchResults.map((contact) => 
            `<tr>
                <td><div class="my-4 p-2">${contact.name}</div></td>
                <td><div class="my-4 p-2">${contact.email}</div></td>
            </tr>`)
            .join("")

        res.send(searchResultHtml)
    }, 1000)
})

//Handle POST request for email validation
app.post("/contact/email", (req, res) => {
    const submittedEmail = req.body.email
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

    const isValid = {
        message: "Email is valid",
        class: "text-green-700"
    }

    const isInvalid = {
        message: "Please enter a valid email address",
        class: "text-red-700"
    }

    if(!emailRegex.test(submittedEmail)) {
        return res.send(
            `<div class="mb-4" hx-target="this" hx-swap="outerHTML">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
              >Email Address</label
            >
            <input
              name="email"
              hx-post="/contact/email"
              class="border rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              value="${submittedEmail}"
              required
            />
            <div class="${isInvalid.class}">${isInvalid.message}</div>
          </div>`
        )
    } else {
        return res.send(
            `<div class="mb-4" hx-target="this" hx-swap="outerHTML">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
              >Email Address</label
            >
            <input
              name="email"
              hx-post="/contact/email"
              class="border rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              value="${submittedEmail}"
              required
            />
            <div class="${isValid.class}">${isValid.message}</div>
          </div>`
        )
    }

})

//Handle POST request for weather search from OpenWeather API
app.post("/weather", async (req, res) => {
    try {
        const API_KEY = process.env.API_KEY;
        const city = req.body.city.toLowerCase();
        const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        const description = data.weather[0].description
        const { temp, temp_min, temp_max } = data.main

        res.send(`
            <div class="cardContainer">
                <div class="card">
                    <p class="city">${formattedCity}</p>
                    <p class="weather">${description}</p>    
                    <p class="temp">${temp}°</p>
                    <div class="minmaxContainer">
                        <div class="min">
                            <p class="minHeading">Min</p>
                            <p class="minTemp">${temp_min}°</p>
                        </div>
                        <div class="max">
                            <p class="maxHeading">Max</p>
                            <p class="maxTemp">${temp_max}°</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    } catch (error) {
        res.send(`
            <div class="errorContainer bg-red-500 text-white px-4 py-2 rounded-md">
                <p class="error">City not found</p>
            </div>
        `)
    }
})

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
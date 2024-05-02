import express from 'express';

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/users", async (req, res) => {
    /*const users = [
        {id: 1, name: "John Doe"},
        {id: 2, name: "Bob Williams"},
        {id: 3, name: "Shannon Jackson"}
    ]*/

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

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
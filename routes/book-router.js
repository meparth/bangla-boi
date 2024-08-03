import { Router } from "express";

const bookRouter = Router()

bookRouter.route('/').get((req, res) => {
    console.log('holaa got')
    res.send('hola')
})

export default bookRouter
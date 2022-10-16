const express = require("express")
const router = express.Router()

const { Update } = require("../models")

router.post("/", async (req, res) => {
    const { product, quantity, unit } = req.body

    Update.create({
        product: product,
        quantity: quantity,
        unit: unit
    })

    res.json(req.body)
})

router.get("/", async (req, res) => {
    const data = await Update.findAll()
    res.json(data)
})

module.exports = router;

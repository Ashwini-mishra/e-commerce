const Orders = require("../models/orders");

//Order checkOut Api
const orderCheckOut = (async (req, res) => {
    const user = req.body.id;
    const data = await Orders({ ...req.body, user_id: user });
    if (data) {
        data.save();
        res.status(200).send(data);
    } else {
        const detail = "data not found";
        res.status(404).send(detail);
    }
})

// get the information about order
const displayOrderDetail = (async (req, res) => {
    const user = req.body.id;
    const data = await Orders.find({ user_id: user });
    if (data) {
        res.send(data);
    } else {
        const detail = "data not found";
        res.status(404).send()
    }
})

module.exports = { orderCheckOut, displayOrderDetail };
const PhoneModel = require("../models/phoneModel");
const NotFoundError = require("../errors/NotFoundError");

const token = process.env.TG_TOKEN;
const chatId = process.env.TG_CHATID;
const apiURL = `https://api.telegram.org/bot${token}/sendMessage`;

module.exports.sendOrder = (req, res, next) => {
    const {modelID, serviceID, customer, phone, contactMethod} = req.body;
    PhoneModel.findById(modelID)
    .then((phoneModel) => {
        if (!phoneModel) {
            throw new NotFoundError("Устройство с указанным _id не найдено.");
        }
        const service = phoneModel.services.find(service => service._id == serviceID);
        if (!service) {
            throw new NotFoundError("Услуга с указанным _id не найдено.");
        } else {
            const order = {
                model: phoneModel.name,
                service: service.name,
                price: service.price,
                customer,
                phone,
                contactMethod: contactMethod
            } 
            return order
        }          
    })
    .then(order => {
        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                chat_id: chatId,            
                text: `ЗАЯВКА НА РЕМОНТ \nМодель телефона: ${order.model} \nУслуга: ${order.service} \nЦена: ${order.price} \nКлиент: ${order.customer} \n${order.contactMethod==='phone' ? 'Связаться по телефону: ' : 'Связаться через мессндежры: '} ${order.phone}`,
            }),
        })
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(next)
    })
    .catch(next);
}


module.exports.sendCallback = (req, res, next) => {
    const {customer, phone, contactMethod} = req.body;
    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            chat_id: chatId,            
            text: `${contactMethod==='phone' ? 'СВЯЗАТЬСЯ ПО ТЕЛЕФОНУ' : 'СВЯЗАТЬСЯ ЧЕРЕЗ МЕССЕНДЖЕРЫ'}\nКлиент: ${customer} \nНомер: ${phone}`,
        }),
    })
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(next);
}
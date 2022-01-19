const upload_product_route = require('express').Router()
const multer = require('multer');
const path = require('path')

const product = require('../../dbschemas/productschema')
const authToken = require('../../validations_and_auths/authentication_token')

//CREATING STORAGE ENGINE
const storageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/products');
    },
    filename: (req, file, cb) => {
        cb(null, `product_Img_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//DEFINING LOCATION FOR FILE STORAGE
const uploadProduct = multer({
    storage: storageEngine,
    limits: { fileSize: 5 *  1024 * 1024 }
})


upload_product_route.post('/:id', authToken, uploadProduct.array('productimgs', 3), async(req, res) =>{
    
    let imgArray = []
    let c = 0
    req.files.forEach(element => {
        const imgUrl =  `${process.env.URL}/pimgs/${req.files[c].filename}`
        c = c+1
        imgArray.push(imgUrl)
    })
    
    const newProduct = new product({

        puserid: req.params.id,
        pname: req.body.pname,
        pdescription: req.body.pdescription,
        pcategory: req.body.pcategory,
        psubcategory: req.body.psubcategory,
        qty: req.body.qty,
        price: req.body.price,
        pimages: imgArray,
        pweight: req.body.pweight,
        manufacturedate: req.body.manufacturedate,
        expirydate: req.body.expirydate,
        veg: false,   
        pcolor: req.body.pcolor,
        psize: req.body.psize,
        pkeywords: req.body.keywords,
        pverify: false

    })

    try {
        const saveNewProduct = await newProduct.save()
        res.json(saveNewProduct)
    } catch (err) {
        if(err) return res.json({msg:err})
    }

})

module.exports = upload_product_route
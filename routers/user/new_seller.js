//IMPORTING DEPENDENCIES
const seller_patch_router = require('express').Router()
const multer = require('multer')
const path = require('path')

//IMPORTING EXTERNAL FILES
const userschema = require('../../dbschemas/userschema')
const getText = require('../../getText')
const authToken = require('../../validations_and_auths/authentication_token')

//STORAGE ENGINE
const storage = multer.diskStorage({
    destination: './images/adharcard',
    filename: (req, file ,cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//DEFINING LOCATION FOR IMAGES STORING
const upload = multer({storage:storage})


//PATCH REQUEST FOR CREATING NEW SELLER OR ADDING VALUES TO THE USER BY USING ID
seller_patch_router.patch('/:id', upload.single('img'), authToken, async(req,res) =>{

    const aname = req.body.adharname
    const anumber = req.body.adharnumber
    const aphoto = `${process.env.URL}/imgs/${req.file.filename}`

    var date=new Date
    console.log(date.toLocaleTimeString())

    // ----------------------------------------------------------------------------------------

    //ADHAAR VERIFICATION CODE
    
    getText(aphoto, aname, anumber).then(result => {

        if(result.includes(aname) && result.includes(anumber)){

            const update_buyer_to_seller = userschema.findByIdAndUpdate(
                {_id:req.params.id},
                {
                    role:"seller",
                    sellerid: Date.now(),
                    adharphoto: `${process.env.URL}/imgs/${req.file.filename}`,
                    adharname: req.body.adharname,
                    adharnumber: req.body.adharnumber,
                    sellerverify: true
                },
                (err)=>{
                    if(err) return res.json({msg:err})
                    else{res.json({msg:"Seller Account Created"})}
                })

        }else if(!result.includes(aname)){
            res.json({msg:"Incorrect Name"})
        }else if(!result.includes(anumber)){
            res.json({msg:"Incorrect Number"})
        }
    }).catch(err => {
        if(err) console.log(err)
    })

})

module.exports = seller_patch_router
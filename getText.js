const { createWorker } = require("tesseract.js");

const worker = createWorker()

<<<<<<< HEAD
// var date=new Date
// console.log(date.toLocaleTimeString())

module.exports = async function getText(req, res, fileName, adharName, adharNumber) {

    var cnt = ""
=======
module.exports = async function getText(fileName, adharName, adharNumber) {
>>>>>>> branchOne
    
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')

    const{data:{text}} = await worker.recognize(fileName)
    // await worker.terminate()
<<<<<<< HEAD
    // console.log(text)
=======

>>>>>>> branchOne
    var date=new Date
    console.log(date.toLocaleTimeString())
    
    return text
}

const { createWorker } = require("tesseract.js");

const worker = createWorker()

// var date=new Date
// console.log(date.toLocaleTimeString())

module.exports = async function getText(req, res, fileName, adharName, adharNumber) {

    var cnt = ""
    
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')

    const{data:{text}} = await worker.recognize(fileName)
    await worker.terminate()
    // console.log(text)
    var date=new Date
    console.log(date.toLocaleTimeString())
    
    return text
}

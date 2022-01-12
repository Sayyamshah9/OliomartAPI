const { createWorker } = require("tesseract.js");

const worker = createWorker()

module.exports = async function getText(fileName, adharName, adharNumber) {
    
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')

    const{data:{text}} = await worker.recognize(fileName)
    // await worker.terminate()

    var date=new Date
    console.log(date.toLocaleTimeString())
    
    return text
}

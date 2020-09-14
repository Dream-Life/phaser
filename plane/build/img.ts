const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')

const isCDN = process.argv.splice(2).includes('cdn')
const cdnLink = 'https://freefiremobile-a.akamaihd.net/common/web_event/' + pkg.name + '/'

const imgrePath = `../src/assets/images`
const imgFilesPath = path.resolve(__dirname, '../src/ts')
const imgsPath = path.resolve(__dirname, imgrePath)
const filesName = ['images.ts','images.d.ts']

const imageTs = `${imgFilesPath}/${filesName[0]}`
const imageDTs = `${imgFilesPath}/${filesName[1]}`

if (fs.existsSync(imageTs)) fs.unlinkSync(imageTs)
if (fs.existsSync(imageDTs)) fs.unlinkSync(imageDTs)

const images = fs.readdirSync(imgsPath)
const imageType = []
const exportImages = []

const imageImport = images.map(name => {
    let imgName = name.split('.')[0]
    let temp = isCDN ? `const ${imgName} = '${cdnLink}${name}'`:`import ${imgName} from '../assets/images/${name}'`
    exportImages.push(imgName)

    if(!isCDN){
        let type =`declare module '*.${name.split('.')[1] }'`
        if(!imageType.includes(type)){
            imageType.push(type)
        }
    }
    return temp
});

const tsString = imageImport.join('\n') + `\n\nexport default {${exportImages.join(',')}}`
fs.appendFile(imageTs,tsString, (err) => {
    if (err) throw err;
    console.log(`${filesName[0]} is created!`);
  })

if (!isCDN){
    fs.appendFile(imageDTs,imageType.join('\n'), (err) => {
        if (err) throw err;
        console.log(`${filesName[1]} is created!`);
    })
}

// console.log(isCDN)
// console.log(images)
// console.log(imageImport)
// console.log(imageType)
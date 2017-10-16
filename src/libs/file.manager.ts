import * as _ from 'lodash'
import * as fs from 'fs'
import * as path from 'path'
import { upload_type } from '../constants/const'

class FileManager {
/**
 * 
 * 
 * @param {any} params 
 * @param {any} callback 
 * @memberof FileManager
 */
  public saveFile(params, callback) {
    const { file } = params

    const type = params.type || 2
    let uploadPath: string
    let filePath = path.join(__dirname, '../public/files')
    let fileName = ''

    switch (type) {
      case 'upload-image':
        fileName += path.join('images')
        break
      case 'service':
        fileName += path.join('media')
        break
      default:
        fileName += path.join('import-file')
        break
    }
    fileName = path.join(fileName, new Date().getTime() + '-' + file.name)

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, '0755')
    }

    uploadPath = path.join(filePath, fileName)

    file.mv(uploadPath, err => {
      if (err) callback('EM0010')
      else {
        const fileObj = fs.statSync(uploadPath)
        callback(null, {
          url: uploadPath,
          name: fileName,
          fileType: file.mimetype,
          size: fileObj.size
        })
      }
      // Get file size
    })
  }
}
export default new FileManager()

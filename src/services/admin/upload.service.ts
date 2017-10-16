//
import { FileManager } from '../../libs'
//
class UploadService {
  constructor() {}

  public uploadImage(params, callback) {
    const { file, type } = params

    FileManager.saveFile(
      {
        file,
        type
      },
      (err, result) => {
        callback(err, result)
      }
    )
  }
}
export default new UploadService()

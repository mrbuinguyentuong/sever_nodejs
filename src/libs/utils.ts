import { eachSeries } from 'async'
import * as _ from 'lodash'
// Import const variables
//
class Utils {
  constructor() {}

  /**
	 * Check empty
	 */
  public isEmpty(param: any) {
    return _.isUndefined(param) || _.isEmpty(param) || _.isEmpty(param.trim())
  }

  /**
	 * Check required params
	 * @param listParams {{Array}}
	 * @param callback
	 */
  public remvePrivacy(params) {
    return _.omit(params, ['password', 'questionID'])
  }

  /**
     * Private function
     */
  private getErrCode(param: any) {
    switch (param) {
      case 'numberPhone':
        return 'EM00002'

      case 'password':
        return 'EM0003'

      case 'questionID':
        return 'EM0007'
    }
  }
}

export default new Utils()

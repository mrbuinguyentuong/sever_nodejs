const messageCode = new Map()

messageCode.set('EM0001', 'Server maintain')

messageCode.set('EM00002', 'Number phone is required')

messageCode.set('EM0003', 'Password is required')

messageCode.set('EM0004', 'User is not exist')

messageCode.set('EM0005', 'Wrong password')

messageCode.set('EM0006', 'Number phone is registered')

messageCode.set('EM0007', 'Secret question is required')

messageCode.set('EM0007', 'Secret question is required')

messageCode.set('EM0007', 'Secret question is not found')

export const ServerMantenance = 'Server is mantenance!'
//
export const ParentCategoryNotFound = 'Parent categrory is not found!'

const upload_type = {
  post: '1',
  category: '2'
}

export { messageCode, upload_type }

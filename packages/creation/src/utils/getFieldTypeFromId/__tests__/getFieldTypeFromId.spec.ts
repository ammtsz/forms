
import { getFieldTypeFromId } from '..'

describe('getFieldTypeFromId', () => {
  it('should return field type', () => {
    expect(getFieldTypeFromId('type--asdfsafas-asfasfas-afassf')).toBe('type')
  })
})

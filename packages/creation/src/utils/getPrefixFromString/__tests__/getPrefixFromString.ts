
import { getPrefixFromString } from '..'

describe('getPrefixFromString', () => {
  it('should return field type', () => {
    expect(getPrefixFromString('type--asdfsafas-asfasfas-afassf')).toBe('type')
  })
})

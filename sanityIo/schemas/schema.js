import createSchema from 'part:@sanity/base/schema-creator'

import schemaTypes from 'all:part:@sanity/base/schema-type'
import background from './assets/background'
import tag from './tag'
import ContactUs from './ContactUs'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    background,
    ContactUs,
    tag
  ]),
})

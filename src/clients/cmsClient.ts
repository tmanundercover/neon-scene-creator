import {SanityContactUs} from '../../functions/src'
import {sanityClient} from './SanityClient'

export const createContactUs = (contactUs: SanityContactUs): Promise<SanityContactUs> => {
  console.log('About to create a contact Us', contactUs)

  return sanityClient.create({...contactUs, _type: 'contactUs'}).then((res: any) => {
    console.log('result from create contact Us', res)
    return res
  })
}

// eslint-disable-next-line
export default {createContactUs}
export default {
  name: 'background',
  title: 'Background',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'canRepeatX',
      title: 'Seamless Repeat in X direction',
      type: 'boolean',
    },
    {
      name: 'canRepeatY',
      title: 'Seamless Repeat in Y direction',
      type: 'boolean',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      options: { layout: 'tags' }
    },
  ],
}
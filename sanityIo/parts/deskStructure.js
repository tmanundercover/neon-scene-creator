import {createSuperPane} from 'sanity-super-pane'
// eslint-disable-next-line import/no-unresolved
import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Base')
    .items([
      // S.listItem().title('Neon Scene Users')
      //   .child(createSuperPane('user', S)),
      S.listItem().title('Background')
        .child(createSuperPane('background', S)),
      // S.listItem().title('FontFaces')
      //   .child(createSuperPane('ballComment', S)),
      // S.listItem().title('IconFontFaces')
      //   .child(createSuperPane('house', S)),
      // S.listItem().title('Saved Designs')
      //   .child(createSuperPane('checkinPage', S)),
    ])


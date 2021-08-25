export const NeonBlueHex = '#1900A0'
export const NeonGreenHex = '#38FF12'
export const NeonFuchsiaHex = '#f09'
export const NeonYellowRoseBlueHex = '#FFF100'
export const NeonElectricVioletHex = '#9600FF'
export const NeonAquaHex = '#00F5FB'

export default {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      title: "Color",
      description: "Pick a color",
      name: "color",
      type: "colorlist", // required
      options: {
        list: [
          // { title: theme.palette.primary.main, value: theme.palette.primary.main },
          { title: "#3D3D3D", value: "#3D3D3D" },
          { title: "Neon Blue", value: NeonBlueHex },
          { title: "Neon Green", value: NeonGreenHex },
          { title: "Neon Fuschia", value: NeonFuchsiaHex },
          { title: "Neon Yellow", value: NeonYellowRoseBlueHex },
          { title: "Neon Violet", value: NeonElectricVioletHex },
          { title: "Neon Aqua", value: NeonAquaHex }
        ]
      }
    },
  ],
}

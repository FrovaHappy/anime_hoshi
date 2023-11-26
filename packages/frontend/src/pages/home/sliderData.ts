interface SliderData {
  id: number
  title: string
  description: string
  colorPrimary: string
  colorSecondary: string
  image: string
  canHide: boolean
  action: {
    url: string
    title: string
    isExternal: boolean
  }
}

const data: SliderData[] = [
  {
    id: 1,
    title: 'Configura los Permisos a notificaciones',
    description: 'Dirígete a settings, dale a permitir y ajusta a tus gustos las notificaciones.',
    colorPrimary: '#E57EA3',
    colorSecondary: '#670315',
    image: 'https://images.alphacoders.com/134/thumbbig-1342171.webp',
    canHide: false,
    action: {
      url: 'setting',
      title: 'Empezamos?',
      isExternal: false
    }
  },
  {
    id: 2,
    title: 'Únete a nuestra comunidad',
    description: 'Habla, comparte, ayúdanos en nuestra comunidad de Discord, te esperamos.',
    colorPrimary: '#E57EA3',
    colorSecondary: '#670315',
    image: 'https://images6.alphacoders.com/133/thumbbig-1330235.webp',
    canHide: true,
    action: {
      url: 'https://discord.gg/JRpHsGC8YQ',
      title: 'Ir A Discord',
      isExternal: true
    }
  },
  {
    id: 3,
    title: 'Ayúdanos a mejorarlo',
    description: 'Si tienes ideas para mejorar a AnimeHoshi o avisar de un fallo pásate por el github.',
    colorPrimary: '#E57EA3',
    colorSecondary: '#670315',
    image: 'https://images5.alphacoders.com/134/thumbbig-1342156.webp',
    canHide: true,
    action: {
      url: 'setting',
      title: 'Empezamos?',
      isExternal: true
    }
  }
]
export default data

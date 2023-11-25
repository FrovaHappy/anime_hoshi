interface SliderData {
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
    title: 'Configura los Permisos a notificaciones',
    description: 'Dirígete a settings, dale a permitir y ajusta a tus gustos las notificaciones.',
    colorPrimary: '#E57EA3',
    colorSecondary: '#670315',
    image: 'https://images.alphacoders.com/134/thumbbig-1342171.webp',
    canHide: true,
    action: {
      url: 'setting',
      title: 'Empezamos?',
      isExternal: false
    }
  },
  {
    title: 'Configura los Permisos a notificaciones',
    description: 'Dirígete a settings, dale a permitir y ajusta a tus gustos las notificaciones.',
    colorPrimary: '#E57EA3',
    colorSecondary: '#670315',
    image: 'https://images.alphacoders.com/134/thumbbig-1342145.webp',
    canHide: true,
    action: {
      url: 'setting',
      title: 'Empezamos?',
      isExternal: false
    }
  },
  {
    title: 'Configura los Permisos a notificaciones',
    description: 'Dirígete a settings, dale a permitir y ajusta a tus gustos las notificaciones.',
    colorPrimary: '#E57EA3',
    colorSecondary: '#670315',
    image: 'https://images5.alphacoders.com/134/thumbbig-1342156.webp',
    canHide: true,
    action: {
      url: 'setting',
      title: 'Empezamos?',
      isExternal: false
    }
  }
]
export default data

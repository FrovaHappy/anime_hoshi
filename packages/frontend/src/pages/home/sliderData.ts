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
    title: 'Configura los Permisos de las notificaciones',
    description: 'Dirígete a settings, dale a permitir y ajusta a tus gustos las notificaciones.',
    colorPrimary: '#F2C53D',
    colorSecondary: '#F27329',
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
    colorPrimary: '#F2AE72',
    colorSecondary: '#F2786D',
    image: 'https://images6.alphacoders.com/133/thumbbig-1330235.webp',
    canHide: true,
    action: {
      url: 'https://discord.gg/JRpHsGC8YQ',
      title: 'Ir a Discord',
      isExternal: true
    }
  },
  {
    id: 3,
    title: 'Ayúdame a mejorarlo',
    description:
      'Si tienes ideas para mejorar a AnimeHoshi ó encuentras algún fallo pásate por el Github o por Discord.',
    colorPrimary: '#AEDFF2',
    colorSecondary: '#337AA6',
    image: 'https://images2.alphacoders.com/134/thumbbig-1342755.webp',
    canHide: true,
    action: {
      url: 'https://github.com/FrovaHappy/monorepo-scrapping-anime.git',
      title: 'Ir a Github',
      isExternal: true
    }
  }
]
export default data

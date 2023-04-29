import IconHome from './Home'
import IconCircleInfo from './CircleInfo'
import IconGear from './Gear'
import IconClose from './Close'
import IconBug from './Bug'
import IconNew from './New'
import { IconPointNav, IconPointNavActive } from './PointNav'
import IconRotate from './Rotate'
import IconExternalLink from './ExternalLink'
import IconBars from './Bars'

type IconProps = {
  className?: string
  style?: React.CSSProperties
  iconName: Icon
}
type Icon =
  | 'IconHome'
  | 'IconCircleInfo'
  | 'IconGear'
  | 'IconNew'
  | 'IconBug'
  | 'IconClose'
  | 'IconPointNav'
  | 'IconPointNavActive'
  | 'IconRotate'
  | 'IconExternalLink'
  | 'IconBars'
const icons = {
  IconHome,
  IconCircleInfo,
  IconGear,
  IconClose,
  IconBug,
  IconNew,
  IconPointNav,
  IconPointNavActive,
  IconRotate,
  IconExternalLink,
  IconBars,
}

const filterIcon = (iconProps: IconProps) => {
  const { className, iconName, style } = iconProps
  const { path, viewBox } = icons[iconName]
  return (
    <svg className={className} style={style} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      {path}
    </svg>
  )
}

export default filterIcon

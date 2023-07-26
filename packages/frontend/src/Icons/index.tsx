import IconHome from './Home'
import IconCircleInfo from './CircleInfo'
import IconGear from './Gear'
import IconClose from './Close'
import IconBug from './Bug'
import IconNew from './New'
import IconRotate from './Rotate'
import IconExternalLink from './ExternalLink'
import IconBars from './Bars'
import IconStar from './Star'
import IconCaretUp from './caretUp'
import IconGitHub from './GitHub'
import IconDiscord from './Discord'

const icons = {
  IconHome,
  IconCircleInfo,
  IconGear,
  IconClose,
  IconBug,
  IconNew,
  IconRotate,
  IconExternalLink,
  IconBars,
  IconStar,
  IconCaretUp,
  IconGitHub,
  IconDiscord,
}

interface IconProps {
  className?: string
  style?: React.CSSProperties
  iconName: keyof typeof icons
}

const FilterIcon = (iconProps: IconProps) => {
  const { className, iconName, style } = iconProps
  const { jsx, viewBox } = icons[iconName]
  return (
    <svg className={className} style={style} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      {jsx}
    </svg>
  )
}

export default FilterIcon

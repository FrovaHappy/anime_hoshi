import './Options.styles.scss'
import '../../../styles/buttons.scss'
function Options({
  title,
  description,
  descriptionAction = undefined,
  actions,
}: {
  title: string
  description: string
  descriptionAction: React.ReactNode
  actions: React.ReactNode
}) {
  return (
    <div className="options__row">
      <div className="options__col">
        <h4 className="options__title">{title}</h4>
        <p className="options__description">{description}</p>
        {descriptionAction}
      </div>
      {actions}
    </div>
  )
}

export default Options

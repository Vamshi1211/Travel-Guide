import './index.css'

const TravelGuideItems = props => {
  const {eachGuide} = props
  const {name, imageUrl, description} = eachGuide

  return (
    <li className="list-item-container">
      <img src={imageUrl} alt={name} className="image" />
      <div className="text-container">
        <p className="tour-name">{name}</p>
        <p className="tour-des">{description}</p>
      </div>
    </li>
  )
}

export default TravelGuideItems

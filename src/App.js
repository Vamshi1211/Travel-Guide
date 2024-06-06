import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelGuideItems from './components/TouristGuideItems'
import './App.css'

// Replace your code here
const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

class App extends Component {
  state = {apiStatus: apiStatusValue.initial, touristList: []}

  componentDidMount() {
    this.getTourDetails()
  }

  getTourDetails = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})
    const url = 'https://apis.ccbp.in/tg/packages'

    const response = await fetch(url)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const updatedData = fetchedData.packages.map(eachItem => ({
        id: eachItem.id,
        description: eachItem.description,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      console.log(updatedData)
      this.setState({
        touristList: updatedData,
        apiStatus: apiStatusValue.success,
      })
    }
  }

  renderTravelGuide = () => {
    const {touristList} = this.state
    return (
      <ul className="travel-guide-container">
        {touristList.map(eachItem => (
          <TravelGuideItems key={eachItem.id} eachGuide={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.inProgress:
        return this.renderLoadingView()
      case apiStatusValue.success:
        return this.renderTravelGuide()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="main-heading">Travel Guide</h1>
        {this.renderViews()}
      </div>
    )
  }
}

export default App

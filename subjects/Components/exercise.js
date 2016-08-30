////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - Make it so that you can click on a tab and it will appear active
//   while the others appear inactive
// - Make it so the panel renders the correct content for the selected tab
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

const styles = {}

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10
}

const Tabs = React.createClass({
  getInitialState() {
    return {
      activeTabIndex: 0
    }
  },
  handleTabClick(index) {
    this.setState({
      activeTabIndex: index
    })
  },
  render() {
    return (
      <div className="Tabs">
        {this.props.data.map((country, index) => {
          const isActive = this.state.activeTabIndex === index
          return (
            <div
              key={index}
              className="Tab"
              onClick={() => this.handleTabClick(index)}
              style={isActive ? styles.activeTab : styles.tab}>
              {country.name}
            </div>
        )})}
        <div className="TabPanel" style={styles.panel}>
          {this.props.data[this.state.activeTabIndex].description}
        </div>
      </div>
    )
  }
})

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}/>
      </div>
    )
  }
})

const DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' }
]

render(<App countries={DATA}/>, document.getElementById('app'), function () {
  require('./tests').run(this)
})

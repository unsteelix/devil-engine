import React from 'react'
import { connect } from 'react-redux'


export class HelpCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
    
    };
  
  }

  render() {
    
      return (
        <div className="HelpCard">
          <h3>--------HELP--------</h3>
          <div>/auth</div>
          <div>/help</div>
          <div>/add</div>
          <div>/account</div>
          <div>..........</div>
          <div>..</div>
        </div>
      )

  }
}


// приклеиваем данные из store
const mapStateToProps = store => {
  return {

  }
}

// приклеиваем action из store
const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpCard)
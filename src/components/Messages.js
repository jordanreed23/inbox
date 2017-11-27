import React, {Component} from 'react';
import Message from './Message';

class Messages extends Component {

  mapData() {
    return this.props.data.map(x => {
      return <Message subject={x.subject} read={x.read} starred={x.starred} labels={x.labels}
      selected={x.selected}
      starClick={() => this.props.starClick(this.props.data.indexOf(x))}
      selectedClick={() => this.props.selectedClick(this.props.data.indexOf(x))}/>
    })
  }

  render() {
    return (<div>
      {this.mapData()}
    </div>)
  }
}

export default Messages

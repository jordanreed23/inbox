import React, {Component} from 'react';

class Message extends Component {

  getLabels() {
    return (this.props.labels.map(label => {
      return (<span className="label label-warning">{label}
      </span>);
    }))
  }

  comparer(pro, tru, fal){
    return pro ? tru : fal;
  }

  render() {
    return (<div className={`row message ${this.comparer(this.props.read, 'read', 'unread')} ${this.comparer(this.props.selected, 'selected', '')}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox"
            checked={this.comparer(this.props.selected, 'checked', '')}
            onClick={this.props.selectedClick}
            />
          </div>
          <div className="col-xs-2">
            <i className={`star fa ${this.comparer(this.props.starred, 'fa-star', 'fa-star-o')}`} onClick={this.props.starClick}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {this.getLabels()}
        <a href="#">
          {this.props.subject}
        </a>
      </div>
    </div>);
  }
}



export default Message

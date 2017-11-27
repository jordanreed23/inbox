import React, {Component} from 'react';

class Message extends Component {

  isRead() {
    if (this.props.read) {
      return "row message read" + this.isSelected(" selected");
    } else {
      return "row message unread" + this.isSelected(" selected");
    }
  }

  isSelected(str) {
    if (this.props.selected || this.props.checked) {
      return str;
    } else {
      return "";
    }
  }

  getLabels() {
    return (this.props.labels.map(label => {
      return (<span className="label label-warning">{label}
      </span>);
    }))
  }

  isStarred() {
    if (this.props.starred) {
      return "star fa fa-star";
    } else {
      return "star fa fa-star-o";
    }
  }

  render() {
    return (<div className={this.isRead()}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={this.isSelected("checked")} onClick={this.props.selectedClick} //onChange={this.props.unMark}
            />
          </div>
          <div className="col-xs-2">
            <i className={this.isStarred()} onClick={this.props.starClick}></i>
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

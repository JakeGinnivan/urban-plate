import * as React from 'react'
import './page-loading-notification.scss'

var autobind: any = require('autobind-decorator')
var classNames: any = require('classnames')
const intervalTime = 50

interface IPageLoadingNotificationProps {
    loading: boolean
}

interface IPageLoadingNotificationState {
    percent: number
}

@autobind
class PageLoadingNotification extends React.Component<IPageLoadingNotificationProps, IPageLoadingNotificationState> {
  interval: any
  
  static propTypes = {
    loading: React.PropTypes.bool.isRequired
  }

  constructor(props: any) {
    super(props)
    this.state = { percent: 0 }
  }

  componentWillReceiveProps(nextProps: IPageLoadingNotificationProps) {
    if (!this.props.loading && nextProps.loading) {
      this.setState({ percent: 10 })
      this.interval = setInterval(this.increment, intervalTime)
      setTimeout(() => {
        if (this.state.percent !== 100) {
          this.setState({ percent: this.state.percent + 20 })
        }
      }, 400)
    } else if (this.props.loading && !nextProps.loading) {
      this.setState({ percent: 99 })
      if (this.interval) {
        clearInterval(this.interval)
      }// After hide animation is complete, set percent back to -1
      setTimeout(() => {
        this.setState({ percent: 100 })
      }, 100)
      // After hide animation is complete, set percent back to -1
      setTimeout(() => {
        this.setState({ percent: -1 })
      }, 400)
    }
  }

  increment() {
    let percent = this.state.percent + (Math.random() + 1 - Math.random())
    percent = percent < 99 ? percent : 99
    this.setState({
      percent
    })
  }

  render() {
    let className = classNames({
      'react-progress-bar': true,
      'react-progress-bar-hide': this.state.percent < 0 || this.state.percent >= 100
    })

    let style = { width: `${this.state.percent < 0 ? 0 : this.state.percent}%` }
    return (
      <div className={className}>
        <div className='react-progress-bar-percent' style={style} />
      </div>
    )
  }
}
export default PageLoadingNotification

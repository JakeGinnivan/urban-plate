import * as React from 'react'

export default class FocusOnMountInput extends React.Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus()
      this.input.setSelectionRange(0, this.input.value.length)
    }
  }
  render() {
    return <input ref={i => { this.input = i }} {...this.props} />
  }
}

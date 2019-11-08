import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'

import './style.scss'

class ResizableProgressBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeDrag: false,
      resizableInfo: {
        width: 300,
        height: 40,
        axis: 'x',
        handle: (<strong className='resize-handler'></strong>),
        minConstraints: [100, Infinity],
        maxConstraints: [800, Infinity],
        onResizeStop: this.resizeStop
      }
    }
  }

  resizeStop = (e, data) => {
    const { resizeStopFunc } = this.props
    const { index } = this.props

    resizeStopFunc(index, data.size)
  }

  onStart = () => {
  }

  onStop = () => {
  }

  render() {
    const { resizableInfo } = this.state
    const { name, width } = this.props
    // const dragHandlers = {
    //   onStart: this.onStart,
    //   onStop: this.onStop,
    //   axis: 'y',
    //   cancel: 'strong',
    //   bounds: 'body',
    //   defaultPosition: {
    //     x: 0,
    //     y: 0
    //   },
    //   position: {
    //     x: 0,
    //     y: 0
    //   }
    // }

    resizableInfo.width = width

    return (
      // <Draggable {...dragHandlers}>
      <div className='progress-bar'>
        <ResizableBox className='resizable-bar' {...resizableInfo}>
          <div className='order'>name: {name}</div>
        </ResizableBox>
      </div>
      // </Draggable>
    )
  }
}

ResizableProgressBar.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  width: PropTypes.number
}

export default ResizableProgressBar

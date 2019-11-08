import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import ResizableProgressBar from '../../common/components/ResizableProgressBar'

import './index.scss'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
          name: 'aaaaa',
          width: 300
        },
        {
          name: 'bbbbb',
          width: 300
        },
        {
          name: 'ccccc',
          width: 300
        }
      ]
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  resizeProgressBarFunc = (index, size) => {
    const { items } = this.state

    items[index].width = size.width

    this.setState({ items })
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    this.setState({
      items
    })
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const progressbarInfo = {
      resizeFunc: this.resizeProgressBarFunc
    }

    return (
      <div className='dashboard'>
        <div className='drag-drop-context'>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable key={item.name} draggableId={item.name} index={index}>
                      {(provided) => (
                        <div
                          className='item-content'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div className='progress-bar-group'>
                            <div {...provided.dragHandleProps}>
                              <div className='time-progress-bar'></div>
                            </div>
                            <ResizableProgressBar index={index} name={item.name} width={item.width} {...progressbarInfo} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    )
  }
}

export default Dashboard

import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import CallbackQueue from '../CallbackQueue/CallbackQueue'
import Callstack from '../Callstack/Callstack'
import Console from '../Console/Console'
import EventLoop from '../EventLoop/EventLoop'
import Header from '../Header/Header'
import WebApi from '../WebApi/WebApi'
import Editor from '../Editor/Editor'

import { Cell, Grid } from '../../styles/grid'
import { Normalize } from '../../styles/normalize'
import { theme } from '../../styles/theme'
import Help from '../Help/Help'

import { connect } from 'react-redux'

import { removeFromCallbackQueue } from '../../redux/callbackQueue/callbackQueue.actions'
import { addFunctionToCallstack } from '../../redux/callstack/callstack.actions'

class Container extends Component {
	componentDidMount() {
		// After the component has mounted, start the loop
		this.makeFuncObj = (str) => ({
			name: str,
			delay: 0,
			webApi: false,
			message: 'Test Console log',
		})

		this.runLoop = () => {
			// if callstack is empty and callbackqueue is not empty
			if (this.props.callstack.length === 0 && this.props.callbackQueue.length !== 0) {
				// add the callbackqueue[0] to callstack
				// but callbackqueue has func as strings whereas
				// callstack accepts func as obj (see callstack reducer)
				// hence wrap the string in makeFuncObj
				this.props.addFunctionToCallstack(
					this.makeFuncObj(this.props.callbackQueue[0] + 'added by event loop')
				)
				this.props.removeFromCallbackQueue()
			}
		}

		this.timerId = setInterval(() => {
			this.runLoop()
			console.log('ran loop')
		}, 1000)
	}

	render() {
		return (
			<>
				<ThemeProvider theme={theme}>
					<Normalize />

					<Header />

					<Help />

					<Grid
						display="grid"
						gridTemplateColumns={{ d: '1fr', md: '2fr 1fr 1fr' }}
						gridTemplateRows="45vh 35vh"
						gridGap="25px"
						m="25px"
					>
						<Cell>
							<Editor />
						</Cell>

						<Cell>
							<Callstack />
						</Cell>

						<Cell>
							<WebApi />
						</Cell>

						<Cell>
							<Console />
						</Cell>

						<Cell alignSelf="center" justifySelf="center">
							<EventLoop />
						</Cell>

						<Cell>
							<CallbackQueue />
						</Cell>
					</Grid>
				</ThemeProvider>
			</>
		)
	}
}

const mapStateToProps = (state) => ({
	callstack: state.callstack.stack,
	callbackQueue: state.callbackQueue,
})

const mapDispatchToProps = (dispatch) => ({
	removeFromCallbackQueue: () => dispatch(removeFromCallbackQueue()),
	addFunctionToCallstack: (func) => dispatch(addFunctionToCallstack(func)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)

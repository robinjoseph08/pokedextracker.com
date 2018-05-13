import { Component } from 'react';
import hoistStatics  from 'hoist-non-react-statics';

export function deferComponentRender (WrappedComponent) {
  class DeferredRenderWrapper extends Component {
    constructor (props, context) {
      super(props, context);
      this.state = { shouldRender: false };
    }

    componentDidMount () {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => this.setState({ shouldRender: true }));
      });
    }

    render () {
      return this.state.shouldRender ? <WrappedComponent {...this.props} /> : null;
    }
  }

  return hoistStatics(DeferredRenderWrapper, WrappedComponent);
}

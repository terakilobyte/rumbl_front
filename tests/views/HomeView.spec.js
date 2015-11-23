import React                  from 'react';
import TestUtils              from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import { HomeView }           from 'views/HomeView';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<HomeView {...props} />);
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<HomeView {...props} />);
}

// Helper function to select specific components
function filterComponent (name) {
  return function (elem) {
    return elem.textContent.match(name);
  };
}

describe('(View) Home', function () {
  let _component, _rendered, _props, _spies;

  beforeEach(function () {
    _spies = {};
    _props = {
      actions : bindActionCreators({
        increment : (_spies.increment = sinon.spy()),
        decrement : (_spies.decrement = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    };

    _component = shallowRenderWithProps(_props);
    _rendered  = renderWithProps(_props);
  });

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div');
  });

  it('Should include an <h1> with welcome text.', function () {
    const h1 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h1');

    expect(h1).to.exist;
    expect(h1.textContent).to.match(/Welcome to the React Redux Starter Kit/);
  });

  it('Should render with an <h2> that includes Sample Counter text.', function () {
    const h2 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h2');

    expect(h2).to.exist;
    expect(h2.textContent).to.match(/Sample Counter/);
  });

  it('Should render props.counter at the end of the sample counter <h2>.', function () {
    const h2 = TestUtils.findRenderedDOMComponentWithTag(
      renderWithProps({ ..._props, counter : 5 }), 'h2'
    );

    expect(h2).to.exist;
    expect(h2.textContent).to.match(/5$/);
  });

  it('Should render an "Increment" button.', function () {
    const incBtn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
            .filter(filterComponent(/Increment/)).pop();

    expect(incBtn).to.exist;
  });

  it('Should dispatch an action when "Increment" button is clicked.', function () {
    const incBtn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
            .filter(filterComponent(/Increment/)).pop();

    _spies.dispatch.should.have.not.been.called;
    TestUtils.Simulate.click(incBtn);
    _spies.dispatch.should.have.been.called;
  });

  it('Should render a "Decrement" button.', () => {
    const decBtn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
            .filter(filterComponent(/Decrement/)).pop();
    expect(decBtn).to.exist;
  });

  it('Should dispatch an action when "Decrement" button is clicked.', () => {
    const decBtn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
            .filter(filterComponent(/Decrement/)).pop();
    _spies.dispatch.should.have.not.been.called;
    TestUtils.Simulate.click(decBtn);
    _spies.dispatch.should.have.been.called;
  });
});

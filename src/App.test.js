import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import { Loader } from './components/Loader.js';
import { Spinner } from './components/Spinner.js';
import { Buttons } from './components/Buttons.js';

configure({ adapter: new Adapter() });

it( 'renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
});

describe( '<Loader />', () => {
	let wrapper;
	beforeAll( () => {
		wrapper = shallow(<Loader />);
	});

	it('should render <Spinner /> and <Button /> components', () => {
		expect(wrapper.find(Spinner).length).toBe(1);
		expect(wrapper.find(Buttons).length).toBe(1);
	});

	it('starts app with "inactive" state', () => {
		expect(wrapper.state('transferState')).toEqual('inactive');
	});

	it('starts app with 0 percentage', () => {
		expect(wrapper.state('percentage')).toEqual(0);
	});
});

describe( 'Loader Interactions', () => {

	let component,
		originalTimeout;
	beforeEach(function() {
		component = shallow( <Loader /> );

		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
	});

    // TEST START TRANSFER VALUES
	it('startTransfer triggers state change', () => {
		expect(component.state('transferState')).toEqual('inactive');
		component.instance().startTransfer();
		expect(component.state('transferState')).toEqual('active');
	});
	it('startTransfer triggers percent increase', (done) => {
		component.instance().startTransfer();
		setTimeout(() => {
			expect(component.state('percentage')).toBeGreaterThan(0);
			done();
		}, 1000 );
	});
	// TEST PAUSE TRANSFER VALUES
	it('pauseTransfer triggers state change', (done) => {
		expect(component.state('transferState')).toEqual('inactive');
		component.instance().startTransfer();
		setTimeout(() => {
			component.instance().pauseTransfer();
			expect(component.state('transferState')).toEqual('paused');
			done();
		}, 500 );
	});
	it('pauseTransfer pauses increase interval', (done) => {
		let paused_value = 0;
		component.instance().startTransfer();
		setTimeout(() => {
			component.instance().pauseTransfer();
			expect(component.state('percentage')).toBeGreaterThan(0);
			paused_value = component.state('percentage');
			setTimeout( () => {
				expect(component.state('percentage')).toEqual(paused_value);
				done();
			}, 1000);
		}, 1000 );
	});
	it('Continue Transfer starts at paused value', (done) => {
		let paused_value = 0;
		component.instance().startTransfer();
		setTimeout(() => {
			component.instance().pauseTransfer();
			expect(component.state('percentage')).toBeGreaterThan(0);
			paused_value = component.state('percentage');
			setTimeout( () => {
				component.instance().startTransfer();
				expect(component.state('percentage')).toEqual(paused_value);
				done();
			}, 1000);
		}, 1000 );
	});

	// TEST CANCEL TRANSFER VALUES
	it('cancelTransfer triggers state change', (done) => {
		expect(component.state('transferState')).toEqual('inactive');
		component.instance().startTransfer();
		setTimeout(() => {
			component.instance().cancelTransfer();
			expect(component.state('transferState')).toEqual('cancelled');
			done();
		}, 500 );
	});
	it('cancelTransfer stops increase interval', (done) => {
		let cancelled_value;
		component.instance().startTransfer();
		setTimeout(() => {
			expect(component.state('percentage')).toBeGreaterThan(0);
			cancelled_value = component.state('percentage');
			component.instance().cancelTransfer();
			setTimeout( () => {
				expect(component.state('percentage')).toBeLessThan(cancelled_value);
				done();
			}, 1000);
		}, 1000 );
	});
	it('cancelTransfer resets values to inactive', (done) => {
		expect(component.state('transferState')).toEqual('inactive');
		component.instance().startTransfer();
		expect(component.state('transferState')).toEqual('active');
		setTimeout(() => {
			component.instance().cancelTransfer();
			expect(component.state('transferState')).toEqual('cancelled');
			setTimeout( () => {
				expect(component.state('transferState')).toEqual('inactive');
				expect(component.state('percentage')).toEqual(0);
				done();
			}, 2000);
		}, 1000 );
	});

	it('completeTransfer triggers state change', () => {
		expect(component.state('transferState')).toEqual('inactive');
		component.instance().completeTransfer();
		expect(component.state('transferState')).toEqual('completed');
	});

	afterEach(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

});

describe( '<Spinner />', () => {
	let component, wrapper;
	beforeEach(function() {
		wrapper = mount(<Loader />);
		const state = wrapper.state('transferState');
		const percentage = wrapper.state('percentage');

		component = shallow(
			<Spinner
				transferState={ state }
				percentage={ percentage } />
		);
	});

	it('should render 3 children: SVG, Percent & hidden Complete', () => {
		expect(component.children().length).toBe(3);
	});
});

describe( '<Buttons />', () => {

	let component, wrapper;
	beforeEach(function() {
		wrapper = mount(<Loader />);
		const startTransfer = wrapper.instance().startTransfer;
		const state = wrapper.state('transferState');

		component = shallow(
			<Buttons
				transferState={ state }
				buttonClick={ startTransfer } />
		);
	});

	it('should render single "Transfer" button', () => {
		expect(component.children().length).toBe(1);
	});

});

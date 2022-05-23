import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe [Pipe]', () => {
	let strengthPipeInstance: StrengthPipe;

	beforeEach(() => {
		strengthPipeInstance = new StrengthPipe();
	});

	it('should create an instance', () => {
		expect(strengthPipeInstance).toBeTruthy();
	});

	describe('transform() [Method]', () => {
		beforeEach(() => {
			jest.spyOn(strengthPipeInstance, 'transform');
		});

		it('should display "weak" if strength is less than 10', () => {
			expect(strengthPipeInstance.transform(9)).toEqual('9 (weak)');
		});

		it('should display "strong" if strength is more than 10 and less than 20', () => {
			expect(strengthPipeInstance.transform(10)).toEqual('10 (strong)');
		});

		it('should display "unbelievable" if strength is more than 20', () => {
			expect(strengthPipeInstance.transform(21)).toEqual('21 (unbelievable)');
		});
	});
});

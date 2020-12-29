namespace App {
	// autobind decrorator
	export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;
		const abjDescriptor: PropertyDescriptor = {
			configurable: true,
			enumerable: false,
			// nuovo
			get() {
				// sarà sempre il this della classe
				const boundFunction = originalMethod.bind(this);
				return boundFunction;
			},
		};
		// farà un override del vecchio descriptor
		return abjDescriptor;
	}
}

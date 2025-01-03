const useInputProps = () => {
	return {
		showDetails: {
			type: Boolean,
			default: true,
		},
		prepend: {
			type: String,
			default: '',
		},
		append: {
			type: String,
			default: '',
		},
		details: {
			type: String,
			default: '',
		},
	};
};

export { useInputProps };

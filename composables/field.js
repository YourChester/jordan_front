const useFieldProps = () => {
	return {
		id: {
			type: [String, Number],
			default: undefined,
		},
		prependInner: {
			type: String,
			default: '',
		},
		appendInner: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
		dirty: {
			type: Boolean,
			default: false,
		},
		active: {
			type: Boolean,
			default: false,
		},
		focus: {
			type: Boolean,
			default: false,
		},
		cleareble: {
			type: Boolean,
			default: false,
		},
	};
};

const useFieldEmits = () => {
	return [
		'on-click',
		'on-clear',
		'on-click:prepend-inner',
		'on-click:append-inner',
	];
};

const useField = (emits) => {
	const onClick = (event) => {
		event.preventDefault();
		emits('on-click', event);
	};

	const onClear = (event) => {
		event.preventDefault();
		emits('on-clear', event);
	};

	const onClickPrependInner = (event) => {
		event.preventDefault();
		event.stopPropagation();
		emits('on-click:prepend-inner', event);
	};

	const onClickAppendInner = (event) => {
		event.preventDefault();
		event.stopPropagation();
		emits('on-click:append-inner', event);
	};

	return {
		onClick,
		onClear,
		onClickPrependInner,
		onClickAppendInner,
	};
};

export { useFieldProps, useFieldEmits, useField };

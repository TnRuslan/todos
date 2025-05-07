import React, { forwardRef, InputHTMLAttributes } from 'react';
import { errorMessageStyle } from '~shared/styles/common-styles';
import { inputWrapperStyles, textInputStyles } from './input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	errorMessage?: string;
	inputSize?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ label, defaultValue, errorMessage, inputSize, ...props },
		ref,
	): React.ReactNode => {
		return (
			<div className={inputWrapperStyles}>
				<label>{label}</label>
				<input
					ref={ref}
					className={textInputStyles(inputSize)}
					defaultValue={defaultValue}
					{...props}
				/>
				{errorMessage && (
					<p className={errorMessageStyle}>{errorMessage}</p>
				)}
			</div>
		);
	},
);

export default Input;

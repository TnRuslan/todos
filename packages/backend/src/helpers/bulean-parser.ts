function parseBoolean(
	queryParam: string,
	defaultValue: boolean = false,
): boolean | undefined {
	if (typeof queryParam === 'string') {
		const normalizedParam = queryParam.trim().toLowerCase();
		return normalizedParam === 'true';
	}

	if (typeof queryParam === 'undefined') return undefined;
	return defaultValue;
}

export default parseBoolean;

/**
 * The format for a block field.
 *
 * @example
 * ```ts
 * 'plain' - The field value is a plain text string.
 * 'html'  - The field value is a HTML string.
 * ```
 */
export type FieldFormat = 'plain' | 'html';

/**
 * Semantic meaning of a block field. Experiments select fields by role rather
 * than by block name, so new blocks are picked up automatically.
 *
 * @example
 * ```ts
 * 'content' - The field value is the main content of the block.
 * 'caption' - The field value is a caption for the block.
 * 'citation' - The field value is a citation for the block.
 * 'alt' - The field value is the alt text for the block.
 * ```
 */
export type FieldRole = 'content' | 'caption' | 'citation' | 'alt';

/**
 * Definition of a block field.
 *
 * @example
 * ```ts
 * {
 * 	key: 'content',
 * 	role: 'content',
 * 	format: 'html',
 * 	label: __( 'Content', 'ai' ),
 * }
 * ```
 */
export interface BlockFieldDefinition {
	/**
	 * Stable id, unique within the block. Usually the attribute name.
	 */
	key: string;

	/**
	 * Semantic meaning of the field.
	 *
	 * @see FieldRole
	 */
	role: FieldRole;

	/**
	 * The format of the field value.
	 *
	 * @see FieldFormat
	 */
	format: FieldFormat;

	/**
	 * Human-readable label for the field.
	 */
	label: string;

	/**
	 * Custom reader for fields that aren't a 1:1 attribute mapping.
	 * Defaults to reading `attributes[ key ]` with RichText normalization.
	 */
	getValue?: ( attributes: Record< string, unknown > ) => string;

	/**
	 * Returns the attribute patch that writes a new value back.
	 * Defaults to `{ [ key ]: value }`.
	 */
	setValue?: ( value: string ) => Record< string, unknown >;
}

/**
 * Definition of a block content.
 *
 * @example
 * ```ts
 * {
 * 	name: 'core/paragraph',
 * 	fields: [ { key: 'content', role: 'content', format: 'html', label: __( 'Content', 'ai' ) } ],
 * }
 * ```
 */
export interface BlockContentDefinition {
	/**
	 * The name of the block.
	 */
	name: string;

	/**
	 * The fields of the block.
	 *
	 * @see BlockFieldDefinition
	 */
	fields: BlockFieldDefinition[];
}

/**
 * A field resolved against a concrete block instance.
 */
export interface ResolvedField {
	/**
	 * The client ID of the block.
	 */
	clientId: string;

	/**
	 * The name of the block.
	 */
	blockName: string;

	/**
	 * The key of the field.
	 */
	fieldKey: string;

	/**
	 * The semantic meaning of the field.
	 */
	role: FieldRole;

	/**
	 * The format of the field value.
	 */
	format: FieldFormat;

	/**
	 * The human-readable label for the field.
	 */
	label: string;

	/**
	 * The value of the field.
	 */
	value: string;
}

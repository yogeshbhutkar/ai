/**
 * Internal dependencies
 */
import { getBlockContentDefinition } from './registry';
import { isHTMLSerializable } from '../blocks';
import type { BlockFieldDefinition, FieldRole, ResolvedField } from './types';

/**
 * Definition of a block instance.
 */
interface BlockInstance {
	/**
	 * The client ID of the block.
	 */
	clientId: string;

	/**
	 * The name of the block.
	 */
	name: string;

	/**
	 * The attributes of the block.
	 */
	attributes: Record< string, unknown >;
}

/**
 * Narrow which fields an experiment operates on.
 */
export interface FieldSelector {
	/**
	 * Restrict to specific block types. Omit to allow all registered blocks.
	 */
	blocks?: readonly string[];

	/**
	 * Restrict to semantic roles. Omit to allow all roles.
	 */
	roles?: readonly FieldRole[];
}

/**
 * Reads the value of a field from the block attributes.
 *
 * @param field      - The field to read the value from.
 * @param attributes - The block attributes.
 * @return The value of the field.
 */
function readFieldValue(
	field: BlockFieldDefinition,
	attributes: Record< string, unknown >
): string {
	if ( field.getValue ) {
		return field.getValue( attributes );
	}

	const raw = attributes[ field.key ];
	if ( typeof raw === 'string' ) {
		return raw;
	}
	if ( isHTMLSerializable( raw ) ) {
		return raw.toHTMLString();
	}
	return '';
}

/**
 * Resolves the editable fields of a block instance, optionally
 * narrowed by a selector. Unregistered blocks yield an empty array.
 *
 * @param block    - The block instance to get the editable fields for.
 * @param selector - The selector to narrow the fields by.
 * @return The editable fields.
 */
export function getEditableFields(
	block: BlockInstance,
	selector: FieldSelector = {}
): ResolvedField[] {
	if ( selector.blocks && ! selector.blocks.includes( block.name ) ) {
		return [];
	}

	const definition = getBlockContentDefinition( block.name );
	if ( ! definition ) {
		return [];
	}

	return definition.fields
		.filter(
			( field ) =>
				! selector.roles || selector.roles.includes( field.role )
		)
		.map( ( field ) => ( {
			clientId: block.clientId,
			blockName: block.name,
			fieldKey: field.key,
			role: field.role,
			format: field.format,
			label: field.label,
			value: readFieldValue( field, block.attributes ),
		} ) )
		.filter( ( field ) => field.value.trim().length > 0 );
}

/**
 * Builds the attribute patch for one or more field updates on a block,
 * so multiple generated values apply in a single updateBlockAttributes call.
 *
 * @param blockName - The name of the block to build the field patch for.
 * @param updates   - The updates to apply to the fields.
 * @return The field patch.
 */
export function buildFieldPatch(
	blockName: string,
	updates: Record< string, string >
): Record< string, unknown > {
	const definition = getBlockContentDefinition( blockName );
	if ( ! definition ) {
		return {};
	}

	return Object.entries( updates ).reduce< Record< string, unknown > >(
		( patch, [ fieldKey, value ] ) => {
			const field = definition.fields.find( ( f ) => f.key === fieldKey );
			if ( ! field ) {
				return patch;
			}
			return {
				...patch,
				...( field.setValue
					? field.setValue( value )
					: { [ field.key ]: value } ),
			};
		},
		{}
	);
}

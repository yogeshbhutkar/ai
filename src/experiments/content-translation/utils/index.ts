/**
 * Internal dependencies
 */
import { runAbility } from '../../../utils/run-ability';
import type { AIContentTranslationData } from '../types';
import {
	TRANSLATION_LOADING_CLASSES,
	TRANSLATION_MINIMUM_CONTENT_COUNT_DEFAULT,
} from '../constants';

/**
 * Retrieves the content translation settings from the global window object.
 *
 * @return The content translation settings.
 */
export const getSettings = (): AIContentTranslationData => {
	const settings = window?.aiContentTranslationData ?? {};

	return {
		enabled: settings.enabled ?? false,
		minContentLength:
			settings.minContentLength ??
			TRANSLATION_MINIMUM_CONTENT_COUNT_DEFAULT,
		languages: settings.languages ?? [],
	};
};

/**
 * Toggle the loading class used to show the translation-in-progress state.
 *
 * @param loadingClass The loading class to toggle.
 * @param isLoading    A boolean indicating whether the loading class should be toggled.
 */
export function setTranslationLoadingClass(
	loadingClass: keyof typeof TRANSLATION_LOADING_CLASSES,
	isLoading: boolean
) {
	const editorBody = document.querySelector< HTMLIFrameElement >(
		'iframe[name="editor-canvas"]'
	)?.contentDocument?.body;

	editorBody?.classList.toggle(
		TRANSLATION_LOADING_CLASSES[ loadingClass ],
		isLoading
	);
}

/**
 * Translates the content of a post using the AI API.
 *
 * @param content        The content to translate.
 * @param targetLanguage The target language to translate the content to.
 * @param postId         The ID of the post to translate the content for.
 * @return  A promise that resolves to the translated content.
 */
export function translateContent(
	content: string,
	targetLanguage: string,
	postId: number
): Promise< string > {
	return runAbility< string >( 'ai/content-translation', {
		content,
		target_language: targetLanguage,
		post_id: postId,
	} );
}

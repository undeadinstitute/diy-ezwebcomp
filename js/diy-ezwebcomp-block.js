//set the variable below to the same as $webcompname from index.php
var webcompname = 'zombie-profile',
	userFriendlyTitle = 'Zombie Profile';

(function (blocks, editor, element, components) {
	var el = element.createElement;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;
	blocks.registerBlockType('diy-ezwebcomp/' + webcompname, {
		title: userFriendlyTitle,
		icon: 'id-alt',
		category: 'layout',
		//The attributes are all the different fields to use.
		attributes: {
			textinput: {
				type: 'string', //the type of content
				source: 'text', //where to pull the info from e.g. the text of an element, from an attribute, from child elements etc.
				selector: '.textinput', //selectors are how Gutenberg selects and grabs the content. These should be unique within an instance of a block. If you only have one img or one ul, you can use element selectors.
			},
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			list: {
				type: 'array',
				source: 'children',
				selector: 'ul',
			},
		},
		//the edit function deals with how the information will be displayed in the editor.
		edit: function (props) {
			var attributes = props.attributes;
			var onSelectImage = function (media) {
				return props.setAttributes({
					mediaURL: media.url,
					mediaID: media.id,
				});
			};
			return el(
				'div', {
					className: props.className
				},
				el('h3', {}, 'Text Input'),
				el(RichText, {
					tagName: 'p',
					className: 'textinput',
					placeholder: 'Some Text Input…',
					value: attributes.textinput,
					onChange: function (value) {
						props.setAttributes({
							textinput: value
						});
					},
				}),
				el( //an image
					'div', {
						className: 'pic'
					},
					el(MediaUpload, {
						onSelect: onSelectImage,
						allowedTypes: 'image',
						value: attributes.mediaID,
						render: function (obj) {
							return el(
								components.Button, {
									className: attributes.mediaID ?
										'image-button' : 'button button-large',
									onClick: obj.open,
								},
								!attributes.mediaID ?
								'Upload Image' :
								el('img', {
									src: attributes.mediaURL
								})
							);
						},
					})
				),
				el('h3', {}, 'List'), //heading
				el(RichText, { //where you add list items one at a time
					tagName: 'ul',
					multiline: 'li', //creates a new li when you hit enter
					placeholder: 'Write a list…',
					value: attributes.list,
					onChange: function (value) {
						props.setAttributes({
							list: value
						});
					},
					className: 'list',
				}),
			);
		},
		save: function (props) {
			var attributes = props.attributes;
			return el(
				webcompname, //the component name
				{}, //the web component does not need any HTML attributes so this can remain empty
				attributes.mediaURL && //ensure a URL exists before you print it
				el('img', { //print the image
					src: attributes.mediaURL,
					slot: 'profile-image'
				}),
				attributes.textinput &&
				el(RichText.Content, { //print the name
					tagName: 'span',
					slot: 'text-input',
					className: 'textinput',
					value: attributes.textinput,
				}),
				attributes.list[0] && //Since list's type is array we need to verify there is something in the first element.
				el(RichText.Content, {
					tagName: 'ul',
					slot: 'list',
					value: attributes.list,
				}), );
		},
	});
})(
	//import the dependencies
	window.wp.blocks,
	window.wp.blockEditor,
	window.wp.element,
	window.wp.components
);
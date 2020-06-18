(() => {

	const existColor = '#4f4';
	const emptyColor = '#ff4';
	const missingColor = '#f44';
	const backgroundColor = 'rgba(0, 0, 0, .8)';

	function getHighestZindex() {
		let zindex = 1;
		document.querySelectorAll('*').forEach((el) => {
			const elZindex = window.getComputedStyle(el).zIndex;
			zindex = isNaN(elZindex) ? zindex : Math.max(zindex, elZindex);
		});
		return zindex;
	}

	function isHidden(el) {
		return el.getClientRects().length === 0;
	}

	function createLabel(img, text, color) {
		const d = document.createElement('div'),
			s = d.style,
			alt = img.getAttribute('alt'),
			imgBox = img.getClientRects();

		d.textContent = text;
		s.color = color;
		s.boxSizing = 'border-box';
		s.position = 'absolute';
		s.top = (window.scrollY + imgBox[0].top) + 'px';
		s.left = (window.scrollX + imgBox[0].left) + 'px';
		s.padding = '5px';
		s.background = backgroundColor;
		s.fontFamily = 'monospace';
		s.fontSize = '12px';
		s.pointerEvents = 'none';
		s.width = imgBox[0].width + 'px';
		s.minWidth = '75px';

		return d;
	}

	function init() {
		const zIndex = getHighestZindex() + 1;

		let layer = document.querySelector('#alt-text-viewer-layer');

		if (layer) {
			document.body.removeChild(layer);
		}
		else {
			layer = document.createElement('div');
			layer.id = 'alt-text-viewer-layer';

			layer.style.zIndex = zIndex;
			layer.style.position = 'absolute';
			layer.style.top = 0;
			layer.style.left = 0;
			layer.style.pointerEvents = 'none';

			document.body.appendChild(layer);

			document.querySelectorAll('img').forEach((img) => {

				if (isHidden(img)) {
					return;
				}

				let alt = img.getAttribute('alt'),
					text,
					color;

				if (alt === null) {
					text = 'Missing alt attribute';
					color = missingColor;
				}
				else if (alt.trim() === '') {
					text = 'Empty alt attribute';
					color = emptyColor;
				}
				else if (alt.trim().length < 10) {
					text = 'Short alt text: ' + img.alt;
					color = emptyColor;
				}
				else {
					text = 'Alt text: ' + img.alt;
					color = existColor;
				}

				const lbl = createLabel(img, text, color);
				lbl.style.zIndex = zIndex;
				layer.appendChild(lbl);
			});

			document.querySelectorAll('svg').forEach((img) => {

				if (isHidden(img)) {
					return;
				}

				let text,
					color,
					title = img.querySelector('title'),
					descr = img.querySelector('descr');

				if (!title && !descr) {
					text = 'SVG Missing title and descr';
					color = '#f44';
				}
				else {
					if (!title) {
						text = 'SVG Missing title';
						color = missingColor;
					}
					else if (title.textContent && title.textContent.trim().length === 0) {
						text = 'Empty title. ';
						color = emptyColor;
					}
					else {
						text = 'Title text: ' + title.textContent + '. ';
						color = existColor;
					}

					if (!descr) {
						text += 'SVG Missing descr';
						color = missingColor;
					}
					else if (descr.textContent && descr.textContent.trim().length === 0) {
						text += 'Empty descr.';
						color = emptyColor;
					}
					else {
						text += 'Descr text: ' + descr.textContent + '.';
						color = existColor;
					}
				}

				const lbl = createLabel(img, text, color);
				lbl.style.zIndex = zIndex;
				layer.appendChild(lbl);
			});
		}
	}

	init();

})();
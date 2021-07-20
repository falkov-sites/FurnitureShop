window.onload = function() {
    document.addEventListener('click', documentActions);
}

function documentActions(e) {
    const targetElement = e.target;
    
    if(window.innerWidth > 768 && isMobile.any()) {
        if(targetElement.classList.contains('menu__arrow')) {
            targetElement.closest('.menu__item').classList.toggle('_hover');
        }

        if(!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
            _removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
        }
    }

}

// ----------------------------------------------
// вернет true, если сайт открыт на устройстве с touchscreen
// if(window.innerWigth > 768 && isMobile.any()) { ... }
// if(isMobile.any()) { alert('mobile device: ' + isMobile.any()); }
var isMobile = { 
	Android: 	function() { return navigator.userAgent.match(/Android/i); }, 
	BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); }, 
	iOS: 		function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, 
	Opera: 		function() { return navigator.userAgent.match(/Opera Mini/i); }, 
	Windows: 	function() { return navigator.userAgent.match(/IEMobile/i); }, 
	any: 		function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } 
};

function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}


// ------------------------------------


// добавляем к нашей разметке классы: 
// _active     - какой таб сейчас активен (стиль выделенного таба, задаем сами)

// технические классы (берутся из 'ui.sass' и обрабатываются в 'functions.js'):
// _tabs       - для контейнера табов
// _tabs-item  - для каждого заголовка таба (навигация по табам)
// _tabs-block - для каждого блока таба

{/* <div class="tabs-block _tabs">                                          // _tabs
    <nav class="tabs-block__nav">
        <div class="tabs-block__item _tabs-item _active">Tab 1</div>    //  _tabs-item  _active
        <div class="tabs-block__item _tabs-item">Tab 2</div>            //  _tabs-item
        <div class="tabs-block__item _tabs-item">Tab 3</div>            //  _tabs-item
    </nav>

    <div class="tabs-block__body">
        <div class="tabs-block__block _tabs-block _active">             // _tabs-block  _active
            [Tab 1] Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Voluptatum dolore quis sequi qui, fuga neque modi porro. 
            Fuga repellat hic perferendis, commodi quos aliquid
        </div>

        <div class="tabs-block__block _tabs-block">                     // _tabs-block
            [Tab 2] Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Voluptatum dolore quis sequi qui, fuga neque modi porro. 
            Fuga repellat hic perferendis, commodi quos aliquid
        </div>

        <div class="tabs-block__block _tabs-block">                     // _tabs-block
            [Tab 3] Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Voluptatum dolore quis sequi qui, fuga neque modi porro. 
            Fuga repellat hic perferendis, commodi quos aliquid
        </div>
    </div>
</div> */}

// // sass -------------------------------
// .tabs-block

//     // .tabs-block__nav
//     &__nav
//         display: flex
//         margin: 0 2px

//     // .tabs-block__item
//     &__item
//         display: flex
//         flex: 0 1 33.333%
//         margin: 0 2px
//         background-color: #ee9b9b
//         padding: 20px
//         justify-content: center
//         align-items: center
//         cursor: pointer

//         &._active
//             background-color: #539bee


//     // .tabs-block__body
//     &__body

//     // .tabs-block__block
//     &__block



// // ui.sass ----------------------------
// ._tabs

// 	// ._tabs-item
// 	&-item

// 	// ._tabs-block
// 	&-block
// 		display: none

// 		// ._tabs-block.active
// 		&._active
// 			display: block


let tabs = document.querySelectorAll("._tabs");

for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs__captions = tab.querySelectorAll("._tabs__caption");
	let tabs__blocks = tab.querySelectorAll("._tabs__block");

	for (let index = 0; index < tabs__captions.length; index++) {
		let tabs__caption = tabs__captions[index];

		tabs__caption.addEventListener("click", function (e) {
			for (let index = 0; index < tabs__captions.length; index++) {
				let tabs__caption = tabs__captions[index];
				tabs__caption.classList.remove('_active');
				tabs__blocks[index].classList.remove('_active');
			}
                
			tabs__caption.classList.add('_active');
			tabs__blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}

// ============================================== spoiler
// Для родителя слойлеров пишем атрибут data-spoilers
// Для заголовков слойлеров пишем атрибут data-spoiler
// Если нужно включать\выключать работу спойлеров на разных размерах экранов
// пишем параметры ширины и типа брейкпоинта.
// Например: 
// data-spoilers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
// data-spoilers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

// Если нужно что бы в блоке открывался только один слойлер добавляем атрибут data-one-spoiler

// SPOILERS
const spoilersArray = document.querySelectorAll('[data-spoilers]');
if (spoilersArray.length > 0) {
	// Получение обычных слойлеров
	const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
		return !item.dataset.spoilers.split(",")[0];
	});
	// Инициализация обычных слойлеров
	if (spoilersRegular.length > 0) {
		initSpoilers(spoilersRegular);
	}

	// Получение слойлеров с медиа запросами
	const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
		return item.dataset.spoilers.split(",")[0];
	});

	// Инициализация слойлеров с медиа запросами
	if (spoilersMedia.length > 0) {
		const breakpointsArray = [];
		spoilersMedia.forEach(item => {
			const params = item.dataset.spoilers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spoilersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpoilers(spoilersArray, matchMedia);
			});
			initSpoilers(spoilersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpoilers(spoilersArray, matchMedia = false) {
		spoilersArray.forEach(spoilersBlock => {
			spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
			if (matchMedia.matches || !matchMedia) {
				spoilersBlock.classList.add('_init');
				initSpoilerBody(spoilersBlock);
				spoilersBlock.addEventListener("click", setSpoilerAction);
			} else {
				spoilersBlock.classList.remove('_init');
				initSpoilerBody(spoilersBlock, false);
				spoilersBlock.removeEventListener("click", setSpoilerAction);
			}
		});
	}
	// Работа с контентом
	function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
		const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
		if (spoilerTitles.length > 0) {
			spoilerTitles.forEach(spoilerTitle => {
				if (hideSpoilerBody) {
					spoilerTitle.removeAttribute('tabindex');
					if (!spoilerTitle.classList.contains('_active')) {
						spoilerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spoilerTitle.setAttribute('tabindex', '-1');
					spoilerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpoilerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
			const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
			const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
			const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
			if (!spoilersBlock.querySelectorAll('._slide').length) {
				if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
					hideSpoilersBody(spoilersBlock);
				}
				spoilerTitle.classList.toggle('_active');
				_slideToggle(spoilerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpoilersBody(spoilersBlock) {
		const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
		if (spoilerActiveTitle) {
			spoilerActiveTitle.classList.remove('_active');
			_slideUp(spoilerActiveTitle.nextElementSibling, 500);
		}
	}
}








//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

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


// js ---------------------------------
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


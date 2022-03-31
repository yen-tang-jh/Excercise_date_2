// change color nav bar when scroll
window.onscroll = () => {
	const topNav = document.querySelector('.top-nav');
	const top = window.scrollY;
	if (top > 100) {
		topNav.classList.add('active');
	} else {
		topNav.classList.remove('active');
	}
};

/* handle action when open hamburger menu start */
const overlayOff = () => {
	document.getElementById('overlay').style.display = 'none';
};

const overlayOn = () => {
	document.getElementById('overlay').style.display = 'block';
};

const hamburger = document.querySelector('.ham');
const navSub = document.querySelector('.nav-sub');
hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('change');
	navSub.classList.toggle('nav-change');
	if (hamburger.classList.value === 'ham change') {
		overlayOn();
	} else {
		overlayOff();
	}
	changeMenuList();
});

const changeMenuList = () => {
	const screenWidth = document.querySelector('body').offsetWidth;
	if (screenWidth < 768) {
		document.getElementById('mail-address').style.display = 'block';
	} else {
		document.getElementById('mail-address').style.display = 'none';
	}
};

/* handle action when open hamburger menu end */

const dataImage1 = [
	{ src: '/assets/images/compresspng/list1_1-min.png', alt: 'image 1, carousel 1', title: 'BLISS TEXTURE ' },
	{ src: '/assets/images/compresspng/list1_2-min.png', alt: 'image 2, carousel 1', title: 'DECAYED' },
	{ src: '/assets/images/compresspng/list1_3-min.png', alt: 'image 3, carousel 1', title: 'BLISS TEXTURE ' },
	{ src: '/assets/images/compresspng/list1_4-min.png', alt: 'image 4, carousel 1', title: 'DECAYED' },
	{ src: '/assets/images/compresspng/list1_1-min.png', alt: 'image 1, carousel 1', title: 'BLISS TEXTURE ' },
	{ src: '/assets/images/compresspng/list1_1-min.png', alt: 'image 1, carousel 1', title: 'BLISS TEXTURE ' },
];
const dataImage2 = [
	{ src: '/assets/images/compresspng/list2_1-min.png', alt: 'image 1, carousel 2', title: 'BLISS TEXTURE ' },
	{ src: '/assets/images/compresspng/list2_2-min.png', alt: 'image 2, carousel 2', title: 'DECAYED' },
	{ src: '/assets/images/list2_3-min.png', alt: 'image 3, carousel 2', title: 'BLISS TEXTURE ' },
	{ src: '/assets/images/compresspng/list2_4-min.png', alt: 'image 4, carousel 2', title: 'DECAYED' },
	{ src: '/assets/images/list2_3-min.png', alt: 'image 3, carousel 2', title: 'BLISS TEXTURE ' },
];

const showCarousel = (dataList, indexCarousel) => {
	const slides = document.getElementsByClassName('carousel')[indexCarousel];
	dataList.forEach((data, index) => {
		const carouselItem = document.createElement('div');
		carouselItem.className = 'carousel-item animate';
		carouselItem.innerHTML = `	<div class="card-img"><i class="fa-solid fa-heart"> &nbsp; 382</i></div>
	<div class="triangle-right"></div>
	<div class="card-content">
		<h2>${data.title}</h2>
		<div class="content">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua.
		</div>
	</div>
	<div class="card-footer">
		<span
			><i class="fa-solid fa-message" style="font-size: 20px; color: #e5e5e5"></i>
			<div>&nbsp; &nbsp;374 comments</div></span
		>
		<button class="tooltip"><span class="tooltip-text">More</span><i class="fa-solid fa-ellipsis" style="font-size: 20px; color: #15032a"></i></button>
	</div>`;
		slides.appendChild(carouselItem);
		let img;
		if (indexCarousel === 0) {
			img = document.getElementsByClassName('card-img')[index];
		} else {
			img = document.getElementsByClassName('card-img')[index + dataImage1.length];
		}
		img.style.backgroundImage = `url(${data.src})`;
	});
};

showCarousel(dataImage1, 0);
showCarousel(dataImage2, 1);

/* handle carousel start */
const slides = document.querySelectorAll('.carousel');
const carouselContainer = document.querySelector('.carousel-area');

const numOfSlide = [];
let currentSlide = []; // index of current slide in <no.> list
let currentTranslate = {}; // {<index of list>: [<translated position>]}
let moveOffset;
let startX = 0,
	endX = 0;

// init carousel parameter
const makeSlide = () => {
	moveOffset = slides[0].children[0].offsetWidth + 20;

	for (let index = 0; index < slides.length; index++) {
		numOfSlide.push(slides[index].children.length);
		slides[index].style.width = moveOffset * numOfSlide[index] + 'px';

		currentSlide.push(0);
		currentTranslate[index] = [];

		for (let i = 0; i < numOfSlide[index]; i++) {
			currentTranslate[index].push(0);
		}
	}
};

// change width of carousel and the translation of each item
const changeWidthForCarouselItem = (oldOffset, newOffset) => {
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.width = newOffset * numOfSlide[i] + 'px';
		const slide = slides[i].children;
		for (let index = 0; index < numOfSlide[i]; index++) {
			const ratio = currentTranslate[i][index] / oldOffset;
			currentTranslate[i][index] = newOffset * ratio;
			slide[index].style.transform = `translateX(${currentTranslate[i][index]}px)`;
		}
	}
};

window.addEventListener('resize', () => {
	const oldMoveOffset = moveOffset;
	let newMoveOffset;
	if (carouselContainer.offsetWidth < 480) {
		newMoveOffset = 281;
	} else {
		newMoveOffset = 455;
	}
	changeWidthForCarouselItem(oldMoveOffset, newMoveOffset);
	moveOffset = newMoveOffset;
	changeMenuList();
});

makeSlide();

const moveNextSlide = (indexButton) => {
	const sl = slides[indexButton].children;
	for (let index = 0; index < sl.length; index++) {
		sl[index].style.transform = `translateX(${currentTranslate[indexButton][index] + moveOffset}px)`;
		currentTranslate[indexButton][index] = currentTranslate[indexButton][index] + moveOffset;
	}

	const index = currentSlide[indexButton] % numOfSlide[indexButton];
	slides[indexButton].children[index].style.transform = `translateX(${
		currentTranslate[indexButton][index] - moveOffset * numOfSlide[indexButton]
	}px)`;
	currentTranslate[indexButton][index] = currentTranslate[indexButton][index] - moveOffset * numOfSlide[indexButton];
};

const movePrevSlide = (indexButton) => {
	const sl = slides[indexButton].children;
	for (let index = 0; index < sl.length; index++) {
		sl[index].style.transform = `translateX(${currentTranslate[indexButton][index] - moveOffset}px)`;
		currentTranslate[indexButton][index] = currentTranslate[indexButton][index] - moveOffset;
	}

	const index = currentSlide[indexButton] % numOfSlide[indexButton];
	slides[indexButton].children[index].style.transform = `translateX(${
		currentTranslate[indexButton][index] + moveOffset * numOfSlide[indexButton]
	}px)`;
	currentTranslate[indexButton][index] = currentTranslate[indexButton][index] + moveOffset * numOfSlide[indexButton];
};

const handleClickNextCarousel = (indexButton) => {
	currentSlide[indexButton]--;

	if (currentSlide[indexButton] < 0) {
		currentSlide[indexButton] = numOfSlide[indexButton] - 1;
	}

	moveNextSlide(indexButton);
};
const handleClickPrevCarousel = (indexButton) => {
	movePrevSlide(indexButton);
	currentSlide[indexButton]++;
};

slides[0].addEventListener('touchstart', (event) => {
	startX = event.changedTouches[0].clientX;
});
slides[0].addEventListener('touchend', (event) => {
	endX = event.changedTouches[0].clientX;

	if (endX - startX > 0) handleClickNextCarousel(0);
	else if (endX - startX < 0) handleClickPrevCarousel(0);
});

/* handle carousel end */

// change color nav bar when scroll
const MAX_SCROLL_Y = 100;
window.onscroll = () => {
	const topNav = document.querySelector('.top-nav');
	const topScrollY = window.scrollY;
	if (topScrollY > MAX_SCROLL_Y) {
		topNav.classList.add('active');
	} else {
		topNav.classList.remove('active');
	}
};

// change nav item of hamburger menu list
const MAX_SCREEN_WIDTH = 768;
const changeMenuList = () => {
	const screenWidth = document.querySelector('body').offsetWidth;
	if (screenWidth < MAX_SCREEN_WIDTH) {
		document.getElementById('mail-address').style.display = 'block';
	} else {
		document.getElementById('mail-address').style.display = 'none';
	}
};

function makeHamburgerMenu() {
	const turnOffOverlay = () => {
		document.getElementById('overlay').style.display = 'none';
	};

	const turnOnOverlay = () => {
		document.getElementById('overlay').style.display = 'block';
	};

	const hamburger = document.querySelector('.ham');
	return hamburger.addEventListener('click', () => {
		const navSub = document.querySelector('.nav-sub');
		hamburger.classList.toggle('change');
		navSub.classList.toggle('nav-change');
		if (hamburger.classList.value === 'ham change') {
			turnOnOverlay();
		} else {
			turnOffOverlay();
		}
		changeMenuList();
	});
}
const hamburgerMenuMaker = makeHamburgerMenu();

const dataImageList1 = [
	{
		src: '/Excercise_4/assets/images/compresspng/list1_1-min.png',
		alt: 'image 1, carousel 1',
		title: 'BLISS TEXTURE',
	},
	{ src: '/Excercise_4/assets/images/compresspng/list1_2-min.png', alt: 'image 2, carousel 1', title: 'DECAYED' },
	{
		src: '/Excercise_4/assets/images/compresspng/list1_3-min.png',
		alt: 'image 3, carousel 1',
		title: 'BLISS TEXTURE',
	},
	{ src: '/Excercise_4/assets/images/compresspng/list1_4-min.png', alt: 'image 4, carousel 1', title: 'DECAYED' },
	{
		src: '/Excercise_4/assets/images/compresspng/list1_1-min.png',
		alt: 'image 5, carousel 1',
		title: 'BLISS TEXTURE',
	},
	{
		src: '/Excercise_4/assets/images/compresspng/list1_1-min.png',
		alt: 'image 6, carousel 1',
		title: 'BLISS TEXTURE',
	},
];
const dataImageList2 = [
	{
		src: '/Excercise_4/assets/images/compresspng/list2_1-min.png',
		alt: 'image 1, carousel 2',
		title: 'BLISS TEXTURE',
	},
	{ src: '/Excercise_4/assets/images/compresspng/list2_2-min.png', alt: 'image 2, carousel 2', title: 'DECAYED' },
	{ src: '/Excercise_4/assets/images/list2_3-min.png', alt: 'image 3, carousel 2', title: 'BLISS TEXTURE' },
	{ src: '/Excercise_4/assets/images/compresspng/list2_4-min.png', alt: 'image 4, carousel 2', title: 'DECAYED' },
	{ src: '/Excercise_4/assets/images/list2_3-min.png', alt: 'image 5, carousel 2', title: 'BLISS TEXTURE' },
];

const displayCarouselItems = (dataList, indexCarousel) => {
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
			img = document.getElementsByClassName('card-img')[index + dataImageList1.length];
		}
		img.style.backgroundImage = `url(${data.src})`;
	});
};

displayCarouselItems(dataImageList1, 0);
displayCarouselItems(dataImageList2, 1);

const MARGIN_RIGHT = 20;
const MOBILE_CONTAINER_WIDTH = 480;
const MOBILE_ITEM_WIDTH = 261;
const OTHER_DEVICE_ITEM_WIDTH = 435;

function makeCarousel() {
	const slides = document.querySelectorAll('.carousel');
	const carouselContainer = document.querySelector('.carousel-area');
	const numOfSlide = [];
	let currentSlide = []; // index of current slide in <no.> list
	let currentTranslate = {}; // {<index of list>: [<translated position>]}
	let moveOffset;
	let startX = 0;
	let endX = 0;

	const changeWidthForCarouselItem = (oldOffset, newOffset) => {
		for (let i = 0; i < slides.length; i++) {
			slides[i].style.width = newOffset * numOfSlide[i] + 'px';
			const slideChildren = slides[i].children;
			for (let index = 0; index < numOfSlide[i]; index++) {
				const ratio = currentTranslate[i][index] / oldOffset;
				currentTranslate[i][index] = newOffset * ratio;
				slideChildren[index].style.transform = `translateX(${currentTranslate[i][index]}px)`;
			}
		}
	};

	const moveToSlide = (carouselIndex, moveOffset) => {
		const slideChildren = slides[carouselIndex].children;
		for (let index = 0; index < slideChildren.length; index++) {
			slideChildren[index].style.transform = `translateX(${
				currentTranslate[carouselIndex][index] + moveOffset
			}px)`;
			currentTranslate[carouselIndex][index] = currentTranslate[carouselIndex][index] + moveOffset;
		}
		const index = currentSlide[carouselIndex] % numOfSlide[carouselIndex];
		slides[carouselIndex].children[index].style.transform = `translateX(${
			currentTranslate[carouselIndex][index] - moveOffset * numOfSlide[carouselIndex]
		}px)`;
		currentTranslate[carouselIndex][index] =
			currentTranslate[carouselIndex][index] - moveOffset * numOfSlide[carouselIndex];
	};

	return {
		makeSlide: function () {
			moveOffset = slides[0].children[0].offsetWidth + MARGIN_RIGHT;

			for (let index = 0; index < slides.length; index++) {
				numOfSlide.push(slides[index].children.length);
				slides[index].style.width = moveOffset * numOfSlide[index] + 'px';

				currentSlide.push(0);
				currentTranslate[index] = [];

				for (let i = 0; i < numOfSlide[index]; i++) {
					currentTranslate[index].push(0);
				}
			}
		},
		handleWindowResize: function () {
			window.addEventListener('resize', () => {
				const oldMoveOffset = moveOffset;
				let newMoveOffset = MARGIN_RIGHT;
				if (carouselContainer.offsetWidth < MOBILE_CONTAINER_WIDTH) {
					newMoveOffset += MOBILE_ITEM_WIDTH;
				} else {
					newMoveOffset += OTHER_DEVICE_ITEM_WIDTH;
				}
				changeWidthForCarouselItem(oldMoveOffset, newMoveOffset);
				moveOffset = newMoveOffset;
				changeMenuList(); ///
			});
		},
		handleClickNextCarousel: function (carouselIndex) {
			currentSlide[carouselIndex]--;
			if (currentSlide[carouselIndex] < 0) {
				currentSlide[carouselIndex] = numOfSlide[carouselIndex] - 1;
			}
			moveToSlide(carouselIndex, moveOffset);
		},
		handleClickPrevCarousel: function (carouselIndex) {
			moveToSlide(carouselIndex, -moveOffset);
			currentSlide[carouselIndex]++;
		},
		handleTouchStart: function (carouselIndex) {
			slides[carouselIndex].addEventListener('touchstart', (event) => {
				startX = event.changedTouches[0].clientX;
			});
		},
		handleTouchEnd: function (carouselIndex) {
			slides[carouselIndex].addEventListener('touchend', (event) => {
				endX = event.changedTouches[0].clientX;

				if (endX - startX > 0) handleClickNextCarousel(carouselIndex);
				else if (endX - startX < 0) handleClickPrevCarousel(carouselIndex);
			});
		},
	};
}

const carouselMaker = makeCarousel();
carouselMaker.makeSlide();
carouselMaker.handleWindowResize();
const handleClickNextCarousel = (carouselIndex) => {
	carouselMaker.handleClickNextCarousel(carouselIndex);
};
const handleClickPrevCarousel = (carouselIndex) => {
	carouselMaker.handleClickPrevCarousel(carouselIndex);
};

// handle touch event for carousel 1
carouselMaker.handleTouchStart(0);
carouselMaker.handleTouchEnd(0);
